import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalProductsComponent } from './rental-products.component';

describe('RentalProductsComponent', () => {
  let component: RentalProductsComponent;
  let fixture: ComponentFixture<RentalProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
