import { Pipe, PipeTransform } from '@angular/core';

interface ItemWithId {
  _id: String;
}

@Pipe({
  name: 'findOne'
})
export class FindOnePipe implements PipeTransform {

  transform(items: Array<ItemWithId>, _id: string): ItemWithId {
    let item = null;
    items.forEach((i: ItemWithId) => {
      if (i._id === _id) {
        item = i;
      }
    });
    return item;
  }

}
