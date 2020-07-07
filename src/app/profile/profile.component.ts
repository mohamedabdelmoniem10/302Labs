import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { FormControl, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  bEurl = environment.apiUrl;
  constructor(private service: ServiceService,private router: Router, private cookie: CookieService, private fb: FormBuilder) { }


  showField = false;
  // this is the form group that take editing the info 



// this for updating profile image
uploadImg = this.fb.group({
  img: []
})

newData;
 urlOfImg;
  uploadImgFunc(e) {
    console.log(this.cookie.get('token'))
    console.log(e.target.files)
    if (e.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]); 
      reader.onload = (event: any) => {
        this.userImage = event.target.result;
        console.log(this.userImage);
        this.cookie.set('urlOfImg', this.userImage);
        this.urlOfImg = this.userImage;
        console.log('urlOfImg', this.urlOfImg);
      }
      this.service.postUserImg(e.target.files[0]).subscribe(res => {
        console.log(res)
        if(res) {
          console.log(res)
          this.newData = JSON.stringify({userData: res})
          this.cookie.delete('urlOfImg', 'user');
          this.cookie.set('user', this.newData);
          this.data = JSON.parse(this.cookie.get('user')).userData
          this.cookie.set('urlOfImg', this.data.avatar)
        }
      },
      err => {
        console.log(err)
      })
    }
  }
//..... this for updating profile image



// this is the variable
  email;
  password;
  name;
  roomnumber;
  phonenumber;
  username;
  data;
  clicked;
  info = false;
  lastorder = false;
  rent;
  coffe;
  userImage;

  
  profileData() {
    this.data = JSON.parse(this.cookie.get('user')).userData;
    console.log('this.data', this.data)
          this.email = this.data.email;
          this.password = this.data.password;
          this.name = this.data.name;
          this.roomnumber = this.data.roomNumber;
          this.phonenumber = this.data.phone;
          this.username = this.data.name;
          if(this.data.avatar){
            this.cookie.set('urlOfImg', this.data.avatar)
            this.urlOfImg = this.bEurl + this.cookie.get('urlOfImg');
          }
  }




  // this method below for showing and hiding side bar 
  enableSideBar;
  showSideBar() {
    this.service.updateSideBarStatus('enabled')
  }

  ngOnInit() {
    this.service.sideBarStatus.subscribe(value => {
      if(value == 'enabled'){
        this.enableSideBar = true;
      }
      if(value == 'disabled') {
        this.enableSideBar = false
      }
    })
    this.urlOfImg = '../assets/user.png';
    this.profileData();
    if(this.cookie.get('urlOfImg')) {
      this.urlOfImg = this.bEurl + this.cookie.get('urlOfImg')
    }
  }

  infoPanel() {
    this.info = true;
  }


}
