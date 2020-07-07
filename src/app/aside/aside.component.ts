import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  bEurl = environment.apiUrl
  constructor(public router : Router,private service: ServiceService, private cookie: CookieService) {
    
   }


  Search;
  userImage = '../assets/user.png';


  
  search() {
    this.Search = true;
    return this.Search;
  }

  rot;
  gettingUrl() {
    this.rot = this.router.url
    console.log(this.rot);
    return this.rot
  }
  logOut() {
    this.router.navigate([''])
    localStorage.clear();
    this.cookie.deleteAll();
    return this.service.updateLoging(null);
  }



  userName;
  user;
  gettingUserName() {
    this.user = this.cookie.get('user');
    this.userImage = this.bEurl + this.cookie.get('urlOfImg');
    if(!this.cookie.get('urlOfImg')) {
      this.userImage = '../assets/user.png';
    } 
    this.userName = JSON.parse(this.user).userData.name;
    console.log(JSON.parse(this.user).userData.name);
    
  }




  enableSideBar;
  hideBar() {
    this.service.updateSideBarStatus("disabled")
  }



  ngOnInit() {
    this.service.sideBarStatus.subscribe(value => {
      if(value == 'enabled') {
        this.enableSideBar = true;
      }
      if(value == 'disabled') {
        this.enableSideBar = false
      }
    })
    this.gettingUserName();
    this.gettingUrl();
    console.log(this.rot + "this is the url now")
  
  }
}
