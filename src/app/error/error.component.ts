import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private service: ServiceService) { }

  error;

  
  
  
  
  ngOnInit() {
    this.service.error.subscribe(er => {
      this.error = JSON.stringify(er);
    })
  }

}
