import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStatus',
  standalone: true
})
export class FilterStatusPipe implements PipeTransform {
  transform(items: any[], status: string): any[] {
    if (!items) return [];
    return items.filter(item => item.status === status);
  }
}
