import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent {
  date: any;
  constructor(private rout: Router,private cookie: CookieService){}


  log_out(){
    sessionStorage.removeItem('login_Status');
    sessionStorage.removeItem("User");
    localStorage.removeItem('token_RCS');
    this.cookie.delete('token');
    sessionStorage.removeItem('rcsIndex');
    window.location.reload();
  }
}
