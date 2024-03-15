import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import RNames from '../../../assets/Languages/resellersNames.json'


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  apikey: any;
  UserName: any ='';
  btnShow:boolean = true;
  txtcopied:boolean = false;
  pagelogo: any;

  constructor(private service: ServerService,private toast: ToastrService,private fb : FormBuilder) { }

  chngPwd = this.fb.group({
    currpwd : ['',[Validators.required]],
    newpwd:['',[Validators.required]],
    cnfmpwd:['',[Validators.required]]
  })
  // Change_User_Pwd
  ngOnInit(): void {
    this.UserName = sessionStorage.getItem('User');
    this.apikey1();


    const parsedUrl = new URL(window.location.href);
    const baseUrl = parsedUrl.origin;
    const domain = baseUrl.split('//');
    
    const dName = {
      // domainName: 'dms.nxc.co.in'
      // domainName: 'rcs.ashwiniinnovations.com'
      domainName: domain[1]
    }
    
    
    
    const arrNum = RNames.ResellerDomains.length;
    for(let i =0;i<arrNum;i++){
    
      if (dName.domainName == RNames.ResellerDomains[i]) {
        this.service.getLogoRelatedDomain(dName).subscribe((res: any) => {
    
          // this.RCSUSER = false;
          this.pagelogo = res.message.logo
        })
      }
      else {
        this.pagelogo = "logo.png";
        // this.RCSUSER = true;
      }
    }
  }
  
  apikey1(){
    this.service.APIKEY().subscribe((res: any) => {
      // console.log(res);
      return this.apikey = res.message
    })
  }
  

  apikeycopy(){
    this.txtcopied = true;
    setTimeout(() => {
      this.txtcopied = false;
    }, 3000);
  }


  reGenAPI() {
    this.service.re_Gen_APIKEY().subscribe((res: any) => {
      // console.log(res);
      
      return this.apikey = (res.message.APIKEY)
    })
    this.apikey1();
  }

  changePwd(){
    if(this.chngPwd.value.newpwd !== '' && this.chngPwd.value.cnfmpwd !== ''){
      if(this.chngPwd.value.newpwd == this.chngPwd.value.cnfmpwd){
        const pwds = {
          cpwd : this.chngPwd.value.currpwd,
          npwd : this.chngPwd.value.newpwd
        }
        this.service.changePwdByUser(pwds).subscribe((res:any)=>{
          // console.log(res);
          if(res.message.RETVAL == 1){
            this.toast.success('Password Updated Successfully..','Done')
            this.btnShow = false;
            setTimeout(() => {
              this.chngPwd.reset();
              this.btnShow = true;
            },7000)
          }
        })
      }
      else{
        this.toast.error('New Password & Confirm Password should be same..!', 'Failed');
      }
    }
    else{
      this.toast.error('Please Fill the Fields..!', 'Failed');
    }
  }
}
