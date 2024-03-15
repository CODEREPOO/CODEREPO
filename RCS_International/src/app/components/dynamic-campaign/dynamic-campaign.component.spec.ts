import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCampaignComponent } from './dynamic-campaign.component';

describe('DynamicCampaignComponent', () => {
  let component: DynamicCampaignComponent;
  let fixture: ComponentFixture<DynamicCampaignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicCampaignComponent]
    });
    fixture = TestBed.createComponent(DynamicCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
