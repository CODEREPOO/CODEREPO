import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { NgxPhotoEditorModule } from "ngx-photo-editor";
import { Ng2ImgMaxModule } from 'ng2-img-max'; // <-- import the module




import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';




import { NgCircleProgressModule } from 'ng-circle-progress';



import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


import { LucideAngularModule, File, Home, Menu,Sheet ,FileCheck ,Upload , UserCheck, Send, Pencil, UserCircle2, StickyNote, X, Inspect, Power, AreaChart, Search, Gauge, Link, XCircle, Trash2, Phone, Globe, Download, FileDown } from 'lucide-angular';


import { AppComponent } from './app.component';
import { Campaign1Component } from './components/campaign1/campaign1.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component';
import { TeamInboxComponent } from './components/team-inbox/team-inbox.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { TemplateUIComponent } from './components/template-ui/template-ui.component';
import { DownloadCenterComponent } from './components/download-center/download-center.component';
import { XlfileUploadComponent } from './components/xlfile-upload/xlfile-upload.component';
import { SettingsComponent } from './components/settings/settings.component';

import { ServerService } from './components/server.service';
import { RCSReportComponent } from './components/rcs-report/rcs-report.component';
import { DatePipe } from '@angular/common';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { FilterPipe } from './components/filter.pipe';
import { DynamicCampaignComponent } from './components/dynamic-campaign/dynamic-campaign.component';
import { TempListFileterPipe } from './components/temp-list-fileter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    Campaign1Component,
    LoginComponent,
    NavbarComponent,
    CreateCampaignComponent,
    TeamInboxComponent,
    CampaignComponent,
    RCSReportComponent,
    PurchaseComponent,
    TemplateUIComponent,
    DownloadCenterComponent,
    XlfileUploadComponent,
    SettingsComponent,
    CampaignListComponent,
    TemplateListComponent,
    FilterPipe,
    DynamicCampaignComponent,
    TempListFileterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,



    ToastrModule.forRoot({
      timeOut: 7000,
      progressBar: true,
      preventDuplicates: true
    }),

    ClipboardModule,
    MatSortModule,
    MatExpansionModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule, MatInputModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatRadioModule, 
    MatRippleModule, 
    MatIconModule, 
    MatCardModule, 
    MatDividerModule, 
    MatPaginatorModule, 
    MatProgressBarModule, 
    MatButtonToggleModule,
    MatTooltipModule,MatTabsModule,
    MatStepperModule,

    NgxPhotoEditorModule,
    Ng2ImgMaxModule,
    NgCircleProgressModule.forRoot({
      radius: 60,
      outerStrokeGradient: false,
      outerStrokeWidth: 160,
      outerStrokeColor: "#78C000",
      outerStrokeGradientStopColor: "#53a9ff",
      innerStrokeColor: "#C7E596",
      innerStrokeWidth: 100,
      // title:"RCS",
      units: "",
      subtitle: "/ 1000",
      animateTitle: true,
      animationDuration: 300,
    }),


    LucideAngularModule.pick({ File, Home, Menu,Sheet ,FileCheck ,Upload , UserCheck, Send, Pencil, UserCircle2, StickyNote, X, Inspect, Power, AreaChart, Search, Gauge, Link, XCircle, Trash2, Phone, Globe, Download, FileDown })
  ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerService,
      multi: true
    }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
