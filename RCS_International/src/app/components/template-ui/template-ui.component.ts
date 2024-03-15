import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';
import { CCardModel } from './template-ui.model';
import { ServerService } from '../server.service';
import { ToastrService } from 'ngx-toastr';
import { Ng2ImgMaxService } from 'ng2-img-max';
import data from "../../../assets/Languages/countryCodes.json";
import RNames from '../../../assets/Languages/resellersNames.json';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-template-ui',
  templateUrl: './template-ui.component.html',
  styleUrls: ['./template-ui.component.css']
})
export class TemplateUIComponent implements OnInit {

  countryCodes: any[] = [];
  cardModel: CCardModel = new CCardModel();

  cardIDX: any = 0;


  templateType: any = 'rich_card';


  // Image_Video 
  img_file: any = '';
  img_file_name: any = "Please upload file";

  RCSAOutputT: any;
  RCSAOutputTLength: number = 0;
  RCSAOutputD: any;
  RCSAOutputDLength: number = 0;
  RCCOutputT: any;
  RCCOutputTLength: number | undefined = 0;
  RCCOutputD: any;
  RCCOutputDLength: number | undefined = 0;
  messageField: any;
  messageFieldLength: number = 0;

  STReply: any;
  STUrl: any;
  STdialer: any;

  btnReply: any;
  btnUrl: any;
  btnDialer: any;

  horizontalAxis: boolean = true;
  imageSizes: boolean = true;
  imagePosition: boolean = true;
  RCSAbox: boolean = false;
  RCCbox: boolean = false;
  textM: boolean = false;
  emptyfield: boolean = true;
  SRccCardWidth: boolean = false;
  SRccCardHeight: boolean = false;
  isvideo: boolean = false;
  isgif: boolean = false;
  ShowRCC: boolean = data.isShowRCC;

  sendGif: boolean = false;
  sendVideo: boolean = false;

  // isCaurosel: boolean = false;

  suggArrCount = [
    {
      suggREPTextInp: 0,
      suggREPPostInp: 0,

      suggURLUrlInp: 0,
      suggURLPostInp: 0,
      suggURLTextInp: 0,

      suggDAILTextInp: 0,
      suggDAILPostInp: 0
    }
  ]

  suggestions!: FormGroup;

  RccCardBtnArr: any[] = ["Card"];
  RccCard: any = [];
  RccCard1: any = [];
  RccCardImages: any[] = [];

  Arr: any[] = [];

  ar: any;
  rich_template_data: any;


  RCSACardData = this.fb.group({
    img_File: [],
    img_File_Name: [''],
    cardTitle: [''],
    cardDesc: ['']
  })

  RCCCardData = this.fb.group({
    img_File: [],
    img_File_Name: ['Please upload file'],
    cardTitle: [''],
    cardDescription: ['']
  })

  emptyfield1: boolean = true;
  emptyfield2: boolean = true;
  emptyfield3: boolean = true;
  emptyfield4: boolean = true;
  emptyfield5: boolean = true;
  emptyfield6: boolean = true;
  emptyfield7: boolean = true;
  emptyfield8: boolean = true;
  emptyfield9: boolean = true;
  emptyfield10: boolean = true;
  RCCC1: any = this.fb.group({
    suggestions: this.fb.array([])
  })
  RCCC2: any = this.fb.group({
    suggestions: this.fb.array([])
  })
  RCCC3: any = this.fb.group({
    suggestions: this.fb.array([])
  })
  RCCC4: any = this.fb.group({
    suggestions: this.fb.array([])
  })
  RCCC5: any = this.fb.group({
    suggestions: this.fb.array([])
  })
  RCCC6: any = this.fb.group({
    suggestions: this.fb.array([])
  })
  RCCC7: any = this.fb.group({
    suggestions: this.fb.array([])
  })
  RCCC8: any = this.fb.group({
    suggestions: this.fb.array([])
  })
  RCCC9: any = this.fb.group({
    suggestions: this.fb.array([])
  })
  RCCC10: any = this.fb.group({
    suggestions: this.fb.array([])
  })
  img_file1: any;
  imgerr: any;
  templateName: any = 0;
  defaultCountryCode = '+91';
  pagelogo: any;
  cmpnyName: any;
  imageSizesTall: boolean = false;
  imageSizesMedium: boolean = false;



  constructor(private imgservice: NgxPhotoEditorService, private ng2ImgMaxService: Ng2ImgMaxService, private route: Router, private toast: ToastrService, private service: ServerService, private fb: FormBuilder) {
    // this.suggestions = fb.group({
    //   suggestion: this.fb.array([])
    // });
  }



