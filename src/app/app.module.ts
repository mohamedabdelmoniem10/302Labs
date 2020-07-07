import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DataTablesModule } from 'angular-datatables';
import { NgxSpinnerModule } from "ngx-spinner";
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigningComponent } from './signing/signing.component';
import { AsideComponent } from './aside/aside.component';
import { RentComponent } from './rent/rent.component';
import { ProfileComponent } from './profile/profile.component';
import { CoffeshopComponent } from './coffeshop/coffeshop.component';
import { EventComponent } from './event/event.component';
import { ServiceService } from './service.service'
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RentalProductsComponent } from './rent/rental-products/rental-products.component';
import { CoffeProdComponent } from './coffeshop/coffe-prod/coffe-prod.component';
import { ErrorComponent } from './error/error.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FooterComponent } from './footer/footer.component';
import { BillingComponent } from './billing/billing.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SigningComponent,
    AsideComponent,
    RentComponent,
    ProfileComponent,
    CoffeshopComponent,
    EventComponent,
    RentalProductsComponent,
    CoffeProdComponent,
    ErrorComponent,
    FooterComponent,
    BillingComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ScrollToModule.forRoot()
  ],
  providers: [
    ServiceService,
    DatePipe,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
