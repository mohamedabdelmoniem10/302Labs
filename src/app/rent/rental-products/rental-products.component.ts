import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { FormControlName, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rental-products',
  templateUrl: './rental-products.component.html',
  styleUrls: ['./rental-products.component.css']
})
export class RentalProductsComponent implements OnInit {
  bEurl = environment.apiUrl;
  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private service: ServiceService, private cookie: CookieService) { }


  result :any;
  image;
  name;
  info;
  price;
  preview;
  close;
  confirmMsg;
  h;
  
  id;
  tPrice;
  
  



  renting = this.formBuilder.group({
    noHour: [''],
    noItems: [''],
    place: ['']
  })
  
  
  previewItem(image, name, info, id, price) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.info = info;
    this.price = price;
    this.h = this.renting.value.noHour;
    this.preview = true;
    this.close = false;
  }
  closeItem() {
    this.close = true;
    this.preview = false;
  }
  calcPrice() {
    this.h = this.renting.value.noHour;
  }



  // this will send for backend

  rentReq() {
    this.tPrice = this.renting.value.noHour * this.price / 3;
    console.log({
      productId: this.id,
      NumofHours: this.renting.value.noHour,
      NumofItems: this.renting.value.noItems
    });
    this.service.rent({
      productId: this.id,
      NumofHours: this.renting.value.noHour,
      NumofItems: this.renting.value.noItems,
      place: this.renting.value.place
    }).subscribe(res => {
      console.log(res)
      if(res[status] = 'done') {
        console.log('done')
        this.close = true;
        this.preview = false;
        this.confirmMsg = res;
      }
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
    this.service.getRentProd({'_id':this.cookie.get('id')}).subscribe(res => {
      this.result = res;
      this.spinner.hide();
      console.log(res)
      return this.result;
    })
  }




}
