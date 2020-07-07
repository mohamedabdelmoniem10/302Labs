import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { RentalProductsComponent } from './rental-products/rental-products.component';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  bEurl = environment.apiUrl;
  constructor(private spinner: NgxSpinnerService, private service: ServiceService, private router: Router, private cookie: CookieService) { }
result :any;
getParam(p) {
  this.cookie.set('id', p)
  if(this.cookie.get('id')) {
    this.router.navigate(['rental-prod'])
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
  this.service.getCat({'ref': 'rent'}).subscribe(res => {
    console.log(res)
    this.result = res;
    this.spinner.hide();
    return this.result;
  });
  this.cookie.delete('id')
  }






}