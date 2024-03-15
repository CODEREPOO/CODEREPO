import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsReportComponent } from './rcs-report.component';

describe('SmsReportComponent', () => {
  let component: SmsReportComponent;
  let fixture: ComponentFixture<SmsReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmsReportComponent]
    });
    fixture = TestBed.createComponent(SmsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
