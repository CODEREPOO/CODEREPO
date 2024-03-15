import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ServerService } from '../server.service'
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import RNames from '../../../assets/Languages/resellersNames.json'



@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  items: any[] = [];
  Phone_count: any;
  op: any;
  inputString = '';
  btnShow: any = true;
  CampaignNameCount: number | undefined = 0;
  template1: any;
  RCS_Credits: any;
  rcsCredits: any;
  pagelogo: any;
  cn: any;



  constructor(private cookie: CookieService, private toast: ToastrService, private server: ServerService, private fb: FormBuilder) {

  }

  searchFrm = this.fb.group({
    inputString: ['']
  })


  ngOnInit(): void {
    this.server.passValue.subscribe(val=>{
      // console.log(val, "Cmapaign");
      this.frm.controls['template_name'].setValue(val);
    })
    this.server.getUserRCSTemp().subscribe((res: any) => {

      this.items = res.message
      // console.log(this.items);

    })
    this.Phone_count = 0;
    this.server.getSmartCredits().subscribe((res: any) => {
      this.rcsCredits = res.message[1][0].SMART_CREDITS
      this.RCS_Credits = Number(parseFloat(res.message[1][0].SMART_CREDITS)).toLocaleString('en');
      // console.log(res,"RCS");
      // console.log(this.rcsCredits,"RCS");
    })
    // console.log(this.RCS_Credits);
    const parsedUrl = new URL(window.location.href);
    const baseUrl = parsedUrl.origin;
    const domain = baseUrl.split('//');
    // console.log(baseUrl);
    const dName = {
      // domainName: 'rcs.ashwiniinnovations.com'
      domainName: domain[1]
    }

    const arrNum = RNames.ResellerDomains.length;
    let bCame: boolean = false;
    this.server.getLogoRelatedDomain(dName).subscribe((res: any) => {
      for (let i = 0; i < arrNum; i++) {

        if (dName.domainName == RNames.ResellerDomains[i]) {
          // console.log("res", res);
          bCame = true;
          this.pagelogo = res.message.logo;
          this.cn = dName.domainName.split('.')[1];
        }
        // else {

        // }
      }
      if (!bCame) {
        this.cn = 'Telinfy';
        this.pagelogo = "pp.jpg";
      }


    })
  }
  // changg(i: any) {
  //   this.items.filter(item => item.template_name.toLowerCase().indexOf(i) > -1)
  //   // console.log(this.items);
  //   // console.log(5+5);
  // }

  frm = this.fb.group({
    template_name: ['', [Validators.required]],
    number_s: ['Numbers'],
    PhoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9\r\n]*$/)]],
    CampaignName: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]*$/)]]
  })

  // onTemplateChange(e: any) {
  //   // console.log(e);
  //   // console.log(btoa(e));
  //   // console.log(atob('dGhhbmsgeW91IGZvciBjb250YWM='));

  //   const tData = {
  //     // tName : ''
  //     tName: btoa(e)
  //   }

  //   this.server.getTemplatePreview(tData).subscribe((res: any) => {
  //     if (res.message.error) {
  //       if (res.message.error == 'invalid_token') {
  //         this.toast.error(res.message.error, 'Error')
  //       }
  //       else {
  //         this.toast.error(res.message.error.message, 'Error')
  //       }
  //     }
  //     else {
  //       this.template1 = res.message;
  //     }
  //   })

  // }


  mobileNumbers() {
    const y: any = this.frm.controls['PhoneNumber'].value?.length;
    const x: any = this.frm.controls['PhoneNumber'].value?.replaceAll(/\D/g, '').length;

    this.Phone_count = (y - x) + 1;
  }

  cmpnae() {
    this.CampaignNameCount = this.frm.value.CampaignName?.length;
  }

  uniqNumber() {
    const phone: any = this.frm.controls['PhoneNumber'].value?.replaceAll(/\D/g, ',');


    var myArray = phone.split(',');
    let arr = [];
    for (let i = 0; i < myArray.length; i++) {
      // if (myArray[i].slice(-10).length == 10) {
      arr.push(myArray[i])

      // }
    }
    // console.log(arr);

    const removedD: any[] = Array.from(new Set(arr));
    let filteredRemoved = removedD.filter(item => item && item.trim());



    // for (let i = 0; i < filteredRemoved.length; i++) {
    //   filteredRemoved[i].slice(-10);
    //   if (filteredRemoved[i].slice(-10).length != 10) {
    //     delete filteredRemoved[i];
    //   }
    //   console.log(filteredRemoved.filter(e => e && e.trim()));
    // }


    const r_c = `${(filteredRemoved).toString().replaceAll(',', '\n')}`;
    this.op = filteredRemoved.toString();
    this.frm.controls['PhoneNumber'].setValue(r_c);
    this.mobileNumbers()

    // console.log(r_c);
    
    return this.op
  }

  call() {

    this.uniqNumber()

    const composeBulkFrmData = {
      template_name: this.frm.controls['template_name'].value,
      number_s: this.frm.controls['number_s'].value,
      cName: this.frm.controls['CampaignName'].value,
      PhoneNumber: this.op,
      Phone_count: this.Phone_count,
    }
    const composeData = {
      template_name: this.frm.controls['template_name'].value,
      number_s: this.frm.controls['number_s'].value,
      cName: this.frm.controls['CampaignName'].value,
      PhoneNumber: this.op
    }



    // if (this.Phone_count <= this.rcsCredits) {
    if (this.Phone_count > 99) {
      if (this.frm.controls['template_name'].valid && this.frm.controls['PhoneNumber'].valid) {

        this.server.compose_bulk(composeBulkFrmData).subscribe({
          next: (res: any) => {
            const response = res;
            if (response.message === 'Sent Successfully') {
              this.toast.success('Done', `${response.message}`);
              this.btnShow = false;
              this.server.recall_Credits();
              setTimeout(() => {
                this.clear()
                this.btnShow = true;
                this.Phone_count = 0;
                this.server.recall_Credits();
              }, 7000)
              return;
              // error ocurred at Compose_bulk
            }

          }, error: (err) => {
            if (err.error.message === 'error ocurred at Compose_bulk') {
              console.log(err);

              this.toast.error(`${err.error.message}`, 'Failed');
              this.btnShow = false;
              setTimeout(() => {
                this.clear()
                this.btnShow = true;
                this.Phone_count = 0;
              }, 7000)
              return;
            }
          }
        })
      }
      else {

        this.toast.error(`Please Fill all the Fields.!`, 'Failed')
      }
      return;
    }
    else {
      if (this.frm.controls['template_name'].valid && this.frm.controls['PhoneNumber'].valid) {

        this.server.compose(composeData).subscribe({
          next: (res: any) => {

            const response = res;
            if (response.message === 'Insufficient Credits') {
              this.toast.info(`${response.message}`, 'Pending');
              this.btnShow = false;
              setTimeout(() => {
                this.clear()
                this.btnShow = true;
                this.Phone_count = 0;
              }, 7000)
              return;
            }
            else {
              this.toast.success('Done', `${response.message}`);
              this.btnShow = false;
              this.server.recall_Credits();
              setTimeout(() => {
                this.clear()
                this.btnShow = true;
                this.Phone_count = 0;
                this.server.recall_Credits();
              }, 7000)
            }
          }, error: (err) => {
            if (err.error.message === 'error ocurred at Compose') {
              console.log(err);

              this.toast.error(`${err.error.message}`, 'Failed');
              this.btnShow = false;
              setTimeout(() => {
                this.clear()
                this.btnShow = true;
                this.Phone_count = 0;
              }, 7000)
              return;
            }
          }
        });
      }
      else {
        this.toast.error(`Please Fill all the Fields.!`, 'Failed')

      }
    }
    // }
    // else {
    //   this.toast.info('In-Sufficient Credits...!', 'Pending')
    // }
  }

  clear() {
    this.frm.reset()
    this.frm.controls['number_s'].setValue("Numbers")
    this.Phone_count = 0;
    this.CampaignNameCount=0;
    this.template1 = '';
  }


  // Log_Out Part
  log_out() {
    sessionStorage.removeItem('login_Status');
    sessionStorage.removeItem("User");
    localStorage.removeItem('token_RCS');
    sessionStorage.removeItem('rcsIndex');
    this.cookie.delete('token');
    window.location.reload();
  }

}
