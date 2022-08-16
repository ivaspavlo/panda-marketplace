import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
  name: 'objectValues'
})
export class ObjectValuesPipe implements PipeTransform {
  transform(value: object): any[] {
    if (typeof value !== 'object') { return []; }
    return Object.values(value);
  }
}
