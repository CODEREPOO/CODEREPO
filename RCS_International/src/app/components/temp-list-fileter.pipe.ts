import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempListFileter'
})
export class TempListFileterPipe implements PipeTransform {

  transform(value: any, inp:any): any {
    // console.log(value);
    // console.log(inp);
    
    if (inp) {
      return value.filter((val:any) => val.template_name.toLowerCase().indexOf(inp.toLowerCase()) >= 0);
    } else {
      return value;
    }
  }

}
