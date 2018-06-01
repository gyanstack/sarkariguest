import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDealComponent } from './flight-deal.component';

describe('FlightDealComponent', () => {
  let component: FlightDealComponent;
  let fixture: ComponentFixture<FlightDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
