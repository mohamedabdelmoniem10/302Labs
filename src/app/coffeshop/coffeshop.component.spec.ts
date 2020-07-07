import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeshopComponent } from './coffeshop.component';

describe('CoffeshopComponent', () => {
  let component: CoffeshopComponent;
  let fixture: ComponentFixture<CoffeshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
