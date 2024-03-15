import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';



@Component({
  selector: 'app-xlfile-upload',
  templateUrl: './xlfile-upload.component.html',
  styleUrls: ['./xlfile-upload.component.css']
})
export class XlfileUploadComponent implements OnInit {

  fileName: any = "";
  fileErr: any = "";
  file1: any;
  userID: any;
  btnName: string = "";


  constructor(private service: ServerService) { }
  ngOnInit(): void {

  }



  fileUpload(event: any) {
    this.fileErr = ""
    // console.log(event.target.files[0]);

    if (event.target.files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || event.target.files[0].type == "text/csv") {
      if (event.target.files[0].size <= 100000000) {
        this.fileErr = "";
        // console.log(event.target.files[0]);
        this.file1 = event.target.files[0];
        this.fileName = event.target.files[0].name;
      }
      else{
        this.fileErr = "File Size Should be below 100Mb."
      }
    }
    else {
      this.fileErr = "Please Upload Excel File."
    }
  }

  fileData() {
    const excelFile = this.file1;
    const formdata = new FormData();
    formdata.append("File", excelFile);

    // formdata.forEach((value, key) => {
    //   console.log(key, value);
    // });
    this.service.postExcelFile(formdata).subscribe((res: any) => {
      // console.log(res, "RES");
    })
  }

  uploadToServer() {
    const Filedetails = {
      fileName: this.fileName
    }

    this.service.postExcelFileDetails(Filedetails).subscribe((res: any) => {
      this.fileData();
      // console.log(res , "res1");
      if(res.message === "File Uploaded"){
        this.btnName = "File Uploaded Successfully";
        setTimeout(() => {
          this.btnName = "Upload";
          this.file1 = "";
          this.fileName = "";
        },3000)
      }
    })
    // postExcelFile
    // console.log(Filedetails);

  }
}

