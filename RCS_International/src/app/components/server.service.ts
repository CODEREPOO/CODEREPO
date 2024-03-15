import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {


  private buttonClickSource = new Subject<void>();
  buttonClick$ = this.buttonClickSource.asObservable();


  // apiurl = "http://localhost:3001";
  // downloadCenterReport="http://103.73.191.131:7070"
  // downloadCenterReport="http://192.168.29.93:8080"
  // apiurl = "http://103.73.191.132:8000"
  apiurl = "http://158.69.0.245:3001"
  // http://103.73.191.132:3001

  passValue = new BehaviorSubject<any>('');

  btnboolean = new BehaviorSubject<boolean>(false);
  slideBarButton = new BehaviorSubject<any>("");
  api = new BehaviorSubject<string>(this.apiurl);

  constructor(private http: HttpClient) { }

  getLogoRelatedDomain(dn: any) {
    const url = `${this.apiurl}/`;
    return this.http.post(url, dn);
  }

  login(credentials: any): Observable<any> {
    const url = `${this.apiurl}/login`;
    return this.http.post(url, credentials);

  }

  compose(compose_Data: any) {
    const url = `${this.apiurl}/compose/`;
    return this.http.post(url, compose_Data);
  }
  compose_bulk(compose_Data: any) {
    const url = `${this.apiurl}/compose/bulk`;
    return this.http.post(url, compose_Data);
  }

  getUserRCSTemp() {
    const url = `${this.apiurl}/getUserRCSTemp`;
    return this.http.get(url);
  }
  report(reportData: any) {
    const url = `${this.apiurl}/smsReport`;
    return this.http.post(url, reportData);
  }

  APIKEY() {
    const url = `${this.apiurl}/apikey_re_gen`;
    return this.http.get(url);
  }
  re_Gen_APIKEY() {
    const url = `${this.apiurl}/apikey_re_gen/generate`;
    return this.http.get(url);
  }

  getSmartCredits() {
    const url = `${this.apiurl}/credit_Bal_Smart`;
    return this.http.get(url);
  }

  download_Report(filename: any) {
    const url = `${this.apiurl}/reportDownload`;
    return this.http.post(url, filename, { responseType: 'blob' });
  }

  getDownloadCenterDetails() {
    const url = `${this.apiurl}/download_Center`;
    return this.http.get(url);
  }

  postTemplateJsonData(templateData: any) {
    const url = `${this.apiurl}/InsertingJIOTemplate/`;
    return this.http.post(url, templateData);
  }

  postMediaFiles(data: any) {
    const url = `${this.apiurl}/templateJsonData/`;
    return this.http.post(url, data);
  }

  addTemplateinourDB(temp:any){
    const URL = `${this.apiurl}/templateJsonData/insert`;
    return this.http.post(URL,temp);
  }
  deleteTemplateinourDB(temp:any){
    const URL = `${this.apiurl}/templateJsonData/delete`;
    return this.http.post(URL,temp);
  }

  postExcelFile(data: any) {
    const url = `${this.apiurl}/uploadExcelFile/`;
    return this.http.post(url, data);
  }
  postExcelFileDetails(data1: any) {
    const url = `${this.apiurl}/uploadExcelFile/`;
    return this.http.post(url, data1);
  }

  getAllCampaigns() {
    const url = `${this.apiurl}/Campaigns`;
    return this.http.get(url);
  }

  downloadCampaign(data: any) {
    const url = `${this.apiurl}/Campaigns/downloadCampaign`;
    return this.http.post(url, data);
  }

  forgetPassword(email: any) {
    const url = `${this.apiurl}/forget_Password_gen`;
    return this.http.post(url, email);
  }

  changePwdByUser(pwd: any) {
    const url = `${this.apiurl}/changeUserPwd`;
    return this.http.post(url, pwd);
  }

  getTemplatePreview(tName:any){
    const URL = `${this.apiurl}/Get_RCS_Template`;
    return this.http.post(URL,tName);
  }
  Delete_Template(tName:any){
    const URL = `${this.apiurl}/Get_RCS_Template/delete_temp`;
    return this.http.post(URL,tName);
  }


  RCSFileUpload(file:any){
    const URL = `${this.apiurl}/rcs_file_upload/uploads`;
    return this.http.post(URL,file)
  }


  recall_Credits() {
    this.buttonClickSource.next();
  }


  UploadImagetooJio(data:any){
    const URL =`${this.apiurl}/uploadImageToJio/`;
    return this.http.post(URL,data);
  }










  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token_RCS');
    const modifiedRequest = request.clone({
      headers: request.headers.set('token_RCS', `${token}`)
    });

    // return next.handle(modifiedRequest);
    return next.handle(modifiedRequest)
      .pipe(
        tap({
          next: (event) => {
            if (event instanceof HttpResponse) {
              if (event.status == 401) {
                localStorage.removeItem('token_RCS');
                sessionStorage.removeItem('login_status');
                alert('Token Expired Please Re-Login.!');
                window.location.reload();
                return;
              }
            }
            return event;
          },
          error: (error) => {
            if (error.status == 401) {
              localStorage.removeItem('token_RCS');
              sessionStorage.removeItem('login_status');
              alert('Token Expired Please Re-Login.!');
              window.location.reload();
              return;
            }
          }
        })

      )
  }
}
