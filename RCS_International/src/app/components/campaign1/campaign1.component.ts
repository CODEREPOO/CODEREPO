import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-campaign1',
  templateUrl: './campaign1.component.html',
  styleUrls: ['./campaign1.component.css']
})
export class Campaign1Component implements OnInit {
  btnBool = false;
  date: any;
  items: any[] = [];
  itemsP: any[] = [];
  arr: any;
  inputString = '';
  panelOpenState = false;
  showRecords = true;
  TotalRCSp: any;
  SendRCSp: any;
  deliverdRCSp: any;
  readRCSp: any;
  un_deliverdRCSp: any;

  main: any[] = []
frmDate: any;
lstmDate: any;

  // TotalNum = 100;
  // SubmittedRCS = 0;
  // SubmittedP = 0;
  // DeliverdRCS = 0;
  // DeliverdP = 0;
  // ReadRCS = 0;
  // ReadP = 0;

  constructor(private route: Router, private api: ServerService, private cookie: CookieService) { }
  ngOnInit(): void {
    this.api.getAllCampaigns().subscribe((res: any) => {

      // console.log(res);
      if (res.message.length !== 0) {
        this.showRecords = false;
        this.items = res.message
        // console.log(res);
        for (let ip = 0; ip < this.items.length; ip++) {
          // this.SubmittedRCS = ;
          // this.DeliverdRCS = 27;
          // this.ReadRCS = 20;
          // this.SubmittedP = (this.SubmittedRCS / this.TotalNum) * 100;
          // this.DeliverdP = (this.DeliverdRCS / this.SubmittedRCS) * 100;
          // this.ReadP = (this.ReadRCS / this.SubmittedRCS) * 100;

          if (this.items[ip].act_rcs.value !== 0 && this.items[ip].delivered_rcs.value !== 0 && this.items[ip].read_rcs.value !== 0 && this.items[ip].un_delivered_rcs.value !== 0) {
            // const TotalRCS = this.items[ip].no_of_rcs;
            // const SendRCS = this.items[ip].act_rcs;
            // const deliverdRCS = this.items[ip].delivered_rcs;
            // const readRCS = this.items[ip].read_rcs;
            // const un_deliverdRCS = this.items[ip].un_delivered_rcs;

            // this.TotalRCSp = 100;
            // this.SendRCSp = Math.floor((SendRCS / TotalRCS) * 100).toFixed(2);
            // this.deliverdRCSp = Math.floor((deliverdRCS / TotalRCS) * 100).toFixed(2);
            // this.readRCSp = Math.floor((readRCS / TotalRCS) * 100).toFixed(2);
            // this.un_deliverdRCSp = Math.floor((un_deliverdRCS / TotalRCS) * 100).toFixed(2);
            this.arr = {};
            const TotalRCS = this.items[ip].no_of_rcs;
            const SendRCS = this.items[ip].act_rcs;
            const deliverdRCS = this.items[ip].delivered_rcs;
            const readRCS = this.items[ip].read_rcs;
            const un_deliverdRCS = this.items[ip].un_delivered_rcs;

            const TotalRCSp = 100;
            const SendRCSp = Math.floor((SendRCS / TotalRCS) * 100).toFixed(2);
            const deliverdRCSp = Math.floor((deliverdRCS / TotalRCS) * 100).toFixed(2);
            const readRCSp = Math.floor((readRCS / TotalRCS) * 100).toFixed(2);
            const un_deliverdRCSp = Math.floor((un_deliverdRCS / TotalRCS) * 100).toFixed(2);

            this.arr = { TotalRCSp: TotalRCSp, SendRCSp: SendRCSp, deliverdRCSp: deliverdRCSp, readRCSp: readRCSp, un_deliverdRCSp: un_deliverdRCSp };
            // console.log(this.arr,"1");
            // this.itemsP.push(this.arr
            // console.log(this.arr,"2");
            // return this.arr;
            // this.itemsP.push(this.arr)

            this.itemsP.push(this.arr);

            const obbj = {
              campList: this.items[ip],
              pstatus: this.itemsP[ip]
            }

            this.main.push(obbj)
          }
          else {

            this.TotalRCSp = 100;
            this.SendRCSp = 0;
            this.deliverdRCSp = 0;
            this.readRCSp = 0;
            this.un_deliverdRCSp = 0;

          }
          // console.log(this.arr);
          // console.log(this.itemsP);
          // console.log(this.main);

        }
      }
      else {
        this.showRecords = true;
        // console.log("else");
      }
    })
    // const tData = {
    //   tName : ''
    // }
    // this.api.getTemplatePreview(tData).subscribe((res:any)=>{
    //   // console.log(res.message.templateList);

    //   this.items = res.message.templateList;
    // })



  }


  campaignft(){
    // console.log(this.frmDate, "   :  ", this.lstmDate);
    
  }


  inpsearch(e: any) {
    const Cname = e.target.value;
    // console.log(Cname);

    const result = this.items.filter((obj) => {
      // console.log(obj.template_name == Cname);

      return obj.template_name === Cname;
    });

    // console.log(result);


  }

  downloadReport(i: any) {
    const Data = {
      cid: i.campList.tid
    }
    //  console.log(Data);
    //  console.log(i);
    //  console.log(i.campaign_name);

    this.api.downloadCampaign(Data).subscribe(res => {
      // console.log(res);
      this.route.navigate(['/download-center']);
    })
  }

  routetocreateC() {
    this.btnBool = true;
    this.api.btnboolean.next(this.btnBool);
    // this.route.navigate(['/c-campaign']);
  }
  log_out() {
    sessionStorage.removeItem('login_Status');
    sessionStorage.removeItem("User");
    localStorage.removeItem('token_RCS');
    this.cookie.delete('token');
    sessionStorage.removeItem('rcsIndex');
    window.location.reload();
  }
}
