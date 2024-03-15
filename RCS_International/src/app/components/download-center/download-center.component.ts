import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { ServerService } from '../server.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-download-center',
  templateUrl: './download-center.component.html',
  styleUrls: ['./download-center.component.css']
})
export class DownloadCenterComponent implements OnInit {

  fileName: any
  UserData: any;
  count = 1;

  constructor(private fb: FormBuilder, private service: ServerService) { }




  ngOnInit(): void {
    this.getDownloadList();
  }


  getDownloadList() {
    this.service.getDownloadCenterDetails().subscribe((res: any) => {
      // console.log(res);
      if (res.message.length == 0) {
        return this.UserData;
      }
      this.UserData = res.message;
      // console.log('Running');
    })

    for (let i = 0; i <= this.count; i++) {
      setInterval(() => {
        setTimeout(() => {
          this.service.getDownloadCenterDetails().subscribe((res: any) => {
            // console.log(res);
            if (res.message.length == 0) {
              return this.UserData;
            }
            this.UserData = res.message;
            // console.log('Running');
          })
        }, 4000)
      }, 10000)
    }
  }


  download(i: any) {
    const reportID = {
      id: this.UserData[i].file_path
    }
    this.service.download_Report(reportID).subscribe((res: any) => {
      saveAs(res, `${this.UserData[i].file_path}`)
    })
  }
}
