import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from '../server.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
  items: any = '';
  ListStatus = [{ key: '-- sort by --' }, { key: 'pending' }, { key: 'approved' }, { key: 'rejected' }];
  template1: any;
  mobilePreview = false;
  displayedColumns: string[] = ['name', 'status', 'lastUpdate'];
  inputString: any;
  pageslice: any;

  // sample_TemplateList :string[] = []
  OurDBTemplateVIList: string[] = [];
  itemsLength: any;
  TemplateType: string = '';
  templateJsonData: any;
  modalPriview: boolean = false;
  constructor(private api: ServerService, private toast: ToastrService, private fb: FormBuilder,private route : Router) { }
  searchInpField = this.fb.group({
    search: ['']
  })
  ngOnInit(): void {
    // this.api.getTemplatePreview(tData).subscribe((res: any) => {
    //   // console.log(res.message.templateList);

    //   this.items = res.message.templateList;
    // })
    this.getAllTemplates()
  }



  getAllTemplates() {
    this.api.getUserRCSTemp().subscribe((res: any) => {

      this.items = res.message
      // console.log(this.items);
      this.itemsLength = this.items.length;

      this.pageslice = this.items.slice(0, 5);
      setTimeout(() => {
        this.pageslice = this.items.slice(0, 5);

      }, 1000);
      // console.log(this.pageslice);

      // this.items = itemsarray.filter((i: { status: any; }) => i.status === `${e}`);
    })
    // const tData = {
    //   tName: ''
    // }

    // this.api.getUserRCSTemp().subscribe((res: any) => {
    //   const lengthOfList = res.message.length;
    //   for (let loop = 0; loop < lengthOfList; loop++) {
    //     this.OurDBTemplateVIList.push(res.message[loop].template_name.toString());
    //   }

    //   // console.log(this.OurDBTemplateVIList);
    // })

    // this.api.getTemplatePreview(tData).subscribe((res: any) => {
    //   this.items = res.message.templateList;
    //   if (this.items !== 'undefined') {
    //     // console.log(itemsarray);
    //     // console.log(this.items);
    //     const ItemsRecivedLength = this.items.length;

    //     // setInterval(()=>{
    //     for (let i = 0; i < ItemsRecivedLength; i++) {
    //       if (this.items[i].status == "approved") {
    //         if (!this.OurDBTemplateVIList.includes(this.items[i].name)) {
    //           const NewTemplate = this.fb.group({
    //             TNAME: this.items[i].name
    //           })
    //           this.api.addTemplateinourDB(NewTemplate.value).subscribe((res: any) => {
    //             // this.toast.success(`Template Added `, 'Done');
    //             // console.log(res);
    //           })
    //           // this.sample_TemplateList.push(this.items[i].name);
    //         }
    //       }
    //       // console.log(this.sample_TemplateList);
    //     }
    //     // },1500)



    //     this.pageslice = this.items.slice(0, 10);
    //     // this.items = itemsarray.filter((i: { status: any; }) => i.status === `${e}`);

    //   }
    // })
  }

  SendTemplateName(index: any) {
    this.route.navigate(['/campaign']);
    this.api.passValue.next(index.template_name);
    // console.log(index.template_name);

  }
  srch() {
    // console.log(this.searchInpField.value.search);
    const srchNum = parseInt(`${this.inputString}`)
    const dlength = this.items.length;
    const tempData: any[] = [];
    for (let i = 0; i <= dlength; i++) {
      // console.log(this.data[i].phone_number);
      if (srchNum == this.items[i].name) {
        // console.log(this.data[i]);
        tempData.push(this.items[i])
        // console.log(tempData);
      }
      this.pageslice = tempData
    }
  }
  // listChange(e: any) {
  //   // console.log(e.target.value);
  //   const tData = {
  //     tName: ''
  //   }
  //   this.api.getTemplatePreview(tData).subscribe((res: any) => {
  //     const itemsarray = res.message.templateList;
  //     // console.log(itemsarray);

  //     this.items = itemsarray.filter((i: { status: any; }) => i.status === `${e.target.value}`);
  //     this.pageslice = this.items.slice(0, 10);

  //   })
  // }

  listKeys(obj: any): string[] {
    // console.log(obj);

    let keys: string[] = [];
    for (const key in obj) {
      keys.push(key);
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys = keys.concat(this.listKeys(obj[key]).map(subKey => `${key}.${subKey}`));
      }
    }
    return keys;
  }
  preview(v: any) {
    // this.modalPriview = true
    // console.log(v);

    for (let i = 0; i < this.itemsLength; i++) {
      if (this.items[i].template_name == v) {
        this.TemplateType = this.listKeys(JSON.parse(this.items[i].template_jsonData))[1].split('.')[1];
        this.templateJsonData = JSON.parse(this.items[i].template_jsonData);
        // console.log(this.templateJsonData);
        // console.log(this.listKeys(JSON.parse(this.items[i].template_jsonData)));
        
      }
      // Object.keys(cat)
    }

    // const tData = {
    //   // tName : ''
    //   tName: btoa(v)
    // }

    // this.api.getTemplatePreview(tData).subscribe((res: any) => {
    //   // console.log(res.message);
    //   if (res.message.error) {
    //     this.toast.error(res.message.error.message, 'Error')
    //   }
    //   else {
    //     this.template1 = res.message;
    //   }
    // })
  }

  PreviewStatus() {
    this.mobilePreview = !this.mobilePreview;
  }

  openSide(e: any) {
    e.toggle();
  }

  handlePageEvent(e: PageEvent) {
    const startIndex = e.pageIndex * e.pageSize;
    let endIndex = startIndex + e.pageSize;
    if (endIndex > this.items.length) {
      endIndex = this.items.length
    }
    this.pageslice = this.items.slice(startIndex, endIndex)

  }

  // mat-table
  // announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }


  deleteTemplate(e: any) {
    // console.log(e);
    // const base64Encoded = btoa(e)
    // // console.log(base64Encoded);
    // const Data = this.fb.group({
    //   tName: base64Encoded
    // })
    // // console.log(Data);
    // const edata = this.fb.group({
    //   TName: e
    // })
    // this.api.Delete_Template(Data.value).subscribe((res: any) => {
    //   // console.log(res);
    //   if (res.message.status == 405 || (res.message.status == 11 || res.message.message == "Something went wrong! Please try again later.")) {
    //     this.toast.error(res.message.message, 'Error')
    //     return;
    //   }
    //   else if (res.message.message) {
    //     this.toast.success(res.message.message, 'Deleted Successfully');
    //     this.api.deleteTemplateinourDB(edata.value).subscribe((res: any) => {
    //       // console.log(res);

    //       this.getAllTemplates()
    //     })

    //   }
    // })

  }












}

