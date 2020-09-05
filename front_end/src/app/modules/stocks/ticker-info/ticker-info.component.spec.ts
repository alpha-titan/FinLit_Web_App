import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerInfoComponent } from './ticker-info.component';

describe('TickerInfoComponent', () => {
  let component: TickerInfoComponent;
  let fixture: ComponentFixture<TickerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