  finalJsonData: any = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]*$/)]],
    type: ['rich_card'],
    orientation: ['HORIZONTAL'],
    height: ['SMALL'],
    // width: ['SMALL_WIDTH'],
    position: ['right'],
    fileName: [''],
    thumbnailFileName: [''],
    cardTitle: [''],
    cardDescription: [''],
    textMessageContent: [''],
    suggestions: this.fb.array([])
  })


  JioRCSAData:any = {
    contentMessage: {
      richCard: {
        standaloneCard: {
          thumbnailImageAlignment: this.finalJsonData.value.position,
          cardOrientation: this.finalJsonData.value.orientation,
          cardContent: {
            title: this.finalJsonData.value.cardTitle,
            description: this.finalJsonData.value.cardDescription,
            media: {
              height: this.finalJsonData.value.height,
              contentInfo: {
                fileUrl: ``,
                forceRefresh: 'false'
              }
            },
            suggestions: []
          }
        }
      }
    }
  }

  JioTextData:any = {
    contentMessage: {
      text: '',
      suggestions: []
    }
  }
  // Token Start


  ngOnInit(): void {
    this.ShowRCC = data.isShowRCC;

    console.log();

    this.RCSAbox = true;
    this.countryCodes = data.countryCodes;
    // console.log(data.countryCodes);
    // this.selectedIndex = sessionStorage.getItem('rcsIndex')
    // const parsedUrl = new URL(window.location.href);
    // const baseUrl = parsedUrl.origin;
    // const domain = baseUrl.split('//');
    // // console.log(baseUrl);
    // const dName = {
    //   // domainName: 'rcs.ashwiniinnovations.com'
    //   // domainName: 'dms.nxc.co.in'
    //   domainName: domain[1]
    // }
    // const cn = dName.domainName.split('.');
    // // console.log(domain[1]);
    // // console.log(this.RCSUSER);
    // // console.log(JSON.stringify(dName));

    // const arrNum = RNames.ResellerDomains.length;
    // let bCame: boolean = false;
    // this.service.getLogoRelatedDomain(dName).subscribe((res: any) => {
    //   for (let i = 0; i < arrNum; i++) {

    //     if (dName.domainName == RNames.ResellerDomains[i]) {

    //       bCame = true
    //       this.pagelogo = res.message.logo;
    //       this.cmpnyName = cn[1];
    //     }

    //   }
    //   if (!bCame) {
    //     this.pagelogo = "GG.jpg";
    //     this.cmpnyName = 'GreenAds Global'
    //   }
    // })

    const obj1 = {
      image: '',
      cardTitle: '',
      cardDescription: '',
      fileName: '',
      thumbnailFileName: '',
      suggestions: []
    }
    this.RccCard.push(obj1)

  }


  // Token End

  // aspect_ratio() {
  //   if (this.finalJsonData.value.orientation == 'VERTICAL') {
  //     if (this.finalJsonData.value.height == 'SHORT_HEIGHT') {
  //       this.ar = {
  //         width: 3,
  //         height: 1
  //       }
  //       return this.ar;
  //     }
  //     else if (this.finalJsonData.value.height == 'MEDIUM_HEIGHT') {
  //       this.ar = {
  //         width: 2,
  //         height: 1
  //       }
  //       return this.ar;
  //     }
  //   } else {
  //     this.ar = {
  //       width: 3,
  //       height: 4
  //     }
  //     return this.ar;
  //   }
  // }
  // Image
  // fileChangeHandler(event: any) {
  //   if (event.target.files[0].size <= 2000000 && (event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpg')) {

  //     this.imgservice.open(event, {
  //       // aspectRatio: 3 / 1,
  //       aspectRatio: this.aspect_ratio().width / this.aspect_ratio().height,
  //       // aspectRatio: 2/3,
  //       autoCropArea: 0,
  //       viewMode: 2
  //     }).subscribe((data: any) => {
  //       this.img_file = data;
  //       this.img_file_name = data.file.name;
  //       this.RCSACardData.controls['img_File'].setValue(this.img_file.file);
  //       this.RCSACardData.controls['img_File_Name'].setValue(this.img_file_name);
  //       this.RCCCardData.controls['img_File'].setValue(this.img_file.file);
  //       this.RCCCardData.controls['img_File_Name'].setValue(this.img_file_name);
  //       // console.log(this.RCSACardData.value.img_File);
  //       let ref = document.getElementById('close');
  //       ref?.click();
  //     });
  //   } else if (event.target.files[0].size <= 10000000 && event.target.files[0].type == 'video/mp4') {
  //     // console.log(event.target.files[0]);
  //     let file = event.target.files && event.target.files[0];
  //     let fr = new FileReader();
  //     let data: any;
  //     fr.readAsDataURL(file);
  //     if (file.type.indexOf('video') > -1) {
  //       this.isvideo = true;
  //     }
  //     fr.onload = (event) => {
  //       data = (<FileReader>event.target).result;
  //       this.isvideo = true;
  //       // console.log(data);

  //       this.img_file = data;
  //       // console.log(this.img_file);

  //       this.img_file_name = file.name;
  //       this.RCSACardData.controls['img_File'].setValue(this.img_file);
  //       this.RCSACardData.controls['img_File_Name'].setValue(this.img_file_name);
  //       // console.log(this.RCSACardData.controls['img_File'].value,"value");

  //       let ref = document.getElementById('close');
  //       ref?.click();
  //       this.sendVideo = true;
  //     }

  //     // this.isvideo = false;
  //     this.RCCCardData.controls['img_File'].setValue(this.img_file.file);
  //     this.RCCCardData.controls['img_File_Name'].setValue(this.img_file_name);
  //     // console.log(this.RCSACardData.value.img_File);

  //   } else if (event.target.files[0].size <= 2000000 && event.target.files[0].type == 'image/gif') {
  //     // console.log(event.target.files[0]);
  //     let file = event.target.files && event.target.files[0];
  //     let fr = new FileReader();
  //     let data: any;
  //     fr.readAsDataURL(file);
  //     if (file.type.indexOf('image') > -1) {
  //       this.isgif = true;
  //     }
  //     fr.onload = (event) => {
  //       data = (<FileReader>event.target).result;
  //       this.isgif = true;
  //       // console.log(data);

  //       this.img_file = data;
  //       // console.log(this.img_file);

  //       this.img_file_name = file.name;
  //       this.RCSACardData.controls['img_File'].setValue(this.img_file);
  //       this.RCSACardData.controls['img_File_Name'].setValue(this.img_file_name);
  //       // console.log(this.RCSACardData.controls['img_File'].value,"value");

  //       let ref = document.getElementById('close');
  //       ref?.click();
  //       this.sendVideo = true;
  //     }

  //     // this.isvideo = false;
  //     this.RCCCardData.controls['img_File'].setValue(this.img_file.file);
  //     this.RCCCardData.controls['img_File_Name'].setValue(this.img_file_name);
  //     // console.log(this.RCSACardData.value.img_File);

  //   }
  //   else {
  //     let ref = document.getElementById('close');
  //     ref?.click();
  //     this.imgerr = "Image size should be below 2MB."
  //     setTimeout(() => {
  //       this.imgerr = "";
  //     }, 3000)
  //   }
  // }

  uoloadImage(e: any) {
    // console.log(e.target.files[0]);
    const file: File = e.target.files[0];
    if (file) {
      this.img_file_name = e.target.files[0].name
      const formData = new FormData();
      formData.append('file', file, file.name);
      this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.media.contentInfo.fileUrl = `http://rcshub.telinfy.com/assets/JioUploadedImages/${this.img_file_name}`
      this.service.UploadImagetooJio(formData).subscribe({
        next: (res) => {

        }, error: (err) => {
          if (err.error.text == 'File uploaded successfully') {
            this.toast.success(`Image Uploaded. `, 'Done');

          }
        }
      })
      let ref = document.getElementById('close');
      ref?.click();
    }


  }

  // RCC Image

  RCCaspect_ratio() { // edit for rcc
    if (this.finalJsonData.value.height == 'SHORT_HEIGHT' && this.finalJsonData.value.width == 'SMALL_WIDTH') {

      this.ar = {
        width: 5,
        height: 4
      }
      return this.ar;

    }
    else if (this.finalJsonData.value.height == 'SHORT_HEIGHT' && this.finalJsonData.value.width == 'MEDIUM_WIDTH') {


      this.ar = {
        width: 2,
        height: 1
      }
      return this.ar;

    }
    else if (this.finalJsonData.value.height == 'MEDIUM_HEIGHT' && this.finalJsonData.value.width == 'SMALL_WIDTH') {

      this.ar = {
        width: 4,
        height: 5
      }
      return this.ar;

    }
    else if (this.finalJsonData.value.height == 'MEDIUM_HEIGHT' && this.finalJsonData.value.width == 'MEDIUM_WIDTH') {
      this.ar = {
        width: 4,
        height: 3
      }
      return this.ar;

    }
  }

  RCCfileChangeHandler(event: any) {
    let imgarr = event.target.files.length;
    if (event.target.files) {

      for (let img = 0; img < imgarr; img++) {
        if (event.target.files[img].size <= 5000000 && (event.target.files[img].type == 'image/jpeg' || event.target.files[img].type == 'image/png' || event.target.files[img].type == 'image/jpg')) {

          this.imgservice.open(event, {
            // aspectRatio: 3 / 1,
            aspectRatio: this.RCCaspect_ratio().width / this.RCCaspect_ratio().height,
            // aspectRatio: 2/3,
            autoCropArea: 0,
            viewMode: 2
          }).subscribe((data: any) => {

            this.img_file = data;
            this.img_file_name = data.file.name;
            this.RccCardImages.push(data)
            this.RccCard[this.cardIDX].image = this.RccCardImages[this.cardIDX].base64;
            this.RccCard[this.cardIDX].fileName = this.RccCardImages[this.cardIDX].file.name;
            this.RccCard[this.cardIDX].thumbnailFileName = this.RccCardImages[this.cardIDX].file.name;
            let ref = document.getElementById('close');
            ref?.click();
          });
        }
      }

    }
    // } else if (event.target.files[0].size <= 10000000 && event.target.files[0].type == 'video/mp4') {
    //   // console.log(event.target.files[0]);
    //   let file = event.target.files && event.target.files[0];
    //   let fr = new FileReader();
    //   let data: any;
    //   fr.readAsDataURL(file);
    //   if (file.type.indexOf('video') > -1) {
    //     this.isvideo = true;
    //   }
    //   fr.onload = (event) => {
    //     data = (<FileReader>event.target).result;
    //     this.isvideo = true;
    //     // console.log(data);

    //     this.img_file = data;
    //     // console.log(this.img_file);

    //     this.img_file_name = file.name;
    //     this.RCSACardData.controls['img_File'].setValue(this.img_file);
    //     this.RCSACardData.controls['img_File_Name'].setValue(this.img_file_name);
    //     // console.log(this.RCSACardData.controls['img_File'].value,"value");

    //     let ref = document.getElementById('close');
    //     ref?.click();
    //     this.sendVideo = true;
    //   }

    //   // this.isvideo = false;
    //   this.RCCCardData.controls['img_File'].setValue(this.img_file.file);
    //   this.RCCCardData.controls['img_File_Name'].setValue(this.img_file_name);
    //   // console.log(this.RCSACardData.value.img_File);

    // } else if (event.target.files[0].size <= 2000000 && event.target.files[0].type == 'image/gif') {
    //   // console.log(event.target.files[0]);
    //   let file = event.target.files && event.target.files[0];
    //   let fr = new FileReader();
    //   let data: any;
    //   fr.readAsDataURL(file);
    //   if (file.type.indexOf('image') > -1) {
    //     this.isgif = true;
    //   }
    //   fr.onload = (event) => {
    //     data = (<FileReader>event.target).result;
    //     this.isgif = true;
    //     // console.log(data);

    //     this.img_file = data;
    //     // console.log(this.img_file);

    //     this.img_file_name = file.name;
    //     this.RCSACardData.controls['img_File'].setValue(this.img_file);
    //     this.RCSACardData.controls['img_File_Name'].setValue(this.img_file_name);
    //     // console.log(this.RCSACardData.controls['img_File'].value,"value");

    //     let ref = document.getElementById('close');
    //     ref?.click();
    //     this.sendVideo = true;
    //   }

    //   // this.isvideo = false;
    //   this.RCCCardData.controls['img_File'].setValue(this.img_file.file);
    //   this.RCCCardData.controls['img_File_Name'].setValue(this.img_file_name);
    //   // console.log(this.RCSACardData.value.img_File);

    // }
    // else {
    //   let ref = document.getElementById('close');
    //   ref?.click();
    //   this.imgerr = "Image size should be below 2MB."
    //   setTimeout(() => {
    //     this.imgerr = "";
    //   }, 3000)
    // }
  }
  // RCC Image
  // Image

  // add Variables

  // addVarinRCSACtitle() {
  //   const text = '[custom_param]';
  //   this.finalJsonData.controls['cardTitle'].setValue(this.finalJsonData.controls['cardTitle'].value + text)
  //   this.title_Desc()
  // }
  // addVarinRCSACDesc() {
  //   const text = '[custom_param]';
  //   this.finalJsonData.controls['cardDescription'].setValue(this.finalJsonData.controls['cardDescription'].value + text)
  //   this.title_Desc()
  // }

  // add Variables

  // Suggestion Bar Starts

  get suggestionControl() {
    return this.finalJsonData.get('suggestions') as FormArray;
  }

  addSuggestion() {
    this.emptyfield = false;
    const Control: any = <FormArray>this.finalJsonData.controls['suggestions'];
    Control.push(this.fb.group({
      suggestionType: 'reply',
      displayText: [''],
      postback: ['MESSAGED'],
      url: [''],
      phoneNumber: ['+91']
    }));
    this.clearEmptyValues();

    // this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.finalJsonData.value.suggestions
    this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.suggestionControl.value
    this.JioTextData.contentMessage.suggestions = this.suggestionControl.value

    this.suggArrCount.push({
      suggREPTextInp: 0,
      suggREPPostInp: 0,

      suggURLUrlInp: 0,
      suggURLPostInp: 0,
      suggURLTextInp: 0,

      suggDAILTextInp: 0,
      suggDAILPostInp: 0
    })
    const i = Control.length - 1;
    if (Control.controls[i].value.postback == 'MESSAGED') {
      this.suggArrCount[i].suggREPPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'CALLED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'VISITED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }

  }

  removeItem(index: any) {
    const sFG = this.fb.group({
      suggestionType: '',
      displayText: '',
      postback: '',
      url: '',
      phoneNumber: ''
    });
    if (this.finalJsonData.get('suggestions')?.value[index].suggestionType == "reply") {
      this.STReply = "";
      this.suggArrCount[index].suggREPTextInp = 0;
      this.suggArrCount[index].suggREPPostInp = 0;
      // this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.finalJsonData.value.suggestions
      this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.suggestionControl.value
      this.JioTextData.contentMessage.suggestions = this.suggestionControl.value

    }
    else if (this.finalJsonData.get('suggestions')?.value[index].suggestionType == "url_action") {
      this.STUrl = "";
      this.suggArrCount[index].suggURLPostInp = 0;
      this.suggArrCount[index].suggURLTextInp = 0;
      this.suggArrCount[index].suggURLUrlInp = 0;
      // this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.finalJsonData.value.suggestions
      this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.suggestionControl.value
      this.JioTextData.contentMessage.suggestions = this.suggestionControl.value

    }
    else {
      this.STdialer = "";
      this.suggArrCount[index].suggDAILTextInp = 0;
      this.suggArrCount[index].suggDAILPostInp = 0;
      this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.suggestionControl.value
      this.JioTextData.contentMessage.suggestions = this.suggestionControl.value
      
    }
    sFG.reset();
    (this.finalJsonData.get('suggestions') as FormArray).removeAt(index);
    this.suggArrCount.splice(index, 1);
    this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.suggestionControl.value
    this.JioTextData.contentMessage.suggestions = this.suggestionControl.value

    if ((this.finalJsonData.get('suggestions') as FormArray).length < 1) {
      this.emptyfield = true;
    }
  }

  submitValues() {
    // this.sendImg()
    // setTimeout(() => {
    // this.sendData()
    // this.removeBlankKeyValues4rRCSA(this.JioRCSAData)

    const arrjio: any = []

    if (this.finalJsonData.value.type == 'rich_card') {
      this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions.forEach((i: any): any => {
        // console.log(i)
        if (i.suggestionType == 'reply') {
          const rplydata = {
            reply: {
              text: i.displayText,
              postbackData: i.postback
            }
          }
          // console.log(rplydata);
          arrjio.push(rplydata)
          // return rplydata;
        }
        else if (i.suggestionType == 'url_action') {
          const urlData = {
            action: {
              text: i.displayText,
              postbackData: i.postback,
              openUrlAction: {
                url: i.url
              }
            }
          }
          // console.log(urlData);
          arrjio.push(urlData)

        }
        else if (i.suggestionType == 'dialer_action') {
          const urlData = {
            action: {
              text: i.displayText,
              postbackData: i.postback,
              // fallbackUrl: 'https://www.google.com/contact/',
              dialAction: {
                phoneNumber: i.phoneNumber
              }
            }
          }
          // console.log(urlData);
          arrjio.push(urlData)

        }

      })
    }
    else {
      this.JioTextData.contentMessage.suggestions.forEach((i: any): any => {
        // console.log(i)
        if (i.suggestionType == 'reply') {
          const rplydata = {
            reply: {
              text: i.displayText,
              postbackData: i.postback
            }
          }
          // console.log(rplydata);
          arrjio.push(rplydata)
          // return rplydata;
        }
        else if (i.suggestionType == 'url_action') {
          const urlData = {
            action: {
              text: i.displayText,
              postbackData: i.postback,
              openUrlAction: {
                url: i.url
              }
            }
          }
          // console.log(urlData);
          arrjio.push(urlData)

        }
        else if (i.suggestionType == 'dialer_action') {
          const urlData = {
            action: {
              text: i.displayText,
              postbackData: i.postback,
              // fallbackUrl: 'https://www.google.com/contact/',
              dialAction: {
                phoneNumber: i.phoneNumber
              }
            }
          }
          // console.log(urlData);
          arrjio.push(urlData)

        }

      })
    }


    // console.log(arrjio);
    // return arrjio

    // const modifyData = {
    //   contentMessage: {
    //     richCard: {
    //       standaloneCard: {
    //         thumbnailImageAlignment: '',
    //         cardOrientation: '',
    //         cardContent: {
    //           title: '',
    //           description: '',
    //           media: {
    //             height: '',
    //             contentInfo: {
    //               fileUrl: '',
    //               forceRefresh: 'false'
    //             }
    //           },
    //           suggestions: arrjio
    //         }
    //       }
    //     }
    //   }
    // }
    this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = arrjio;
    this.JioTextData.contentMessage.suggestions = arrjio

    // console.log(this.templateType);

    if (this.templateType == 'rich_card') {
      // console.log(JSON.stringify(this.JioRCSAData));
      const userid = {
        templateName: this.finalJsonData.value.name,
        templateData: JSON.stringify(this.JioRCSAData)
      };
      this.service.postTemplateJsonData(userid).subscribe((res: any) => {
        // console.log(res);
        if (res.message.retval == 1) {
          this.toast.success('Template Added.', 'Done')
          setTimeout(() => {
            window.location.reload();
          }, 6000);
        }

      })

    }
    else if (this.templateType == 'text_message') {
      const userid = {
        templateName: this.finalJsonData.value.name,
        templateData: JSON.stringify(this.JioTextData)
      };
      // console.log(JSON.stringify(this.JioTextData));
      this.service.postTemplateJsonData(userid).subscribe((res: any) => {
        // console.log(res);
        if (res.message.retval == 1) {
          this.toast.success('Template Added.', 'Done')
          setTimeout(() => {
            window.location.reload();
          }, 6000);
        }

      })
    }

    //   this.isvideo = false;
    // }, 1000)

  }

  sendImg() {
    const image: any = this.RCSACardData.value.img_File;
    const f_data = new FormData();

    f_data.set("File", image);


    this.service.postMediaFiles(f_data).subscribe(res => {

      // console.log(f_data, "fdata");
      // console.log(userid, "2");
    })
    if (this.sendVideo) {
      const atobStr = String(this.RCSACardData.value.img_File).split(',')[1];
      const image = atob(atobStr);
      const filename: any = this.RCSACardData.value.img_File_Name;
      const f_data = new FormData();
      // f_data.append("File", image);

      // const binaryData = Buffer.from(image, 'base64');

      const uint8Array = new Uint8Array(image.length);
      for (let i = 0; i < image.length; i++) {
        uint8Array[i] = image.charCodeAt(i);
      }

      // console.log(image);

      // Create a Blob from binary data
      const blob = new Blob([uint8Array], { type: 'video/mp4' });
      f_data.set("File", blob, filename);


      this.service.postMediaFiles(f_data).subscribe(res => {

        this.sendVideo = false;

        // console.log(f_data, "fdata");
        // console.log(userid, "2");
      })
      return;
    }
    if (this.finalJsonData.value.type == 'carousel') {
      const imgarr = []
      const f_data1 = new FormData()
      for (let e = 0; e < this.RccCardImages.length; e++) {
        imgarr.push({ "File": this.RccCardImages[e].file });
        // console.log(imgarr);
        f_data1.append('File', this.RccCardImages[e].file)

        setTimeout(() => {
          this.service.postMediaFiles(f_data1).subscribe(res => {
            // console.log(res);

          })
        }, 2000);

      }
    }
  }

  sendData() {

    if (this.finalJsonData.value.type == 'rich_card' || this.finalJsonData.value.type == 'text_message') {
      if (this.finalJsonData.value.orientation == 'VERTICAL') {
        this.rich_template_data = this.fb.group({
          name: this.finalJsonData.value.name,
          type: this.finalJsonData.value.type,
          orientation: this.finalJsonData.value.orientation,
          height: this.finalJsonData.value.height,
          cardTitle: this.finalJsonData.value.cardTitle,
          cardDescription: this.finalJsonData.value.cardDescription,
          // fileName: f_data,
          thumbnailFileName: this.RCSACardData.value.img_File_Name,
          textMessageContent: this.finalJsonData.value.textMessageContent,
          suggestions: [this.finalJsonData.value.suggestions]
        });
      }
      else {
        this.rich_template_data = this.fb.group({
          name: this.finalJsonData.value.name,
          type: this.finalJsonData.value.type,
          orientation: this.finalJsonData.value.orientation,
          // height: this.finalJsonData.value.height,
          position: this.finalJsonData.value.position,
          cardTitle: this.finalJsonData.value.cardTitle,
          cardDescription: this.finalJsonData.value.cardDescription,
          // fileName: f_data,
          thumbnailFileName: this.RCSACardData.value.img_File_Name,
          textMessageContent: this.finalJsonData.value.textMessageContent,
          suggestions: [this.finalJsonData.value.suggestions]
        });
      }
      const userid = {
        userName: this.rich_template_data.value.name,
        imgsarr: [],
        isCaurosel: false,
        tData: JSON.stringify([this.rich_template_data.value])
      };

      // console.log(userid);

      this.service.postTemplateJsonData(userid).subscribe({
        next: (res: any) => {
          const response = res;
          // console.log(res);
          // console.log(JSON.parse(response.message).templateModel,'GG');
          if (JSON.parse(response.message).templateModel) {

            // this.toast.success(`Template Added `, 'Done');
            // this.service.addTemplateinourDB(userid).subscribe((res: any) => {
            this.toast.success(`Template Added `, 'Done');
            // console.log(res);
            // })
            setTimeout(() => {
              this.route.navigate(['/temlate_List']);
              // window.location.reload();
            }, 7000)
          }
          // error ocurred at Compose_bulk

        }, error: (err) => {
          console.log(err);

          if (err.error.message === "Template with same name is already present.") {
            this.toast.error(`${err.error.message}`, 'Failed');
            // setTimeout(() => {
            //   window.location.reload();
            // }, 7000)
            return;
          }
          else if (err.error.message === "Template 'name' required, max length allowed 20 and should contain only alphanumeric chars , underscore and hyphen.") {
            this.toast.error(`${err.error.message}`, 'Failed');
            // setTimeout(() => {
            //   window.location.reload();
            // }, 7000)
            return;
          }
          else if (err.status == 400 && this.finalJsonData.value.type !== 'text_message') {
            this.toast.error(`Please provide an image with valid aspect ratio`, 'Failed');
          }
        }
      });
    }
    else if (this.finalJsonData.value.type == 'carousel') {
      let imageNames = [];
      for (let e = 0; e < this.RccCardImages.length; e++) {
        imageNames.push(this.RccCardImages[e].file.name);
      }
      this.rich_template_data = {
        name: this.finalJsonData.value.name,
        type: this.finalJsonData.value.type,
        height: this.finalJsonData.value.height,
        width: this.finalJsonData.value.width,
        carouselList: this.RccCard
      }

      const userid = {
        userName: this.rich_template_data.name,
        imgsarr: imageNames,
        isCaurosel: true,
        tData: JSON.stringify([this.rich_template_data])
      };
      this.service.postTemplateJsonData(userid).subscribe({
        next: (res: any) => {
          const response = res;

          this.toast.success(`${response.message}`, 'Done');
          setTimeout(() => {
            window.location.reload();
          }, 7000)
          // error ocurred at Compose_bulk

        }, error: (err) => {
          // console.log(err);

          if (err.error.message === "Template with same name is already present.") {
            this.toast.error(`${err.error.message}`, 'Failed');
            setTimeout(() => {
              window.location.reload();
            }, 7000)
            return;
          }
        }
      });
    }
  }



  clearEmptyValues() {
    const formValues = this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions;
    formValues.forEach((element1:any) => {
      for (const key1 in element1) {
        // if(element1 === 'object'){

        //     console.log(val1, "val1");
        const val1 = element1[key1];
        if (val1 == '' || val1 == '+91') {
          // cleanedArr[key1] = val1
          delete element1[key1]
        }
        // }
      }
    });
  }

  removeBlankKeyValues4rRCSA(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.removeBlankKeyValues4rRCSA(item));
    }

    const cleanedObj: any = {};
    let suggArr: any = [];
    let FinalsuggArr: any = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // console.log(key);
        const value = obj[key];

        if (typeof value === 'object' || Array.isArray(value)) {
          const cleanedValue = this.removeBlankKeyValues4rRCSA(value);
          if (!(typeof cleanedValue === 'object' && Object.keys(cleanedValue).length === 0)) {
            suggArr = cleanedValue;
          }
        } else if (value !== '' || value !== 'textMessageContent') {
          console.log(cleanedObj);

          cleanedObj[key] = value;
        }
        if (key === 'suggestions') {
          suggArr = value;
          suggArr.forEach((element1: any) => {
            for (const key1 in element1) {
              // if(element1 === 'object'){

              //     console.log(val1, "val1");
              const val1 = element1[key1];
              if (val1 == '' || val1 == '+91') {
                // cleanedArr[key1] = val1
                delete element1[key1]
              }
              // }
            }
          });
          FinalsuggArr.push(suggArr)
        }
      }
    }
    //console.log(suggArr);

    const rcsa_Final_Card = {
      contentMessage: {
        richCard: {
          standaloneCard: {
            thumbnailImageAlignment: cleanedObj.position,
            cardOrientation: cleanedObj.orientation,
            cardContent: {
              title: cleanedObj.cardTitle,
              description: cleanedObj.cardDescription,
              media: {
                height: cleanedObj.height,
                contentInfo: {
                  fileUrl: '',
                  forceRefresh: 'false'
                }
              },
              suggestions: FinalsuggArr[0]
            }
          }
        }
      }
    }
    console.log(rcsa_Final_Card, "4rm tJsonDM");
    return rcsa_Final_Card;
  }
  // }


  type(event: any, index: number) {
    const selectedType = event.target.value;
    // console.log(selectedType);
    const ArrC = this.suggestionControl.controls[index].value.suggestionType;
    // console.log(ArrC);

    if (ArrC == 'url_action') {
      this.suggestionControl.controls[index].get('postback')?.setValue('VISITED');
      this.suggArrCount[index].suggURLPostInp = this.suggestionControl.controls[index].get('postback')?.value.length;
      // delete this.suggestionControl.controls[index];

    }
    else if (ArrC == 'dialer_action') {
      this.suggestionControl.controls[index].get('postback')?.setValue('CALLED');
      this.suggArrCount[index].suggDAILPostInp = this.suggestionControl.controls[index].get('postback')?.value.length;
    }
    else {
      this.suggestionControl.controls[index].get('postback')?.setValue('MESSAGED');

      // console.log(this.suggestionControl.controls[index].get('postback')?.value);

      this.suggArrCount[index].suggREPPostInp = this.suggestionControl.controls[index].get('postback')?.value.length;
    }


    // const currentFormGroup = this.suggestionControl[index] as FormGroup;
    // currentFormGroup.patchValue({
    //   suggestionType: selectedType,
    //   displayText: '',
    //   postback: '',
    //   url: '',
    //   phoneNumber: 0
    // });
  }
  sugRep(i: any) {
    this.STReply = this.finalJsonData.get('suggestions')?.value[i].displayText;
    // this.suggREPTextInp = this.finalJsonData.get('suggestions')?.value[i].displayText.length;

    // this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.finalJsonData.value.suggestions
    this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.suggestionControl.value
    this.JioTextData.contentMessage.suggestions = this.suggestionControl.value

    this.clearEmptyValues();


    this.suggArrCount[i].suggREPTextInp = this.finalJsonData.get('suggestions')?.value[i].displayText.length;

    this.suggArrCount[i].suggREPPostInp = this.finalJsonData.get('suggestions')?.value[i].postback.length;
  }
  sugUrl(i: any) {
    this.STUrl = this.finalJsonData.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggURLTextInp = this.finalJsonData.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggURLPostInp = this.finalJsonData.get('suggestions')?.value[i].postback.length;
    this.suggArrCount[i].suggURLUrlInp = this.finalJsonData.get('suggestions')?.value[i].url.length;
    this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.suggestionControl.value
    this.JioTextData.contentMessage.suggestions = this.suggestionControl.value

    this.clearEmptyValues();
    // this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.finalJsonData.value.suggestions
  }
  sugDial(i: any) {
    this.STdialer = this.finalJsonData.get('suggestions')?.value[i].displayText;

    this.suggArrCount[i].suggDAILTextInp = this.finalJsonData.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggDAILPostInp = this.finalJsonData.get('suggestions')?.value[i].postback.length;
    // this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.finalJsonData.value.suggestions
    this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.suggestionControl.value


    this.clearEmptyValues();
    // this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.finalJsonData.get('suggestions')?.value[i].phoneNumber
  }
  pmobile(i: any) {
    this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.suggestions = this.suggestionControl.value
    this.JioTextData.contentMessage.suggestions = this.suggestionControl.value

    this.clearEmptyValues();

  }
  sugMno(i: any, e: any) {
    this.suggestionControl.controls[i].get('phoneNumber')?.setValue(e.target.value);
    this.clearEmptyValues();

  }
  // Suggestion Bar Ends


  addBtn() {
    if (this.RccCardBtnArr.length < data.RCCCardLength) {
      const obj1 = {
        image: '',
        cardTitle: '',
        cardDescription: '',
        fileName: '',
        thumbnailFileName: '',
        suggestions: []
      }
      if (this.RccCardBtnArr.length == 3) {
        this.toast.info('Template allows a maximum of 4 carousel cards.', 'Warning')
      }

      this.RccCard.push(obj1);

      this.RccCardBtnArr.push(`Card`);
    }

  }
  cardIndex(item: any) {
    this.cardIDX = item;
    this.RCCCardData.controls['img_File_Name'].setValue(this.RccCard[item].img_file_name)
    this.RCCCardData.controls['cardTitle'].setValue(this.RccCard[item].cardTitle)
    this.RCCOutputTLength = this.RCCCardData.value.cardTitle?.length;
    this.RCCCardData.controls['cardDescription'].setValue(this.RccCard[item].cardDescription)
    this.RCCOutputDLength = this.RCCCardData.value.cardDescription?.length;
    this.img_file_name = this.RccCardImages[this.cardIDX].file.name;

  }
  removeRCCcard(i: any) {
    this.RccCardBtnArr.splice(i, 1);
    this.RccCard.splice(i, 1);
    this.cardIDX = 0
  }

  title_Desc() {


    // name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]*$/)]],
    // type: ['rich_card'],
    // orientation: ['VERTICAL'],
    // height: ['SHORT_HEIGHT'],
    // width: ['SMALL_WIDTH'],
    // position: ['left'],
    // fileName: [''],
    // thumbnailFileName: [''],
    // cardTitle: [''],
    // cardDescription: [''],
    // textMessageContent: [''],

    this.templateName = this.finalJsonData.get('name')?.value.length;

    this.RCSAOutputT = this.finalJsonData.get('cardTitle')?.value;
    this.RCSAOutputTLength = this.finalJsonData.get('cardTitle')?.value.length;
    this.RCSAOutputD = this.finalJsonData.get('cardDescription')?.value;
    this.RCSAOutputDLength = this.finalJsonData.get('cardDescription')?.value.length;
    this.messageField = this.finalJsonData.get('textMessageContent')?.value;
    this.messageFieldLength = this.finalJsonData.get('textMessageContent')?.value.length;
    // suggestions: this.fb.array([])
    this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.media.height = this.finalJsonData.value.height;
    this.JioRCSAData.contentMessage.richCard.standaloneCard.cardOrientation = this.finalJsonData.value.orientation;
    this.JioRCSAData.contentMessage.richCard.standaloneCard.thumbnailImageAlignment = this.finalJsonData.value.position;
    this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.title = this.finalJsonData.value.cardTitle;
    this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.description = this.finalJsonData.value.cardDescription;


    this.JioTextData.contentMessage.text = this.finalJsonData.value.textMessageContent

  }

  RccInputs() {
    this.RccCard[this.cardIDX].fileName = this.RCCCardData.value.img_File_Name;
    this.RccCard[this.cardIDX].cardTitle = this.RCCCardData.value.cardTitle;
    this.RCCOutputTLength = this.RCCCardData.value.cardTitle?.length;
    this.RccCard[this.cardIDX].cardDescription = this.RCCCardData.value.cardDescription;
    this.RCCOutputDLength = this.RCCCardData.value.cardDescription?.length;

    this.RccCard[this.cardIDX].image = this.RccCardImages[this.cardIDX].base64;
    this.RccCard[this.cardIDX].fileName = this.RccCardImages[this.cardIDX].file.name;
  }



  get suggestionControl1() {
    // console.log((this.suggestions.get('suggestion') as FormArray).controls);
    return this.RCCC1.get('suggestions') as FormArray;
  }

  RCCaddSuggestion1() {
    this.emptyfield1 = false;
    const Control: any = <FormArray>this.RCCC1.controls['suggestions'];
    Control.push(this.fb.group({
      suggestionType: 'reply',
      displayText: [''],
      postback: ['MESSAGED'],
      url: [''],
      phoneNumber: ['+91']
    }));

    // console.log(this.RCCC1.value);

    this.suggArrCount.push({
      suggREPTextInp: 0,
      suggREPPostInp: 0,

      suggURLUrlInp: 0,
      suggURLPostInp: 0,
      suggURLTextInp: 0,

      suggDAILTextInp: 0,
      suggDAILPostInp: 0
    })
    const i = Control.length - 1;
    // console.log(i);
    // console.log(Control.controls[0].value);

    if (Control.controls[i].value.postback == 'MESSAGED') {
      this.suggArrCount[i].suggREPPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'CALLED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'VISITED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }



    // const suggestionFormGroup = this.fb.group({
    //   suggestionType: 'reply',
    //   displayText: '',
    //   postback: '',
    //   url: '',
    //   phoneNumber: 0
    // });

    // (this.finalJsonData.get('suggestions') as FormArray).push(suggestionFormGroup);

  }

  RCCremoveItem1(index: any) {
    const sFG = this.fb.group({
      suggestionType: '',
      displayText: '',
      postback: '',
      url: '',
      phoneNumber: ''
    });
    // console.log(this.suggestions.get('suggestion')?.value[index].suggestionType);
    if (this.RCCC1.get('suggestions')?.value[index].suggestionType == "reply") {
      this.STReply = "";
      this.suggArrCount[index].suggREPTextInp = 0;
      this.suggArrCount[index].suggREPPostInp = 0;
    }
    else if (this.RCCC1.get('suggestions')?.value[index].suggestionType == "url_action") {
      this.STUrl = "";
      this.suggArrCount[index].suggURLPostInp = 0;
      this.suggArrCount[index].suggURLTextInp = 0;
      this.suggArrCount[index].suggURLUrlInp = 0;
    }
    else {
      this.STdialer = "";
      this.suggArrCount[index].suggDAILTextInp = 0;
      this.suggArrCount[index].suggDAILPostInp = 0;
    }
    sFG.reset();
    (this.RCCC1.get('suggestions') as FormArray).removeAt(index);
    this.suggArrCount.splice(index, 1);

    if ((this.RCCC1.get('suggestions') as FormArray).length < 1) {
      this.emptyfield = true;
    }
  }
  RCCtype1(event: any, index: number) {
    const selectedType = event.target.value;
    // console.log(selectedType);
    const ArrC1 = this.suggestionControl1.controls[index].value.suggestionType;
    // console.log(ArrC);

    if (ArrC1 == 'url_action') {
      this.suggestionControl1.controls[index].get('postback')?.setValue('VISITED');
      this.suggArrCount[index].suggURLPostInp = this.suggestionControl1.controls[index].get('postback')?.value.length;
    }
    else if (ArrC1 == 'dialer_action') {
      this.suggestionControl1.controls[index].get('postback')?.setValue('CALLED');
      this.suggArrCount[index].suggDAILPostInp = this.suggestionControl1.controls[index].get('postback')?.value.length;
    }
    else {
      this.suggestionControl1.controls[index].get('postback')?.setValue('MESSAGED');
      // console.log(this.suggestionControl1.controls[index].get('postback')?.value);

      this.suggArrCount[index].suggREPPostInp = this.suggestionControl1.controls[index].get('postback')?.value.length;
    }


    // const currentFormGroup = this.suggestionControl1[index] as FormGroup;
    // currentFormGroup.patchValue({
    //   suggestionType: selectedType,
    //   displayText: '',
    //   postback: '',
    //   url: '',
    //   phoneNumber: 0
    // });
  }
  RccsugRep1(i: any) {
    this.STReply = this.RCCC1.value.suggestions[i].displayText;
    // this.suggREPTextInp = this.finalJsonData.get('suggestions')?.value[i].displayText.length;

    this.RccCard[this.cardIDX].suggestions = this.RCCC1.value.suggestions
    this.suggArrCount[i].suggREPTextInp = this.RCCC1.get('suggestions')?.value[i].displayText.length;

    this.suggArrCount[i].suggREPPostInp = this.RCCC1.get('suggestions')?.value[i].postback.length;
  }
  RccsugUrl1(i: any) {
    this.STUrl = this.RCCC1.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggURLTextInp = this.RCCC1.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggURLPostInp = this.RCCC1.get('suggestions')?.value[i].postback.length;
    this.suggArrCount[i].suggURLUrlInp = this.RCCC1.get('suggestions')?.value[i].url.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC1.value.suggestions
  }
  RccsugDial1(i: any) {
    this.STdialer = this.RCCC1.get('suggestions')?.value[i].displayText;
    this.RccCard[this.cardIDX].suggestions = this.RCCC1.value.suggestions

    this.suggArrCount[i].suggDAILTextInp = this.RCCC1.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggDAILPostInp = this.RCCC1.get('suggestions')?.value[i].postback.length;
  }
  get suggestionControl2() {
    return this.RCCC2.get('suggestions') as FormArray;
  }

  RCCaddSuggestion2() {
    this.emptyfield2 = false;
    const Control: any = <FormArray>this.RCCC2.controls['suggestions'];
    Control.push(this.fb.group({
      suggestionType: 'reply',
      displayText: [''],
      postback: ['MESSAGED'],
      url: [''],
      phoneNumber: ['+91']
    }));
    this.suggArrCount.push({
      suggREPTextInp: 0,
      suggREPPostInp: 0,

      suggURLUrlInp: 0,
      suggURLPostInp: 0,
      suggURLTextInp: 0,

      suggDAILTextInp: 0,
      suggDAILPostInp: 0
    })
    const i = Control.length - 1;
    if (Control.controls[i].value.postback == 'MESSAGED') {
      this.suggArrCount[i].suggREPPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'CALLED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'VISITED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
  }

  RCCremoveItem2(index: any) {
    const sFG = this.fb.group({
      suggestionType: '',
      displayText: '',
      postback: '',
      url: '',
      phoneNumber: ''
    });
    if (this.RCCC2.get('suggestions')?.value[index].suggestionType == "reply") {
      this.STReply = "";
      this.suggArrCount[index].suggREPTextInp = 0;
      this.suggArrCount[index].suggREPPostInp = 0;
    }
    else if (this.RCCC2.get('suggestions')?.value[index].suggestionType == "url_action") {
      this.STUrl = "";
      this.suggArrCount[index].suggURLPostInp = 0;
      this.suggArrCount[index].suggURLTextInp = 0;
      this.suggArrCount[index].suggURLUrlInp = 0;
    }
    else {
      this.STdialer = "";
      this.suggArrCount[index].suggDAILTextInp = 0;
      this.suggArrCount[index].suggDAILPostInp = 0;
    }
    sFG.reset();
    (this.RCCC2.get('suggestions') as FormArray).removeAt(index);
    this.suggArrCount.splice(index, 1);

    if ((this.RCCC2.get('suggestions') as FormArray).length < 1) {
      this.emptyfield = true;
    }
  }
  RCCtype2(event: any, index: number) {
    const selectedType = event.target.value;
    const ArrC2 = this.suggestionControl2.controls[index].value.suggestionType;
    if (ArrC2 == 'url_action') {
      this.suggestionControl2.controls[index].get('postback')?.setValue('VISITED');
      this.suggArrCount[index].suggURLPostInp = this.suggestionControl2.controls[index].get('postback')?.value.length;
    }
    else if (ArrC2 == 'dialer_action') {
      this.suggestionControl2.controls[index].get('postback')?.setValue('CALLED');
      this.suggArrCount[index].suggDAILPostInp = this.suggestionControl2.controls[index].get('postback')?.value.length;
    }
    else {
      this.suggestionControl2.controls[index].get('postback')?.setValue('MESSAGED');
      this.suggArrCount[index].suggREPPostInp = this.suggestionControl2.controls[index].get('postback')?.value.length;
    }
  }
  RccsugRep2(i: any) {
    this.STReply = this.RCCC2.get('suggestions')?.value[i].displayText;
    // this.suggREPTextInp = this.RCCC2.get('suggestions')?.value[i].displayText.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC2.value.suggestions
    this.suggArrCount[i].suggREPTextInp = this.RCCC2.get('suggestions')?.value[i].displayText.length;

    this.suggArrCount[i].suggREPPostInp = this.RCCC2.get('suggestions')?.value[i].postback.length;
  }
  RccsugUrl2(i: any) {
    this.STUrl = this.RCCC2.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggURLTextInp = this.RCCC2.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggURLPostInp = this.RCCC2.get('suggestions')?.value[i].postback.length;
    this.suggArrCount[i].suggURLUrlInp = this.RCCC2.get('suggestions')?.value[i].url.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC2.value.suggestions

  }
  RccsugDial2(i: any) {
    this.STdialer = this.RCCC2.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggDAILTextInp = this.RCCC2.get('suggestions')?.value[i].displayText.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC2.value.suggestions

    this.suggArrCount[i].suggDAILPostInp = this.RCCC2.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC2.value.suggestions
  }
  get suggestionControl3() {
    return this.RCCC3.get('suggestions') as FormArray;
  }

  RCCaddSuggestion3() {
    this.emptyfield = false;
    const Control: any = <FormArray>this.RCCC3.controls['suggestions'];
    Control.push(this.fb.group({
      suggestionType: 'reply',
      displayText: [''],
      postback: ['MESSAGED'],
      url: [''],
      phoneNumber: ['+91']
    }));

    this.suggArrCount.push({
      suggREPTextInp: 0,
      suggREPPostInp: 0,

      suggURLUrlInp: 0,
      suggURLPostInp: 0,
      suggURLTextInp: 0,

      suggDAILTextInp: 0,
      suggDAILPostInp: 0
    })
    const i = Control.length - 1;
    if (Control.controls[i].value.postback == 'MESSAGED') {
      this.suggArrCount[i].suggREPPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'CALLED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'VISITED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
  }

  RCCremoveItem3(index: any) {
    const sFG = this.fb.group({
      suggestionType: '',
      displayText: '',
      postback: '',
      url: '',
      phoneNumber: ''
    });
    if (this.RCCC3.get('suggestions')?.value[index].suggestionType == "reply") {
      this.STReply = "";
      this.suggArrCount[index].suggREPTextInp = 0;
      this.suggArrCount[index].suggREPPostInp = 0;
    }
    else if (this.RCCC3.get('suggestions')?.value[index].suggestionType == "url_action") {
      this.STUrl = "";
      this.suggArrCount[index].suggURLPostInp = 0;
      this.suggArrCount[index].suggURLTextInp = 0;
      this.suggArrCount[index].suggURLUrlInp = 0;
    }
    else {
      this.STdialer = "";
      this.suggArrCount[index].suggDAILTextInp = 0;
      this.suggArrCount[index].suggDAILPostInp = 0;
    }
    sFG.reset();
    (this.RCCC3.get('suggestions') as FormArray).removeAt(index);
    this.suggArrCount.splice(index, 1);

    if ((this.RCCC3.get('suggestions') as FormArray).length < 1) {
      this.emptyfield = true;
    }
  }
  RCCtype3(event: any, index: number) {
    const selectedType = event.target.value;
    const ArrC = this.suggestionControl3.controls[index].value.suggestionType;
    if (ArrC == 'url_action') {
      this.suggestionControl3.controls[index].get('postback')?.setValue('VISITED');
      this.suggArrCount[index].suggURLPostInp = this.suggestionControl3.controls[index].get('postback')?.value.length;
    }
    else if (ArrC == 'dialer_action') {
      this.suggestionControl3.controls[index].get('postback')?.setValue('CALLED');
      this.suggArrCount[index].suggDAILPostInp = this.suggestionControl3.controls[index].get('postback')?.value.length;
    }
    else {
      this.suggestionControl3.controls[index].get('postback')?.setValue('MESSAGED');
      this.suggArrCount[index].suggREPPostInp = this.suggestionControl3.controls[index].get('postback')?.value.length;
    }

  }
  RccsugRep3(i: any) {
    this.STReply = this.RCCC3.get('suggestions')?.value[i].displayText;
    // this.suggREPTextInp = this.RCCC3.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggREPTextInp = this.RCCC3.get('suggestions')?.value[i].displayText.length;

    this.suggArrCount[i].suggREPPostInp = this.RCCC3.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC3.value.suggestions

  }
  RccsugUrl3(i: any) {
    this.STUrl = this.RCCC3.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggURLTextInp = this.RCCC3.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggURLPostInp = this.RCCC3.get('suggestions')?.value[i].postback.length;
    this.suggArrCount[i].suggURLUrlInp = this.RCCC3.get('suggestions')?.value[i].url.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC3.value.suggestions

  }
  RccsugDial3(i: any) {
    this.STdialer = this.RCCC3.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggDAILTextInp = this.RCCC3.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggDAILPostInp = this.RCCC3.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC3.value.suggestions

  }
  get suggestionControl4() {
    return this.RCCC4.get('suggestions') as FormArray;
  }

  RCCaddSuggestion4() {
    this.emptyfield = false;
    const Control: any = <FormArray>this.RCCC4.controls['suggestions'];
    Control.push(this.fb.group({
      suggestionType: 'reply',
      displayText: [''],
      postback: ['MESSAGED'],
      url: [''],
      phoneNumber: ['+91']
    }));

    this.suggArrCount.push({
      suggREPTextInp: 0,
      suggREPPostInp: 0,

      suggURLUrlInp: 0,
      suggURLPostInp: 0,
      suggURLTextInp: 0,

      suggDAILTextInp: 0,
      suggDAILPostInp: 0
    })
    const i = Control.length - 1;
    if (Control.controls[i].value.postback == 'MESSAGED') {
      this.suggArrCount[i].suggREPPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'CALLED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'VISITED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
  }

  RCCremoveItem4(index: any) {
    const sFG = this.fb.group({
      suggestionType: '',
      displayText: '',
      postback: '',
      url: '',
      phoneNumber: ''
    });
    if (this.RCCC4.get('suggestions')?.value[index].suggestionType == "reply") {
      this.STReply = "";
      this.suggArrCount[index].suggREPTextInp = 0;
      this.suggArrCount[index].suggREPPostInp = 0;
    }
    else if (this.RCCC4.get('suggestions')?.value[index].suggestionType == "url_action") {
      this.STUrl = "";
      this.suggArrCount[index].suggURLPostInp = 0;
      this.suggArrCount[index].suggURLTextInp = 0;
      this.suggArrCount[index].suggURLUrlInp = 0;
    }
    else {
      this.STdialer = "";
      this.suggArrCount[index].suggDAILTextInp = 0;
      this.suggArrCount[index].suggDAILPostInp = 0;
    }
    sFG.reset();
    (this.RCCC4.get('suggestions') as FormArray).removeAt(index);
    this.suggArrCount.splice(index, 1);

    if ((this.RCCC4.get('suggestions') as FormArray).length < 1) {
      this.emptyfield = true;
    }
  }
  RCCtype4(event: any, index: number) {
    const selectedType = event.target.value;
    const ArrC = this.suggestionControl4.controls[index].value.suggestionType;
    if (ArrC == 'url_action') {
      this.suggestionControl4.controls[index].get('postback')?.setValue('VISITED');
      this.suggArrCount[index].suggURLPostInp = this.suggestionControl4.controls[index].get('postback')?.value.length;
    }
    else if (ArrC == 'dialer_action') {
      this.suggestionControl4.controls[index].get('postback')?.setValue('CALLED');
      this.suggArrCount[index].suggDAILPostInp = this.suggestionControl4.controls[index].get('postback')?.value.length;
    }
    else {
      this.suggestionControl4.controls[index].get('postback')?.setValue('MESSAGED');
      this.suggArrCount[index].suggREPPostInp = this.suggestionControl4.controls[index].get('postback')?.value.length;
    }
  }
  RccsugRep4(i: any) {
    this.STReply = this.RCCC4.get('suggestions')?.value[i].displayText;
    // this.suggREPTextInp = this.RCCC4.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggREPTextInp = this.RCCC4.get('suggestions')?.value[i].displayText.length;

    this.suggArrCount[i].suggREPPostInp = this.RCCC4.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC4.value.suggestions

  }
  RccsugUrl4(i: any) {
    this.STUrl = this.RCCC4.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggURLTextInp = this.RCCC4.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggURLPostInp = this.RCCC4.get('suggestions')?.value[i].postback.length;
    this.suggArrCount[i].suggURLUrlInp = this.RCCC4.get('suggestions')?.value[i].url.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC4.value.suggestions

  }
  RccsugDial4(i: any) {
    this.STdialer = this.RCCC4.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggDAILTextInp = this.RCCC4.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggDAILPostInp = this.RCCC4.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC4.value.suggestions

  }
  get suggestionControl5() {
    return this.RCCC5.get('suggestions') as FormArray;
  }

  RCCaddSuggestion5() {
    this.emptyfield = false;
    const Control: any = <FormArray>this.RCCC5.controls['suggestions'];
    Control.push(this.fb.group({
      suggestionType: 'reply',
      displayText: [''],
      postback: ['MESSAGED'],
      url: [''],
      phoneNumber: ['+91']
    }));

    this.suggArrCount.push({
      suggREPTextInp: 0,
      suggREPPostInp: 0,

      suggURLUrlInp: 0,
      suggURLPostInp: 0,
      suggURLTextInp: 0,

      suggDAILTextInp: 0,
      suggDAILPostInp: 0
    })
    const i = Control.length - 1;

    if (Control.controls[i].value.postback == 'MESSAGED') {
      this.suggArrCount[i].suggREPPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'CALLED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'VISITED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
  }

  RCCremoveItem5(index: any) {
    const sFG = this.fb.group({
      suggestionType: '',
      displayText: '',
      postback: '',
      url: '',
      phoneNumber: ''
    });
    if (this.finalJsonData.get('suggestions')?.value[index].suggestionType == "reply") {
      this.STReply = "";
      this.suggArrCount[index].suggREPTextInp = 0;
      this.suggArrCount[index].suggREPPostInp = 0;
    }
    else if (this.finalJsonData.get('suggestions')?.value[index].suggestionType == "url_action") {
      this.STUrl = "";
      this.suggArrCount[index].suggURLPostInp = 0;
      this.suggArrCount[index].suggURLTextInp = 0;
      this.suggArrCount[index].suggURLUrlInp = 0;
    }
    else {
      this.STdialer = "";
      this.suggArrCount[index].suggDAILTextInp = 0;
      this.suggArrCount[index].suggDAILPostInp = 0;
    }
    sFG.reset();
    (this.RCCC5.get('suggestions') as FormArray).removeAt(index);
    this.suggArrCount.splice(index, 1);

    if ((this.RCCC5.get('suggestions') as FormArray).length < 1) {
      this.emptyfield = true;
    }
  }
  RCCtype5(event: any, index: number) {
    const selectedType = event.target.value;
    const ArrC = this.suggestionControl5.controls[index].value.suggestionType;

    if (ArrC == 'url_action') {
      this.suggestionControl5.controls[index].get('postback')?.setValue('VISITED');
      this.suggArrCount[index].suggURLPostInp = this.suggestionControl5.controls[index].get('postback')?.value.length;
    }
    else if (ArrC == 'dialer_action') {
      this.suggestionControl5.controls[index].get('postback')?.setValue('CALLED');
      this.suggArrCount[index].suggDAILPostInp = this.suggestionControl5.controls[index].get('postback')?.value.length;
    }
    else {
      this.suggestionControl5.controls[index].get('postback')?.setValue('MESSAGED');

      this.suggArrCount[index].suggREPPostInp = this.suggestionControl5.controls[index].get('postback')?.value.length;
    }

  }
  RccsugRep5(i: any) {
    this.STReply = this.RCCC5.get('suggestions')?.value[i].displayText;
    // this.suggREPTextInp = this.RCCC5.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggREPTextInp = this.RCCC5.get('suggestions')?.value[i].displayText.length;

    this.suggArrCount[i].suggREPPostInp = this.RCCC5.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC5.value.suggestions

  }
  RccsugUrl5(i: any) {
    this.STUrl = this.RCCC5.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggURLTextInp = this.RCCC5.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggURLPostInp = this.RCCC5.get('suggestions')?.value[i].postback.length;
    this.suggArrCount[i].suggURLUrlInp = this.RCCC5.get('suggestions')?.value[i].url.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC5.value.suggestions

  }
  RccsugDial5(i: any) {
    this.STdialer = this.RCCC5.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggDAILTextInp = this.RCCC5.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggDAILPostInp = this.RCCC5.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC5.value.suggestions

  }
  get suggestionControl6() {
    return this.RCCC6.get('suggestions') as FormArray;
  }

  RCCaddSuggestion6() {
    this.emptyfield = false;
    const Control: any = <FormArray>this.RCCC6.controls['suggestions'];
    Control.push(this.fb.group({
      suggestionType: 'reply',
      displayText: [''],
      postback: ['MESSAGED'],
      url: [''],
      phoneNumber: ['+91']
    }));

    this.suggArrCount.push({
      suggREPTextInp: 0,
      suggREPPostInp: 0,

      suggURLUrlInp: 0,
      suggURLPostInp: 0,
      suggURLTextInp: 0,

      suggDAILTextInp: 0,
      suggDAILPostInp: 0
    })
    const i = Control.length - 1;

    if (Control.controls[i].value.postback == 'MESSAGED') {
      this.suggArrCount[i].suggREPPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'CALLED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'VISITED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
  }

  RCCremoveItem6(index: any) {
    const sFG = this.fb.group({
      suggestionType: '',
      displayText: '',
      postback: '',
      url: '',
      phoneNumber: ''
    });
    if (this.RCCC6.get('suggestions')?.value[index].suggestionType == "reply") {
      this.STReply = "";
      this.suggArrCount[index].suggREPTextInp = 0;
      this.suggArrCount[index].suggREPPostInp = 0;
    }
    else if (this.RCCC6.get('suggestions')?.value[index].suggestionType == "url_action") {
      this.STUrl = "";
      this.suggArrCount[index].suggURLPostInp = 0;
      this.suggArrCount[index].suggURLTextInp = 0;
      this.suggArrCount[index].suggURLUrlInp = 0;
    }
    else {
      this.STdialer = "";
      this.suggArrCount[index].suggDAILTextInp = 0;
      this.suggArrCount[index].suggDAILPostInp = 0;
    }
    sFG.reset();
    (this.RCCC6.get('suggestions') as FormArray).removeAt(index);
    this.suggArrCount.splice(index, 1);

    if ((this.RCCC6.get('suggestions') as FormArray).length < 1) {
      this.emptyfield = true;
    }
  }
  RCCtype6(event: any, index: number) {
    const selectedType = event.target.value;
    const ArrC = this.suggestionControl6.controls[index].value.suggestionType;

    if (ArrC == 'url_action') {
      this.suggestionControl6.controls[index].get('postback')?.setValue('VISITED');
      this.suggArrCount[index].suggURLPostInp = this.suggestionControl6.controls[index].get('postback')?.value.length;
    }
    else if (ArrC == 'dialer_action') {
      this.suggestionControl6.controls[index].get('postback')?.setValue('CALLED');
      this.suggArrCount[index].suggDAILPostInp = this.suggestionControl6.controls[index].get('postback')?.value.length;
    }
    else {
      this.suggestionControl6.controls[index].get('postback')?.setValue('MESSAGED');

      this.suggArrCount[index].suggREPPostInp = this.suggestionControl6.controls[index].get('postback')?.value.length;
    }
  }
  RccsugRep6(i: any) {
    this.STReply = this.RCCC6.get('suggestions')?.value[i].displayText;


    this.suggArrCount[i].suggREPTextInp = this.RCCC6.get('suggestions')?.value[i].displayText.length;

    this.suggArrCount[i].suggREPPostInp = this.RCCC6.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC6.value.suggestions

  }
  RccsugUrl6(i: any) {
    this.STUrl = this.RCCC6.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggURLTextInp = this.RCCC6.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggURLPostInp = this.RCCC6.get('suggestions')?.value[i].postback.length;
    this.suggArrCount[i].suggURLUrlInp = this.RCCC6.get('suggestions')?.value[i].url.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC6.value.suggestions

  }
  RccsugDial6(i: any) {
    this.STdialer = this.RCCC6.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggDAILTextInp = this.RCCC6.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggDAILPostInp = this.RCCC6.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC6.value.suggestions

  }
  get suggestionControl7() {
    return this.RCCC7.get('suggestions') as FormArray;
  }

  RCCaddSuggestion7() {
    this.emptyfield = false;
    const Control: any = <FormArray>this.RCCC7.controls['suggestions'];
    Control.push(this.fb.group({
      suggestionType: 'reply',
      displayText: [''],
      postback: ['MESSAGED'],
      url: [''],
      phoneNumber: ['+91']
    }));

    this.suggArrCount.push({
      suggREPTextInp: 0,
      suggREPPostInp: 0,

      suggURLUrlInp: 0,
      suggURLPostInp: 0,
      suggURLTextInp: 0,

      suggDAILTextInp: 0,
      suggDAILPostInp: 0
    })
    const i = Control.length - 1;
    if (Control.controls[i].value.postback == 'MESSAGED') {
      this.suggArrCount[i].suggREPPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'CALLED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'VISITED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
  }

  RCCremoveItem7(index: any) {
    const sFG = this.fb.group({
      suggestionType: '',
      displayText: '',
      postback: '',
      url: '',
      phoneNumber: ''
    });
    if (this.RCCC7.get('suggestions')?.value[index].suggestionType == "reply") {
      this.STReply = "";
      this.suggArrCount[index].suggREPTextInp = 0;
      this.suggArrCount[index].suggREPPostInp = 0;
    }
    else if (this.RCCC7.get('suggestions')?.value[index].suggestionType == "url_action") {
      this.STUrl = "";
      this.suggArrCount[index].suggURLPostInp = 0;
      this.suggArrCount[index].suggURLTextInp = 0;
      this.suggArrCount[index].suggURLUrlInp = 0;
    }
    else {
      this.STdialer = "";
      this.suggArrCount[index].suggDAILTextInp = 0;
      this.suggArrCount[index].suggDAILPostInp = 0;
    }
    sFG.reset();
    (this.RCCC7.get('suggestions') as FormArray).removeAt(index);
    this.suggArrCount.splice(index, 1);

    if ((this.RCCC7.get('suggestions') as FormArray).length < 1) {
      this.emptyfield = true;
    }
  }
  RCCtype7(event: any, index: number) {
    const selectedType = event.target.value;
    const ArrC = this.suggestionControl7.controls[index].value.suggestionType;

    if (ArrC == 'url_action') {
      this.suggestionControl7.controls[index].get('postback')?.setValue('VISITED');
      this.suggArrCount[index].suggURLPostInp = this.suggestionControl7.controls[index].get('postback')?.value.length;
    }
    else if (ArrC == 'dialer_action') {
      this.suggestionControl7.controls[index].get('postback')?.setValue('CALLED');
      this.suggArrCount[index].suggDAILPostInp = this.suggestionControl7.controls[index].get('postback')?.value.length;
    }
    else {
      this.suggestionControl7.controls[index].get('postback')?.setValue('MESSAGED');

      this.suggArrCount[index].suggREPPostInp = this.suggestionControl7.controls[index].get('postback')?.value.length;
    }

  }
  RccsugRep7(i: any) {
    this.STReply = this.RCCC7.get('suggestions')?.value[i].displayText;
    // this.suggREPTextInp = this.RCCC7.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggREPTextInp = this.RCCC7.get('suggestions')?.value[i].displayText.length;

    this.suggArrCount[i].suggREPPostInp = this.RCCC7.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC7.value.suggestions

  }
  RccsugUrl7(i: any) {
    this.STUrl = this.RCCC7.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggURLTextInp = this.RCCC7.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggURLPostInp = this.RCCC7.get('suggestions')?.value[i].postback.length;
    this.suggArrCount[i].suggURLUrlInp = this.RCCC7.get('suggestions')?.value[i].url.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC7.value.suggestions

  }
  RccsugDial7(i: any) {
    this.STdialer = this.RCCC7.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggDAILTextInp = this.RCCC7.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggDAILPostInp = this.RCCC7.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC7.value.suggestions

  }
  get suggestionControl8() {
    return this.RCCC8.get('suggestions') as FormArray;
  }

  RCCaddSuggestion8() {
    this.emptyfield = false;
    const Control: any = <FormArray>this.RCCC8.controls['suggestions'];
    Control.push(this.fb.group({
      suggestionType: 'reply',
      displayText: [''],
      postback: ['MESSAGED'],
      url: [''],
      phoneNumber: ['+91']
    }));

    this.suggArrCount.push({
      suggREPTextInp: 0,
      suggREPPostInp: 0,

      suggURLUrlInp: 0,
      suggURLPostInp: 0,
      suggURLTextInp: 0,

      suggDAILTextInp: 0,
      suggDAILPostInp: 0
    })
    const i = Control.length - 1;

    if (Control.controls[i].value.postback == 'MESSAGED') {
      this.suggArrCount[i].suggREPPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'CALLED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'VISITED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
  }

  RCCremoveItem8(index: any) {
    const sFG = this.fb.group({
      suggestionType: '',
      displayText: '',
      postback: '',
      url: '',
      phoneNumber: ''
    });
    if (this.RCCC8.get('suggestions')?.value[index].suggestionType == "reply") {
      this.STReply = "";
      this.suggArrCount[index].suggREPTextInp = 0;
      this.suggArrCount[index].suggREPPostInp = 0;
    }
    else if (this.RCCC8.get('suggestions')?.value[index].suggestionType == "url_action") {
      this.STUrl = "";
      this.suggArrCount[index].suggURLPostInp = 0;
      this.suggArrCount[index].suggURLTextInp = 0;
      this.suggArrCount[index].suggURLUrlInp = 0;
    }
    else {
      this.STdialer = "";
      this.suggArrCount[index].suggDAILTextInp = 0;
      this.suggArrCount[index].suggDAILPostInp = 0;
    }
    sFG.reset();
    (this.RCCC8.get('suggestions') as FormArray).removeAt(index);
    this.suggArrCount.splice(index, 1);

    if ((this.RCCC8.get('suggestions') as FormArray).length < 1) {
      this.emptyfield = true;
    }
  }
  RCCtype8(event: any, index: number) {
    const selectedType = event.target.value;
    const ArrC = this.suggestionControl8.controls[index].value.suggestionType;

    if (ArrC == 'url_action') {
      this.suggestionControl8.controls[index].get('postback')?.setValue('VISITED');
      this.suggArrCount[index].suggURLPostInp = this.suggestionControl8.controls[index].get('postback')?.value.length;
    }
    else if (ArrC == 'dialer_action') {
      this.suggestionControl8.controls[index].get('postback')?.setValue('CALLED');
      this.suggArrCount[index].suggDAILPostInp = this.suggestionControl8.controls[index].get('postback')?.value.length;
    }
    else {
      this.suggestionControl8.controls[index].get('postback')?.setValue('MESSAGED');

      this.suggArrCount[index].suggREPPostInp = this.suggestionControl.controls[index].get('postback')?.value.length;
    }

  }
  RccsugRep8(i: any) {
    this.STReply = this.RCCC8.get('suggestions')?.value[i].displayText;
    // this.suggREPTextInp = this.RCCC8.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggREPTextInp = this.RCCC8.get('suggestions')?.value[i].displayText.length;

    this.suggArrCount[i].suggREPPostInp = this.RCCC8.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC8.value.suggestions

  }
  RccsugUrl8(i: any) {
    this.STUrl = this.RCCC8.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggURLTextInp = this.RCCC8.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggURLPostInp = this.RCCC8.get('suggestions')?.value[i].postback.length;
    this.suggArrCount[i].suggURLUrlInp = this.RCCC8.get('suggestions')?.value[i].url.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC8.value.suggestions

  }
  RccsugDial8(i: any) {
    this.STdialer = this.RCCC8.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggDAILTextInp = this.RCCC8.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggDAILPostInp = this.RCCC8.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC8.value.suggestions

  }
  get suggestionControl9() {
    return this.RCCC9.get('suggestions') as FormArray;
  }

  RCCaddSuggestion9() {
    this.emptyfield = false;
    const Control: any = <FormArray>this.RCCC9.controls['suggestions'];
    Control.push(this.fb.group({
      suggestionType: 'reply',
      displayText: [''],
      postback: ['MESSAGED'],
      url: [''],
      phoneNumber: ['+91']
    }));

    this.suggArrCount.push({
      suggREPTextInp: 0,
      suggREPPostInp: 0,

      suggURLUrlInp: 0,
      suggURLPostInp: 0,
      suggURLTextInp: 0,

      suggDAILTextInp: 0,
      suggDAILPostInp: 0
    })
    const i = Control.length - 1;

    if (Control.controls[i].value.postback == 'MESSAGED') {
      this.suggArrCount[i].suggREPPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'CALLED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'VISITED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }

  }

  RCCremoveItem9(index: any) {
    const sFG = this.fb.group({
      suggestionType: '',
      displayText: '',
      postback: '',
      url: '',
      phoneNumber: ''
    });
    if (this.RCCC9.get('suggestions')?.value[index].suggestionType == "reply") {
      this.STReply = "";
      this.suggArrCount[index].suggREPTextInp = 0;
      this.suggArrCount[index].suggREPPostInp = 0;
    }
    else if (this.RCCC9.get('suggestions')?.value[index].suggestionType == "url_action") {
      this.STUrl = "";
      this.suggArrCount[index].suggURLPostInp = 0;
      this.suggArrCount[index].suggURLTextInp = 0;
      this.suggArrCount[index].suggURLUrlInp = 0;
    }
    else {
      this.STdialer = "";
      this.suggArrCount[index].suggDAILTextInp = 0;
      this.suggArrCount[index].suggDAILPostInp = 0;
    }
    sFG.reset();
    (this.RCCC9.get('suggestions') as FormArray).removeAt(index);
    this.suggArrCount.splice(index, 1);

    if ((this.RCCC9.get('suggestions') as FormArray).length < 1) {
      this.emptyfield = true;
    }
  }
  RCCtype9(event: any, index: number) {
    const selectedType = event.target.value;
    const ArrC = this.suggestionControl9.controls[index].value.suggestionType;

    if (ArrC == 'url_action') {
      this.suggestionControl9.controls[index].get('postback')?.setValue('VISITED');
      this.suggArrCount[index].suggURLPostInp = this.suggestionControl9.controls[index].get('postback')?.value.length;
    }
    else if (ArrC == 'dialer_action') {
      this.suggestionControl9.controls[index].get('postback')?.setValue('CALLED');
      this.suggArrCount[index].suggDAILPostInp = this.suggestionControl9.controls[index].get('postback')?.value.length;
    }
    else {
      this.suggestionControl9.controls[index].get('postback')?.setValue('MESSAGED');

      this.suggArrCount[index].suggREPPostInp = this.suggestionControl9.controls[index].get('postback')?.value.length;
    }

  }
  RccsugRep9(i: any) {
    this.STReply = this.RCCC9.get('suggestions')?.value[i].displayText;
    // this.suggREPTextInp = this.RCCC9.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggREPTextInp = this.RCCC9.get('suggestions')?.value[i].displayText.length;

    this.suggArrCount[i].suggREPPostInp = this.RCCC9.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC9.value.suggestions

  }
  RccsugUrl9(i: any) {
    this.STUrl = this.RCCC9.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggURLTextInp = this.RCCC9.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggURLPostInp = this.RCCC9.get('suggestions')?.value[i].postback.length;
    this.suggArrCount[i].suggURLUrlInp = this.RCCC9.get('suggestions')?.value[i].url.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC9.value.suggestions

  }
  RccsugDial9(i: any) {
    this.STdialer = this.RCCC9.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggDAILTextInp = this.RCCC9.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggDAILPostInp = this.RCCC9.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC9.value.suggestions

  }
  get suggestionControl10() {
    return this.RCCC10.get('suggestions') as FormArray;
  }

  RCCaddSuggestion10() {
    this.emptyfield = false;
    const Control: any = <FormArray>this.RCCC10.controls['suggestions'];
    Control.push(this.fb.group({
      suggestionType: 'reply',
      displayText: [''],
      postback: ['MESSAGED'],
      url: [''],
      phoneNumber: ['+91']
    }));

    this.suggArrCount.push({
      suggREPTextInp: 0,
      suggREPPostInp: 0,

      suggURLUrlInp: 0,
      suggURLPostInp: 0,
      suggURLTextInp: 0,

      suggDAILTextInp: 0,
      suggDAILPostInp: 0
    })
    const i = Control.length - 1;

    if (Control.controls[i].value.postback == 'MESSAGED') {
      this.suggArrCount[i].suggREPPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'CALLED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
    else if (Control.controls[i].value.postback == 'VISITED') {
      this.suggArrCount[i].suggDAILPostInp = Control.controls[i].value.postback.length;
    }
  }

  RCCremoveItem10(index: any) {
    const sFG = this.fb.group({
      suggestionType: '',
      displayText: '',
      postback: '',
      url: '',
      phoneNumber: ''
    });
    if (this.RCCC10.get('suggestions')?.value[index].suggestionType == "reply") {
      this.STReply = "";
      this.suggArrCount[index].suggREPTextInp = 0;
      this.suggArrCount[index].suggREPPostInp = 0;
    }
    else if (this.RCCC10.get('suggestions')?.value[index].suggestionType == "url_action") {
      this.STUrl = "";
      this.suggArrCount[index].suggURLPostInp = 0;
      this.suggArrCount[index].suggURLTextInp = 0;
      this.suggArrCount[index].suggURLUrlInp = 0;
    }
    else {
      this.STdialer = "";
      this.suggArrCount[index].suggDAILTextInp = 0;
      this.suggArrCount[index].suggDAILPostInp = 0;
    }
    sFG.reset();
    (this.RCCC10.get('suggestions') as FormArray).removeAt(index);
    this.suggArrCount.splice(index, 1);

    if ((this.RCCC10.get('suggestions') as FormArray).length < 1) {
      this.emptyfield = true;
    }
  }
  RCCtype10(event: any, index: number) {
    const selectedType = event.target.value;
    const ArrC10 = this.suggestionControl10.controls[index].value.suggestionType;

    if (ArrC10 == 'url_action') {
      this.suggestionControl10.controls[index].get('postback')?.setValue('VISITED');
      this.suggArrCount[index].suggURLPostInp = this.suggestionControl10.controls[index].get('postback')?.value.length;
    }
    else if (ArrC10 == 'dialer_action') {
      this.suggestionControl10.controls[index].get('postback')?.setValue('CALLED');
      this.suggArrCount[index].suggDAILPostInp = this.suggestionControl10.controls[index].get('postback')?.value.length;
    }
    else {
      this.suggestionControl10.controls[index].get('postback')?.setValue('MESSAGED');

      this.suggArrCount[index].suggREPPostInp = this.suggestionControl10.controls[index].get('postback')?.value.length;
    }

  }
  RccsugRep10(i: any) {
    this.STReply = this.RCCC10.get('suggestions')?.value[i].displayText;
    // this.suggREPTextInp = this.RCCC10.get('suggestions')?.value[i].displayText.length;


    this.suggArrCount[i].suggREPTextInp = this.RCCC10.get('suggestions')?.value[i].displayText.length;

    this.suggArrCount[i].suggREPPostInp = this.RCCC10.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC10.value.suggestions

  }
  RccsugUrl10(i: any) {
    this.STUrl = this.RCCC10.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggURLTextInp = this.RCCC10.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggURLPostInp = this.RCCC10.get('suggestions')?.value[i].postback.length;
    this.suggArrCount[i].suggURLUrlInp = this.RCCC10.get('suggestions')?.value[i].url.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC10.value.suggestions

  }
  RccsugDial10(i: any) {
    this.STdialer = this.RCCC10.get('suggestions')?.value[i].displayText;
    this.suggArrCount[i].suggDAILTextInp = this.RCCC10.get('suggestions')?.value[i].displayText.length;
    this.suggArrCount[i].suggDAILPostInp = this.RCCC10.get('suggestions')?.value[i].postback.length;
    this.RccCard[this.cardIDX].suggestions = this.RCCC10.value.suggestions

  }















  clear() {
    window.location.reload();
  }

  suggActionsCall(i: any) {

  }

  template(a: any) {
    this.templateType = a
    console.log(this.templateType);

    switch (a) {
      case 'rich_card':
        this.RCSAbox = true;
        this.RCCbox = false;
        this.textM = false;
        break;
      case 'carousel':
        this.RCSAbox = false;
        this.RCCbox = true;
        this.textM = false;
        break;
      case 'text_message':
        this.RCSAbox = false;
        this.RCCbox = false;
        this.textM = true;
    }
  }

  axis(b: any) {
    switch (b) {
      case 'HORIZONTAL':
        this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.media.height = this.finalJsonData.value.height;
        this.JioRCSAData.contentMessage.richCard.standaloneCard.cardOrientation = this.finalJsonData.value.orientation;
        this.JioRCSAData.contentMessage.richCard.standaloneCard.thumbnailImageAlignment = this.finalJsonData.value.position;
        this.horizontalAxis = true;
        break;
      case 'VERTICAL':
        this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.media.height = this.finalJsonData.value.height;
        this.JioRCSAData.contentMessage.richCard.standaloneCard.cardOrientation = this.finalJsonData.value.orientation;
        this.JioRCSAData.contentMessage.richCard.standaloneCard.thumbnailImageAlignment = this.finalJsonData.value.position;
        this.horizontalAxis = false;
        break;
    }
  }
  ImageSize(h: any) {
    switch (h) {
      case 'TALL':
        this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.media.height = this.finalJsonData.value.height;
        this.JioRCSAData.contentMessage.richCard.standaloneCard.cardOrientation = this.finalJsonData.value.orientation;
        this.JioRCSAData.contentMessage.richCard.standaloneCard.thumbnailImageAlignment = this.finalJsonData.value.position;
        this.imageSizesTall = true;
        this.imageSizesMedium = false;
        this.imageSizes=false
        break;
        case 'MEDIUM':
          this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.media.height = this.finalJsonData.value.height;
          this.JioRCSAData.contentMessage.richCard.standaloneCard.cardOrientation = this.finalJsonData.value.orientation;
          this.JioRCSAData.contentMessage.richCard.standaloneCard.thumbnailImageAlignment = this.finalJsonData.value.position;
          this.imageSizesMedium = true;
          this.imageSizes=false;
          this.imageSizesTall=false
          break;
          case 'SMALL':
            this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.media.height = this.finalJsonData.value.height;
            this.JioRCSAData.contentMessage.richCard.standaloneCard.cardOrientation = this.finalJsonData.value.orientation;
            this.JioRCSAData.contentMessage.richCard.standaloneCard.thumbnailImageAlignment = this.finalJsonData.value.position;
            this.imageSizes = true;
            this.imageSizesTall=false;
            this.imageSizesMedium=false;
        break;
    }
  }

  ImagePosition(i: any) {
    switch (i) {
      case 'left':
        this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.media.height = this.finalJsonData.value.height;
        this.JioRCSAData.contentMessage.richCard.standaloneCard.cardOrientation = this.finalJsonData.value.orientation;
        this.JioRCSAData.contentMessage.richCard.standaloneCard.thumbnailImageAlignment = this.finalJsonData.value.position;
        this.imagePosition = false;
        break;
      case 'right':
        this.JioRCSAData.contentMessage.richCard.standaloneCard.cardContent.media.height = this.finalJsonData.value.height;
        this.JioRCSAData.contentMessage.richCard.standaloneCard.cardOrientation = this.finalJsonData.value.orientation;
        this.JioRCSAData.contentMessage.richCard.standaloneCard.thumbnailImageAlignment = this.finalJsonData.value.position;
        this.imagePosition = true;
        break;
    }
  }


  RCCcardWidth(h: any) {

    switch (h) {
      case 'SMALL_WIDTH':
        this.SRccCardWidth = false;
        break;
      case 'MEDIUM_WIDTH':
        this.SRccCardWidth = true;
        break;
    }

  }
  RCCcardHeight(e: any) {
    switch (e) {
      case 'SHORT_HEIGHT':
        this.SRccCardHeight = false;
        break;
      case 'MEDIUM_HEIGHT':
        this.SRccCardHeight = true;
        break;
    }
  }

}