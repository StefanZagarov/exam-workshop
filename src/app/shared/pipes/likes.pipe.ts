import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'likes',
  standalone: true
})
export class LikesPipe implements PipeTransform
{

  transform(likes: Array<string> | undefined): number | undefined
  {
    return likes?.length;
  }

}
