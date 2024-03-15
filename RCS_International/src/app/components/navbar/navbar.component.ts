import { Component, OnInit } from '@angular/core';
import  {ServerService } from "../server.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  selectedIndex : any;
  ngOnInit(): void {
    // console.log(document.querySelector('.rSide2')?.id)
  }
  constructor(private service : ServerService){}
  
  selectedbtn(event : any){
    this.selectedIndex = event.id;
    // console.log(this.selectedIndex);
    this.service.slideBarButton.next(event);
  }

}
