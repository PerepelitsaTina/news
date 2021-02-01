import { INews } from './../services/news.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {
  transform(news: INews[], filter: string, search: string): INews[] {
    if (!search || search.trim() === '') return news;
    switch (filter) {
      case "tags":
        return news.filter(item => item.tags.includes(search));
      case "user":
        return news.filter(item => item.user?.login.includes(search));
      default:
        return news.filter(item => {
          const itemValues = {
            tags: item.tags,
            content: item.content,
            title: item.title,
            user: item.user?.login
          };
          return Object.values(itemValues).some(item => item?.includes(search))
        });
    }
  }
}
