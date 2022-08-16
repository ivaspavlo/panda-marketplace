import { IPagination } from '@app/interfaces/api';


export const PaginationDefaultValue = (): IPagination<any> => ({
  count: 0,
  next: null,
  // @ts-ignore
  prev: null,
  results: []
});
