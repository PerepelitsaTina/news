import { Pipe, PipeTransform } from '@angular/core';
import { ILike, INews } from '../services/news.service';

@Pipe({
  name: 'map'
})
export class MapPipe implements PipeTransform {

  transform(likes: Array<ILike>): INews[] {
    return likes.map(like => like.news)
  }

}
