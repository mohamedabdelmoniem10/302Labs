import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coffeshop',
  templateUrl: './coffeshop.component.html',
  styleUrls: ['./coffeshop.component.css']
})
export class CoffeshopComponent implements OnInit {
  bEurl = environment.apiUrl;
  constructor(private spinner: NgxSpinnerService , private service: ServiceService, private router: Router, private cookie: CookieService) { }

  result;



  getParam(p) {
    this.cookie.set('id', p)
      if(this.cookie.get('id')){
      this.router.navigate(['coffe-prod'])
    }
  }




  // this method below for showing and hiding side bar 
  enableSideBar;
  showSideBar() {
    this.service.updateSideBarStatus('enabled')
  }



  ngOnInit() {
    this.spinner.show();

    this.service.sideBarStatus.subscribe(value => {
      if(value == 'enabled'){
        this.enableSideBar = true;
      }
      if(value == 'disabled') {
        this.enableSideBar = false
      }
    })


    this.service.getCat({'ref': 'cafetria'}).subscribe(res => {
      this.result = res;
      this.spinner.hide();
      return this.result;
    });
    this.cookie.delete('id')

  }

}
