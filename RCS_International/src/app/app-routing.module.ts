import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Campaign1Component } from './components/campaign1/campaign1.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component';
import { TeamInboxComponent } from './components/team-inbox/team-inbox.component';
import { AppComponent } from './app.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { RCSReportComponent } from './components/rcs-report/rcs-report.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { TemplateUIComponent } from './components/template-ui/template-ui.component';
import { DownloadCenterComponent } from './components/download-center/download-center.component';
import { XlfileUploadComponent } from './components/xlfile-upload/xlfile-upload.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { DynamicCampaignComponent } from './components/dynamic-campaign/dynamic-campaign.component';


const routes: Routes = [
  // {path:'', component:LoginComponent},
  {path:'', component:AppComponent},
  {path:'campaign-reports', component:Campaign1Component},
  {path:'campaign', component:CampaignComponent},
  {path:'nav', component:NavbarComponent},
  {path:'c-campaign', component:CreateCampaignComponent},
  {path:'team-inbox', component:TeamInboxComponent},
  {path:'RCS-Report', component:RCSReportComponent},
  {path:'purchase', component:PurchaseComponent},
  {path:'templateUI', component:TemplateUIComponent},
  {path:'download-center', component:DownloadCenterComponent},
  {path:'uploadExcelFile', component:XlfileUploadComponent},
  {path:'settings', component:SettingsComponent},
  {path:'campaignList', component:CampaignListComponent},
  {path:'temlate_List', component:TemplateListComponent},
  {path:'dynamic-campaign', component:DynamicCampaignComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
