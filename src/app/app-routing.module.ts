import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentComponent } from './rent/rent.component';
import { CoffeshopComponent } from './coffeshop/coffeshop.component';
import { SigningComponent } from './signing/signing.component';
import { ProfileComponent } from './profile/profile.component';
import { EventComponent } from './event/event.component';
import { RentalProductsComponent } from './rent/rental-products/rental-products.component';
import { CoffeProdComponent } from './coffeshop/coffe-prod/coffe-prod.component';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';
import { BillingComponent } from './billing/billing.component';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rent',
    component: RentComponent,
    children: [
      {
        path: 'rental-prod',
        component: RentalProductsComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'coffeshop',
    component: CoffeshopComponent,
    children: [
      {
        path: 'coffe-prod',
        component: CoffeProdComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'events',
    component: EventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: SigningComponent
  },
  {
    path: 'signing',
    component: SigningComponent
  },
  {
    path: 'coffe-prod',
    component: CoffeProdComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rental-prod',
    component: RentalProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'billing',
    component: BillingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: ErrorComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
