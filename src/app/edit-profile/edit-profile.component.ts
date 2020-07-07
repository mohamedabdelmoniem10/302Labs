import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private service: ServiceService, private fb: FormBuilder, private cookie: CookieService, private router: Router) { }


editting = this.fb.group({
  email: [''],
  newpass: [''],
  name: [''],
  roomNumber: [''],
  phone: [''],
});


updateUserData() {
  
  console.log('this is the form value of editting',{ ...this.editting.value , ...this.label});
  this.service.updateUserData({ ...this.editting.value , ...this.label}).subscribe(res => {
    if(res) {
      console.log('this is the response::>>>>>>', res)
      this.cookie.delete('user');
      this.cookie.set('user',JSON.stringify(res));
      this.router.navigateByUrl('blank').then(() => {
        this.router.navigateByUrl('/profile')
        console.log('naviate to any route which you want');
  });
    }
  })
}


data;
email;
password;
name;
roomnumber;
phonenumber;
username;
label;

  ngOnInit() {
    this.data = JSON.parse(this.cookie.get('user')).userData;
    console.log('this.data', this.data)
          this.email = this.data.email;
          this.password = this.data.password;
          this.name = this.data.name;
          this.roomnumber = this.data.roomNumber;
          this.phonenumber = this.data.phone;
          this.username = this.data.name;
          this.label = {label: this.data.label};
  }

}
