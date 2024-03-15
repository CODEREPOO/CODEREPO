import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-team-inbox',
  templateUrl: './team-inbox.component.html',
  styleUrls: ['./team-inbox.component.css']
})
export class TeamInboxComponent {
constructor(private route:Router,private cookie :CookieService){}

  log_out(){
    sessionStorage.removeItem('login_Status');
    sessionStorage.removeItem("User");
    localStorage.removeItem('token_RCS');
    sessionStorage.removeItem('rcsIndex');
    this.cookie.delete('token');
    window.location.reload();
  }
}
