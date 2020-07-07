import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ServiceService } from '../service.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  private bEurl = environment.apiUrl
  model: NgbDateStruct;
  date: {year: number, month: number, day: number};
  
  allEvents;
  
 myEvent = { date: 0 , name :"" , desc: "" , sponsor: '', img : "" , gust:[], details: ""};
 viewControl = false;
 eventControl ;
 
  constructor(private calendar: NgbCalendar, private datePipe: DatePipe, private service: ServiceService, private cookie: CookieService, private spinner: NgxSpinnerService) {
  }
  selectToday() {
    this.model = this.calendar.getToday();
    setTimeout(() => {
      this.onDateSelected();
    }, 100);
  }
 noGust = 0;
 event;
  gustInc(){
    this.service.addGest({ event_ID: this.addGest._id}).subscribe(res => {
      this.service.eventGests({event_ID: this.addGest._id}).subscribe(res => {
        this.enabled = true;
      });
      this.event = res;
      this.noGust = this.event.guests.length;
    })
  }
  addGest;
  enabled;
  apologizeMsg = false;
  onView()
  {
    this.viewControl = true;
  }
  onDateSelected() {
 for (let ev of this.allEvents) {
  if(this.model.day === ev.date ) {
    this.eventControl = true;
    this.myEvent.date = ev.date;
    this.myEvent.desc = ev.description;
    this.myEvent.name = ev.name;
    this.myEvent.gust = ev.guests;
    this.myEvent.img = this.bEurl + '/' +ev.image;
    this.myEvent.sponsor = ev.sponsor
    this.addGest = ev;
    this.service.eventGests({event_ID: ev._id}).subscribe(res => {
      this.enabled = res;
      this.noGust = ev.guests.length;
    });
  break;
  }
  else{
 this.eventControl = false;
 this.apologizeMsg = true;
  }
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

    this.service.event().subscribe(res => {
    this.allEvents = res;
    this.spinner.hide();
    })
    this.selectToday();
  }
 }