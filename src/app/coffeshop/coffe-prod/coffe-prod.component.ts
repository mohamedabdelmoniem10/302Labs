import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coffe-prod',
  templateUrl: './coffe-prod.component.html',
  styleUrls: ['./coffe-prod.component.css']
})
export class CoffeProdComponent implements OnInit {
  bEurl = environment.apiUrl;
  constructor(private fb: FormBuilder, private service: ServiceService,private cookie:CookieService, private spinner: NgxSpinnerService) { 
  }

  result :any;
  id;
  image;
  price;
  name;
  preview;
  close;
  confirmMsg;
  h;
  tPrice;


coffing= this.fb.group({
  no: [''],
  customization: [''],
  place: ['']
})



  previewItem(id, image, price, name) {
    console.log('the previw fuc: id: >>', id)
    this.id = id;
    console.log('this id>>>>', this.id)
    this.image = image;
    this.price = price;
    this.name = name;
    this.h = this.coffing.value.no;
    this.coffing.value.id = id;
    console.log('this.coffing.value.id>>>>', this.coffing.value.id);
    
    this.preview = true;
    this.close = false;
  }
  
  closeItem() {
    this.close = true;
    this.preview = false;
  }
 

  coffeReq() {
    this.tPrice = this.coffing.value.no * this.price / 3;
    console.log('COFFEIGN.VALUE : ', {
      productId: this.id,
      NumofItems: this.coffing.value.no,
      customDesc: this.coffing.value.customization,
      place: this.coffing.value.place
    })
    this.service.coffing({
      productId: this.id,
      NumofItems: this.coffing.value.no,
      customDesc: this.coffing.value.customization,
      place: this.coffing.value.place
    }).subscribe(res => {
      if(res[status] = 'done') {
        this.confirmMsg = res;
        this.close = true;
        this.preview = false;
      }
    })
  }
 
  calcPrice() {
    this.h = this.coffing.value.no
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
