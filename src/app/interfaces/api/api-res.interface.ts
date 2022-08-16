import { AppError } from '@app/shared/classes';


export interface IApiRes<T> {
  error: AppError | null;
  result: T;
}
