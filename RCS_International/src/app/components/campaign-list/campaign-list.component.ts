import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { FormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  campaignList: any;

  FromDate:any='';
  ToDate:any='';

  
  constructor(private service: ServerService, private fb: FormBuilder,private dataAdapter: DateAdapter<Date>,private datapipe: DatePipe,private route: Router) { }

  frm = this.fb.group({
    fdate:[''],
    tdate:['']
  })

  ngOnInit(): void {
    
  }


  get(){
    // console.log(this.frm.value);
    
    let fromDate = this.dataAdapter.format(this.FromDate,'MM-DD-YYYY');
    // console.log(fromDate)
    let dateobj = new Date(fromDate);
    let convertedFromDate = this.datapipe.transform(dateobj, 'yyyy-MM-dd');
    this.frm.controls.fdate.setValue(convertedFromDate);

    let toDate = this.dataAdapter.format(this.ToDate,'MM-DD-YYYY');
    let dateobj1 = new Date(toDate);
    let convertedToDate = this.datapipe.transform(dateobj1, 'yyyy-MM-dd');
    this.frm.controls.tdate.setValue(convertedToDate);

    // console.log(this.frm.value);
    
    // this.service.getAllCampaigns(this.frm.value).subscribe((res:any)=>{
      // console.log(res);
      
      // this.campaignList = res.message;
    // })
  }

  download(i:any){
    // console.log(i.tid);
    const Data = {
      cid : i.tid
    }
    
    this.service.downloadCampaign(Data).subscribe(res => {
      // console.log(res);
      this.route.navigate(['/download-center']);
    })
    

  }

}
