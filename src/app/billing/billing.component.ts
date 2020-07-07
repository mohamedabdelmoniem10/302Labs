import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  constructor(private service: ServiceService, private cookie: CookieService, private spinner: NgxSpinnerService) { }





  drinkTotalPrice;
  rentTotalPrice;
  result;
  orders;
  paid;
  getBillingData() {
    console.log('_id', JSON.parse(this.cookie.get('user')).userData._id)
    this.service.getBillingData(JSON.parse(this.cookie.get('user')).userData._id).subscribe(res => {
      this.result = res;
      this.spinner.hide();
      this.drinkTotalPrice = this.result.drinkTotal;
      this.rentTotalPrice = this.result.rentTotal;
      this.orders = this.result.result;
      console.log(res);
    })
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

    this.getBillingData();
  }

}
