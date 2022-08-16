import { Injectable } from '@angular/core';
import { AppError } from '@app/shared/classes';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import detectEthereumProvider from '@metamask/detect-provider';

import { IApiRes } from '@app/interfaces/api';
import { ErrorsMap } from '@core/constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public account$ = <BehaviorSubject<string | null>> new BehaviorSubject(null);

  constructor() { }

  public getAccountAddress(): Observable<IApiRes<string | null>> {
    return this.getProvider().pipe(
      switchMap((res: IApiRes<any>) => this.getMetamaskAccount(res)),
      map((res: IApiRes<string | null>) => {
        if (res.result === null) {
          return { result: null, error: res.error };
        } else {
          return { result: res.result, error: null };
        }
      })
    );
  }

  public getProvider(): Observable<IApiRes<any>> {
    return from(
      detectEthereumProvider()
    ).pipe(
      catchError(() => of(null)),
      map(result => {
        return {
          error: result ? null : new AppError(ErrorsMap.noMetamask),
          result
        };
      })
    );
  }

  private getMetamaskAccount(res: IApiRes<any>): Observable<IApiRes<string | null>> {
    if (res.error) {
      return of({ result: null, error: res.error });
    }
    const metamaskProvider = res.result;
    return from(metamaskProvider.request({ method: 'eth_requestAccounts' })).pipe(
      catchError(() => of(null)),
      map((accounts) => {
        if (Array.isArray(accounts) && accounts.length) {
          const account = accounts[0];
          return { error: null, result: account };
        } else {
          return { error: new AppError(ErrorsMap.metamaskAccount), result: null };
        }
      }),
      tap((res: IApiRes<string | null>) => {
        this.account$.next(res.result);
      })
    );
  }

  public listenToAccountChange(): Observable<any> {
    return this.getProvider().pipe(
      tap((res: IApiRes<any>) => {
        if (res.result === null) {
          return;
        }
        const metamaskProvider = res.result;
        metamaskProvider.on('accountsChanged', (res: any) => {
          this.account$.next(Array.isArray(res) && res.length ? res[0] : null);
        });
      })
    );
  }

}
