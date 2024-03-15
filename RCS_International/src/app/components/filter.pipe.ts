import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, input: any): any {
    // const items= [];

    // if (value.length === 0 || filterString === '') {
    //   return value
    // }

    // for (const item of value) {
    //   if(item['template_name'] === filterString){
    //     // console.log(filterString);
    //     // console.log(item);
    //     items.push(item)
    //   }
    // }

    // value.forEach((item: any) => {
    //   if (item[filterString].trim().toLowerCase().includes(filterString.toLowerCase())) {
    //     items.push(item);
    //   }
    // });
    // return items;




    if (input) {
      return value.filter((val:any) => val.campList.campaign_name.toLowerCase().indexOf(input.toLowerCase()) >= 0);
    } else {
      return value;
    }

    // if (input) {
    //   return value.filter((val:any) => val.template_name.toLowerCase().indexOf(input.toLowerCase()) >= 0);
    // } else {
    //   return value;
    // }
  }

}
