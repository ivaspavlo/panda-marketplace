import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DestroySubscriptions } from '@app/shared/classes';
import { Questions } from '../../constants/questions.constant';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends DestroySubscriptions implements OnInit {

  public currentScreen$ = <BehaviorSubject<number>> new BehaviorSubject(0);
  public questions = Questions;
  public account: string | null = null;

  constructor(
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {
    super();
  }

  ngOnInit(): void {
    this.authService.listenToAccountChange().pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe();
    this.authService.account$.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((res: string | null) => {
      this.account = res;
      this.cdr.detectChanges();
    })
  }

  public onSectionVisible(sectionNum: number, isVisible: boolean): void {
    if (isVisible) {
      this.currentScreen$.next(sectionNum);
    }
  }

  public onConnect(): void {
    this.authService.getAccountAddress().subscribe();
  }

  public onStartClick(): void {
    const scrollContainer = this.document.getElementById('app-scroll-container') as HTMLElement;
    scrollContainer.scrollTop = document.documentElement.clientHeight;
  }

}
