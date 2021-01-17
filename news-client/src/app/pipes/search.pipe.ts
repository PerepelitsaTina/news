import { INews } from './../services/news.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {
  transform(news: INews[], filter: string, search: string): INews[] {
    if (!search) return news;
    switch (filter) {
      case "content":
        return news.filter(item => item.content.includes(search))
      case "user":
        return news.filter(item => item.user.login.includes(search));
      case "title":
        return news.filter(item => item.title.includes(search));
      default:
        return news.filter(item => Object.values(item).includes(search));
    }

  }
}
