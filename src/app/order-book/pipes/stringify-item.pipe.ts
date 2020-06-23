import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringifyItem',
})
export class StringifyItemPipe implements PipeTransform {
  transform(item: any) {
    if (!item) { return ''; }

    return `   ${item.price}   |      ${item.size}  `;
  }
}
