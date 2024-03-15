import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServerService } from './components/server.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

import RNames from '../assets/Languages/resellersNames.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  login = !!sessionStorage.getItem('login_Status');
  dataa: any;
  disabled = true;
  token: string = '';
  // apikey: any = [];
  errorMessage: any;
  slideBarBtn = document.getElementById('drawer');
  employeeName: any;
  navbtn: any;
  window: any;
  RCSUSER: boolean = false;
  emailSendSuccess: boolean = false;
  pagelogo: string = '';
  RCS_Credits: string = '';

  private subscription: Subscription;
  OurPlatform: boolean = false;

  // selected = `<lucide-icon name="user-circle-2" class="mr-1"
  // [size]="20" [strokeWidth]="1.57" [absoluteStrokeWidth]="true"></lucide-icon>Hello, Raju`
  opennav() {
    this.navbtn = document.getElementById('side_nav')?.classList.add('active')
  }
  removenav() {
    this.navbtn = document.getElementById('side_nav')?.classList.remove('active')
  }

  selectedIndex: any = sessionStorage.getItem('rcsIndex');

  selectedbtn(event: any) {
    this.selectedIndex = event.id;
    // console.log(this.selectedIndex);
    sessionStorage.setItem('rcsIndex', event.id);
    // this.service.slideBarButton.next(event);
    this.removenav()
  }


  constructor(private fb: FormBuilder, private route: Router, private service: ServerService, private cookieService: CookieService) {
    service.slideBarButton.subscribe((e) => {
      this.slideBarBtn = e;
    });
    this.subscription = service.buttonClick$.subscribe(() => {
      this.creditCall();
    })
  }


  ForgFrm = this.fb.group({
    emailid: ['', [Validators.required, Validators.email]]
  })


  ngOnInit() {
    this.DomainReflect();




  }

  DomainReflect() {
    this.selectedIndex = sessionStorage.getItem('rcsIndex')
    const parsedUrl = new URL(window.location.href);
    const baseUrl = parsedUrl.origin;
    const domain = baseUrl.split('//');

    const dName = {
      // domainName: 'rcs.ashwiniinnovations.com'
      // domainName: 'rcs.telinfy.com'
      // domainName: 'dms.nxc.co.in'
      // domainName: 'rcs.stripl.in'
      domainName: domain[1]
    }



    const arrNum = RNames.ResellerDomains.length;
    this.RCSUSER = false;
    let bCame: boolean = false
    this.service.getLogoRelatedDomain(dName).subscribe((res: any) => {
      for (let i = 0; i < arrNum; i++) {
        // console.log(RNames.ResellerDomains[i]);

        if (dName.domainName == RNames.ResellerDomains[i]) {
          bCame = true
          this.OurPlatform = true;
          this.RCSUSER = false;
          // console.log(res);

          this.pagelogo = res.message.logo
          // console.log(this.pagelogo);

        }
        // else {
        //   this.RCSUSER = false;
        //   this.pagelogo = "logo.png";
        // }
      }
      if (!bCame) {
        this.RCSUSER = true
        this.pagelogo = "logo.png";
      }

    })

    this.employeeName = sessionStorage.getItem("User");
    const loginState = sessionStorage.getItem('login_Status');
    this.login = !(loginState === 'true');



    if (!loginState == false) {
      this.creditCall();
    }
  }


  frm = this.fb.group({
    name: ['', [Validators.required]],
    psw: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{8,15}')]],
    // rememberMe:['']
  })


  creditCall() {
    this.service.getSmartCredits().subscribe((res: any) => {

      // console.log(res);

      this.RCS_Credits = res.message[1][0].no_of_rcs_wallet;

    })
  }

  onSubmit() {
    sessionStorage.setItem('rcsIndex', '7');
    this.service.login(this.frm.value).subscribe({
      next: (response: any) => {

        sessionStorage.setItem('rcsIndex', '7');
        sessionStorage.setItem("User", response.message[1][0].UNAME);

        this.token = response.token;


        this.employeeName = sessionStorage.getItem("User");

        localStorage.setItem('token_RCS', this.token);

        this.route.navigate(['/campaign']);
        this.login = true;
        // console.log(this.pagelogo);
        sessionStorage.setItem('login_Status', String(this.login));
        this.login = false;

        this.selectedIndex = sessionStorage.getItem('rcsIndex');
        this.creditCall();
      },
      error: (message: any) => {
        this.errorMessage = message.error.message;
        setTimeout(() => {
          let ACloseBtn = document.getElementById('alertClose');
          ACloseBtn?.click()
        }, 5000);
      }
    })

  }

  SendEmailFrgPassword() {
    this.emailSendSuccess = true;

    this.service.forgetPassword(this.ForgFrm.value).subscribe((res: any) => {

    })

    setTimeout(() => {
      this.ForgFrm.reset();
      this.emailSendSuccess = false;
      let close = document.getElementById('clse');
      close?.click();
    }, 10000)
  }

  log_out() {
    // console.log(this.pagelogo);
    // this.DomainReflect();

    // this.cookie.delete('token');
    // this.route.navigate(['/'])
    // this.DomainReflect();
    sessionStorage.removeItem('login_Status');
    window.location.reload();
    sessionStorage.removeItem("User");
    // console.log(this.pagelogo);
    localStorage.removeItem('token_RCS');
    sessionStorage.removeItem('rcsIndex');
    this.DomainReflect();
    // console.log(this.pagelogo);
  }

}
