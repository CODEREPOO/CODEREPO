import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateUIComponent } from './template-ui.component';

describe('TemplateUIComponent', () => {
  let component: TemplateUIComponent;
  let fixture: ComponentFixture<TemplateUIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateUIComponent]
    });
    fixture = TestBed.createComponent(TemplateUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
