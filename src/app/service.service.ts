import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  constructor(private http: HttpClient, private cookie: CookieService, private _scrollToService: ScrollToService) { }

  backendurl = environment.apiUrl

  


  private prodSource = new BehaviorSubject(0);
  id = this.prodSource.asObservable();
  prodId(id) {
    this.prodSource.next(id)
  }
  private isLogedInSource = new BehaviorSubject('');
  isLogedIn = this.isLogedInSource.asObservable();
  updateLoging(isLogedIn) {
    this.isLogedInSource.next(isLogedIn)
  }
  private errorSource = new BehaviorSubject('');
  error = this.errorSource.asObservable();
  updateError(error) {
    this.errorSource.next(error)
  }
  private interestedSource = new BehaviorSubject('');
  interested = this.interestedSource.asObservable();
  updateInterest(interest) {
    this.interestedSource.next(interest)
  }
  private userImageSource = new BehaviorSubject(this.cookie.get('userImage'));
  userImage = this.userImageSource.asObservable();
  updateUserImage(image) {
    this.userImageSource.next(image);
  }



  rent(param) {
    return this.http.post(this.backendurl +'api/rentItem', param, {
      headers: new HttpHeaders({
      'x-auth-token': this.cookie.get('token'),
      'Accept': 'application/json'
    })
  });
  }
  coffing(param) {
    return this.http.post(this.backendurl +'api/getCofe', param, {
      headers: new HttpHeaders({
      'x-auth-token': this.cookie.get('token'),
      'Accept': 'application/json'
    })
  });
  }



  
  postDataLogin(param) {
    console.log(param)
    return this.http.post(this.backendurl +'api/login', param);
  }
  postDataReg(param) {
    console.log(param)
    return this.http.post(this.backendurl +'api/users/register', param);
  }

  
  setUserData(user, data): void {
    try {
      this.cookie.set(user, data)
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  getUserData(user) {
    try {
      console.log(user);
      console.log(this.cookie.get(user));
      
      return this.cookie.get(user);
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  updateUserData(param) {
    return this.http.post(this.backendurl + 'api/users/me/update', param, {
      headers: new HttpHeaders({
      'x-auth-token': this.cookie.get('token'),
      'Accept': 'application/json'
    })
   })
  }
  
  postUserImg(param) {
    let fd = new FormData;
    fd.append('file', param);
    return this.http.post(this.backendurl +"api/users/image", fd,{
      headers: new HttpHeaders({
      'x-auth-token': this.cookie.get('token'),
      'Accept': 'application/json'
    })
   })
  }




  getCat(param) {
    return this.http.post(this.backendurl +'api/forRentAndCafetriaCategory', param)
  }
  getRentProd(param) {
    console.log(param)
    return this.http.post(this.backendurl +'api/forRentAndCafetriaItems', param)
  }
  

  event() {
    return this.http.get(this.backendurl +'api/allEvents');
  }
  eventGests(p) {
    let header = new HttpHeaders();
        header.append('x-auth-token',this.cookie.get('id'));
   
    return this.http.post(this.backendurl +'api/interestinEvent', p,{
      headers: new HttpHeaders({
      'x-auth-token': this.cookie.get('token'),
      'Accept': 'application/json'
    })
   });
  }
  addGest(p) {
    return this.http.post(this.backendurl +'api/addGuest', p,{
      headers: new HttpHeaders({
      'x-auth-token': this.cookie.get('token'),
      'Accept': 'application/json'
    })
   });
  }

  getBillingData(param) {
    console.log('param', param)
    return this.http.post(this.backendurl + 'api/billing/lastRequests', {
      _id: param
    }, {
      headers: new HttpHeaders({
        'x-auth-token': this.cookie.get('token'),
        'Content-Type': 'application/json',
      })})
  }

  

  // side bar method to disable it and enable 
  sideBarStatusSource = new BehaviorSubject('enable');
  sideBarStatus = this.sideBarStatusSource.asObservable();
  updateSideBarStatus(sideBarStatus) {
    this.sideBarStatusSource.next(sideBarStatus)
  }


  // this method for getting companies 
  companies() {
    return this.http.get(this.backendurl + 'api/users/allCompanies')
  }


// this bellow method for scrolling
public downMeth() {
    
  /**
   * @see NOTE:1
   */
  const config: ScrollToConfigOptions = {
    target: 'down',
    duration: 1000,
    easing: 'easeInOutQuad',
    offset: 20
  };

  this._scrollToService.scrollTo(config);

}

}
