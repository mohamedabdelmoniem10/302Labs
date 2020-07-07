import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeProdComponent } from './coffe-prod.component';

describe('CoffeProdComponent', () => {
  let component: CoffeProdComponent;
  let fixture: ComponentFixture<CoffeProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
