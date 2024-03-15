import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { ServerService } from '../server.service';


@Component({
  selector: 'app-dynamic-campaign',
  templateUrl: './dynamic-campaign.component.html',
  styleUrls: ['./dynamic-campaign.component.css']
})
export class DynamicCampaignComponent {

  File_Name: any = 'Upload Excel File.';
  columnLengths: number[] = [];
  excelMessage: any;
  loading = false;
  excelFile = new FormData();

  constructor(private api: ServerService) { }

  fileUpload(e: any) {
    this.excelMessage = '';
    this.excelFile = new FormData();

    // console.log(e.target.files);
    this.excelFile.append('File',e.target.files[0]);
    this.File_Name = e.target.files[0].name;

    const target: DataTransfer = <DataTransfer>(e.target);

    if (target.files.length !== 1) {

      throw new Error('Cannot use multiple files')

    };
    this.loading = true;
    const reader: FileReader = new FileReader();

    reader.readAsBinaryString(target.files[0]);

    reader.onload = (i: any) => {

      const bstr: string = i.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.loading = true;
      // const data = XLSX.utils.sheet_to_json(ws, {header: 1});
      // this.loading = true;
      // Process the data...
      // Convert sheet to JSON
      const json: any = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setTimeout(() => {
        this.loading = false;
        this.excelMessage = json[0];
      }, 10000);
      // if (this.excelMessage) {
      // }
      // else{
      //   this.loading = true
      // }
      // this.calculateColumnLengths(json);
      // for(let ind=0;ind<json[0].length;ind++){
      //   this.excelMessage.push(json[0][ind] + " : "+ this.columnLengths[ind]);
      // }
      // console.log(json);

    };
    // console.log(reader.readAsBinaryString(target.files[0]));

  }


  // calculateColumnLengths(data: any[][]): void {
  //   // console.log(data);


  //   data.forEach(row => {
  //     row.forEach((cell, index) => {
  //       if (!this.columnLengths[index]) {
  //         this.columnLengths[index] = 0;
  //       }
  //       // Assuming non-empty cells contribute to column length
  //       if (cell !== null && cell !== undefined && cell !== '') {
  //         this.columnLengths[index]++;
  //       }
  //     });
  //   });

  //   console.log('Column lengths:', this.columnLengths);
  // }


  fileSend() {
    console.log(this.excelFile);
    this.api.RCSFileUpload(this.excelFile).subscribe((res: any) => {
      // console.log(res);
    })
  }
}
