import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ServerService } from '../server.service';
import { Chart } from 'chart.js';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-rcs-report',
  templateUrl: './rcs-report.component.html',
  styleUrls: ['./rcs-report.component.css']
})
export class RCSReportComponent implements OnInit {
  date!: Data;
  selected = "COMPOSE";
  frmDate: any;
  lstmDate: any;
  FromDate: any;
  ToDate: any;
  rtype = "C";
  datarow = false;
  chart = false;
  data: any = [];



  ctx: any;
  config: any;
  chartData: number[] = [];
  chartDatalabels: any[] = [];

  Sent: any = 0;
  Un_Deliverd: any = 0;
  Deliverd: any = 0;
  Read: any = 0;

  pageslice: any;

  downloadData: any;
  download_Status: any = false;



  constructor(private dataAdapter: DateAdapter<Date>, private aroute: ActivatedRoute, private fb: FormBuilder, private route: Router, private datapipe: DatePipe, private apiservice: ServerService) { }
  // ngOnInit(): void {
  // }

  searchInpField = this.fb.group({
    search: ['']
  })

  srch() {
    // console.log(this.searchInpField.value.search);
    const srchNum = parseInt(`${this.searchInpField.value.search}`)
    const dlength = this.data.length;
    const tempData: any[] = [];
    for (let i = 0; i <= dlength; i++) {
      // console.log(this.data[i].phone_number);
      if (srchNum == this.data[i].phone_number) {
        // console.log(this.data[i]);
        tempData.push(this.data[i])
        // console.log(tempData);
      }
      this.pageslice = tempData
    }
  }

  printDate() {
    // From Date Coversion
    // console.log(this.frmDate,"from date in print method.!");
    
    let fdate = this.dataAdapter.format(this.frmDate, 'MM-DD-YYYY');
    let dateobj = new Date(fdate);
    let convertedFromDate = this.datapipe.transform(dateobj, 'yyyy-MM-dd');
    this.FromDate = convertedFromDate + " " + "00:00:00";

    // To Date Coversion
    let tdate = this.dataAdapter.format(this.lstmDate, 'MM-DD-YYYY');
    let dateobj1 = new Date(tdate);
    let convertedToDate = this.datapipe.transform(dateobj1, 'yyyy-MM-dd');
    this.ToDate = convertedToDate + " " + "23:59:59";

    const Data = {
      frmDate: this.FromDate,
      toDate: this.ToDate,
      download_Status: this.download_Status
    }
    this.chart = true;
    // console.log(Data)

    this.apiservice.report(Data).subscribe((res: any) => {
      this.datarow = true;
      this.data = res.message;
      this.pageslice = this.data.slice(0, 20);
      console.log(this.pageslice);

      if (this.data != null) {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].rcs_status1 === "Sent") {
            this.Sent++;
          }
          else if (this.data[i].rcs_status1 === "Un Deliverd") {
            this.Un_Deliverd++;
          }
          else if (this.data[i].rcs_status1 === "Deliverd") {
            this.Deliverd++;
          }
          else if (this.data[i].rcs_status1 === "Read") {
            this.Read++;
          }
        }
        // console.log("sent-->",this.Sent,"  del-->",this.Deliverd,"  Read-->",this.Read,"  und-->",this.Un_Deliverd);

      }

      if (this.data[0].RetVal == 1) {
        this.route.navigate(['/download-center']).then(() => {
          const secondComponent = this.aroute.component as any;
          if (secondComponent.getDownloadList) {
            secondComponent.getDownloadList();
          }
        });;
        return;
      }
      this.chartData.push(this.Sent);
      this.chartData.push(this.Deliverd);
      this.chartData.push(this.Un_Deliverd);
      this.chartData.push(this.Read);

      this.chartDatalabels.push('Sent');
      this.chartDatalabels.push('Deliverd');
      this.chartDatalabels.push('Un-Deliverd');
      this.chartDatalabels.push('Read');
      // console.log(this.data[0].rcs_status1)
      this.pieChart(this.chartData, this.chartDatalabels);
    });
  }


  // PI Chart Section Starts
  pieChart(chartData: any, chartDatalabels: any) {
    // console.log(this.data.rcs_status1)
    // // this.chartData.push(this.data.rcs_status1);
    // // this.chartData.push(this.data.rcs_status1);

    // this.pieChart(this.chartData, this.chartDatalabels);
    // this.chartDatalabels.push('A');
    // this.chartDatalabels.push('B');
    // this.chartDatalabels.push('C');
    this.ctx = document.getElementById('myChart');
    this.config = {
      type: 'pie',
      options: {
      },
      data: {
        labels: chartDatalabels,
        datasets: [{
          label: 'Chart Data',
          data: chartData,
          borderWidth: 3,
          borderColor: 'transparent',
          backgroundColor: ['#4bb543', '#06FF00', '#ff0000', '#87CEFA'],
          hoverOffset: 10,
        }],
      }
    }
    const myChart = new Chart(this.ctx, this.config);
  }

  log_out() {
    sessionStorage.removeItem('login_Status');
    sessionStorage.removeItem("User");
    localStorage.removeItem('token_RCS');
    sessionStorage.removeItem('rcsIndex');
    // this.cookie.delete('token');
    window.location.reload();
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.data.length) {
      endIndex = this.data.length
    }
    this.pageslice = this.data.slice(startIndex, endIndex)

  }

  ngOnInit() {

  }

  downloadBtn() {
    this.download_Status = true;
    this.printDate();
    this.route.navigate(['/download-center']).then(() => {
      const secondComponent = this.aroute.component as any;
      if (secondComponent.getDownloadList) {
        secondComponent.getDownloadList();
      }
    });
    // const file = {
    //   fileName : this.searchFrm.value.search+".csv"
    // }   
    // this.printDate()
    // this.server.download_Report(file.fileName).subscribe((res:any) => {
    //   saveAs(res, `${file.fileName}.csv`)     
    // })
  }

}
