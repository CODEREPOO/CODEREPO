import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XlfileUploadComponent } from './xlfile-upload.component';

describe('XlfileUploadComponent', () => {
  let component: XlfileUploadComponent;
  let fixture: ComponentFixture<XlfileUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XlfileUploadComponent]
    });
    fixture = TestBed.createComponent(XlfileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
