// comment 
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ServiceService } from "../service.service";
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.css']
})
export class SigningComponent implements OnInit {
  
  //in this component I learn a new thing called formBuilder that replaced with "new FormGroup".... and this form builder must call in the constructor


  constructor(private fb: FormBuilder, private service: ServiceService, private router:Router, private cookie: CookieService) { }


  
  logInForm = this.fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
    forgetpassword: ['']  
  });
  
  
  companySignUp = this.fb.group({
    name: ['', Validators.required, Validators.minLength(3)],
    phone: ['', Validators.required, Validators.minLength(11)],
    owner: ['', Validators.required],
    roomNumber: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(5)],
    confirmPassword: ['', Validators.required],
    cat: ['company'],
    label: ['company']
  });
  
  customerSignUp = this.fb.group({
    email: ['', Validators.required, Validators.email],
    phone: ['', Validators.required, Validators.minLength(11)],
    name: ['', Validators.required, Validators.minLength(5)],
    password: ['', Validators.required, Validators.minLength(5)],
    confirmPassword: ['', Validators.required],
    cat: ['customer']
  });
  
  employeeSignUp = this.fb.group({
    companyRef: ['', Validators.required, Validators.minLength(3)],
    phone: ['', Validators.required, Validators.minLength(11)],
    email: ['', Validators.required, Validators.email],
    name: ['', Validators.required, Validators.minLength(5)],
    password: ['', Validators.required, Validators.minLength(5)],
    confirmPassword: ['', Validators.required],
    cat: ['employee']
  });
  
  
  // here is the variables in this component
  paramlogin = this.logInForm;
  paramcompany = this.companySignUp;
  paramcustomer = this.customerSignUp;
  paramemployee = this.employeeSignUp
  email;
  password;
  companyRef;
  roomnumber;
  phone;
  name;
  owner;
  confirmmsg;
  confirmmsgsuc;
  data = 'user';
  
  
  
  //this variable and method for the eye btn that show and hide password
  type = "password";
  toggleShow() {
    if(this.type === "password") {
      this.type = "text";
      return this.type;
    }else{
      this.type = "password";
      return this.type;
    }
  }

  //this method for validate fields in the forms
  validate(param) {
    const invalid = [];
    const controls = param.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
        }
    }
    if(invalid.length > 0) {
      for(var parse of invalid) {
        if(parse == 'email') {
          this.email = 'please enter a valid email'
          console.log('valid1')
        }
        if(parse == 'password') {
          this.password = 'this field is required'
          console.log('valid2')
        }
        if(parse == 'companyRef') {
          this.companyRef = 'this field is required'
          console.log('valid3')
        }
        if(parse == 'roomNumber') {
          this.roomnumber = 'this field is required'
          console.log('valid4')
        }
        if(parse == 'phone') {
          this.phone = 'this field is required'
          console.log('valid5')
        }
        if(parse == 'name') {
          this.name = 'this field is required'
          console.log('valid6')
        }
        if(parse == 'owner') {
          this.owner = 'this field is required'
          console.log('valid7')
        }
      }
    }
    if(invalid.length == 0) {
      console.log('ay 7aga')

      if(param == this.paramlogin){
      console.log('here from login', param.value)
      this.service.postDataLogin(param.value).subscribe(res => {
          // console.log(res);
          console.log('from login here' , res)
          if(res && res != null) {
            param.reset();
            this.cookie.set('token', res['token']);               //this for saving token in the cookies
            this.cookie.set('userImage', res['avatar']);           //this for saving user image in the cookies
            this.service.setUserData(this.data, JSON.stringify(res));             //this for setting user data in the local storage and you can remove it and replace it with cookie
            this.service.updateLoging(this.cookie.get('token'));  //this for getting token from cookie to be authinticated in the whole website
            console.log('welcome to our comunity!');              //this for just debbuging this if condition
            this.router.navigate(['profile']);                    //this for navigate to the website 
        }


        //this below call back method for handling errors from the back end if this user is not allowed or not in db
      }, err => {
        if(err.status == 400) {
          this.service.updateError(err)
          this.password = 'please enter a valid password'
          this.email = 'please enter a valid email'
        }
      });
    }

    // this for register
    if(param != this.paramlogin){
      console.log('here from regis')
      this.service.postDataReg(param.value).subscribe(res => {
          if(res && res != null) {              //this for just debbuging this if condition
            param.reset();
            this.router.navigateByUrl('blank').then(() => {
              this.router.navigateByUrl('/')
              console.log('naviate to any route which you want');
        });
        }


        //this below call back method for handling errors from the back end if this user is not allowed or not in db
      }, err => {
        if(err.status == 400) {
          console.log(err)
          this.service.updateError(err)
          this.password = 'please enter a valid password'
          this.email = 'please enter a valid email'
        }
      });
    }

  }
    
}  



//this method for confirm password in the registeration form 
confirmPassword(param) {
  console.log('hi from confirmPassword')
  if(param.value.confirmPassword != param.value.password) {
    this.confirmmsg = "this password don't match";
    this.confirmmsgsuc = false;
  }
  if(param.value.confirmPassword == param.value.password) {
    this.confirmmsgsuc = "mached."
    this.confirmmsg = false;
  }
}

  valid() {
    this.password = false;
    this.email = false;
    this.companyRef = false;
    this.roomnumber = false;
    this.phone = false;
    this.name = false;
    this.owner = false;
  }



  // these methods for the sign up btn

  Company;
  Customer;
  Employee;
  Login;
  company() {
    this.Customer = false;
    this.Employee = false;
    this.Login = false;
    return this.Company = true;
  }
  customer() {
    this.Employee = false;
    this.Company = false;
    this.Login = false;
    return this.Customer = true;
  }
  employee() {
    this.Customer = false;
    this.Company = false;
    this.Login = false;
    return this.Employee = true;
  }
  login() {
    this.Customer = false;
    this.Company = false;
    this.Employee = false;
    return this.Login = false;
  }
    
  companies;
  getCompanies() {
    this.service.companies().subscribe(res => {
      this.companies = res;
    });
  }
  

  downMeth() {
    this.service.downMeth()
  }
  

  ngOnInit() {
    this.getCompanies();
    this.cookie.deleteAll();
    
  }

}
