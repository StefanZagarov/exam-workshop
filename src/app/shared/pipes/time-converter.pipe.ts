import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'timeConverter',
  standalone: true
})
export class TimeConverterPipe implements PipeTransform
{

  transform(time: string, ...args: unknown[]): unknown
  {
    return moment(time).format(`DD-MM-YYYY HH:mm:ss`);
  }

}
