import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystMessagesComponent } from './analyst-messages.component';

describe('AnalystMessagesComponent', () => {
  let component: AnalystMessagesComponent;
  let fixture: ComponentFixture<AnalystMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalystMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
