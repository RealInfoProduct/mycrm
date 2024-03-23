import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NULL } from 'sass';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { environment } from 'src/environments/environment.prod';


export function alphabeticValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) {
      return null; // No validation error if the field is empty
    }
    const valid = /^[A-Za-z]+$/.test(value);
    return valid ? null : { 'invalidAlphabetic': true };
  };
}

export function mobileNumberPatternValidator(pattern: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value || value === '') {
      return null; // No validation error if the field is empty
    }
    const valid = pattern.test(value);
    return valid ? null : { 'invalidPattern': true };
  };
}

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.scss']
})

export class CustomersFormComponent {
  customersForm: FormGroup
  action: string;
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  imagePath:any = 'assets/images/profile/user-1.jpg'
  aadharFontImagePath:any = '../../../../../assets/images/customers/aadhar card font image.jpg';
  aadharBackImagePath:any = '../../../../../assets/images/customers/aadhar card back image.jpg';
  panCardImagePath:any = '../../../../../assets/images/customers/pan card.jpeg';
  drivingLicenseImagePath:any = '../../../../../assets/images/customers/driving license.jpg';
  votingCardImagePath:any = '../../../../../assets/images/customers/voting card.jpg';
  passPortImagePath:any = '../../../../../assets/images/customers/passport.webp';
  aadharImagePath:any = '../../../../../assets/images/documentImage/aadhaar-card.png';
  birthCertificatePath:any = '../../../../../assets/images/documentImage/aadhaar-card.png';
  schoolLeavingCertificatePath:any = '../../../../../assets/images/customers/school-leaving-certificate.jpg';
  lightBillPath:any = '../../../../../assets/images/customers/light bill Pic.jpg';
  casteCertificatePath:any = '../../../../../assets/images/customers/caste-certificate.jpg';
  isEdit :boolean = false
  customerEditData :any
  S3_BUCKE_URL :any = environment.S3_BUCKE_URL
  pdfUrl: any;
  isPdfShow : boolean = false

  document_URL: any = {
    pancard_file :  null,
    pancard_show_URL: '../../../../../assets/images/customers/pan card.jpeg',
    aadharCardFont_file :  null,
    aadharCardFont_show_URL: '../../../../../assets/images/customers/aadhar card font image.jpg',
    aadharCardBack_file :  null,
    aadharCardBack_show_URL: '../../../../../assets/images/customers/aadhar card back image.jpg',
    drivingLicense_file :  null,
    drivingLicense_show_URL: '../../../../../assets/images/customers/driving license.jpg',
    passPortUrl_file :  null,
    passPortUrl_show_URL: '../../../../../assets/images/customers/passport.webp',
    votingCardUrl_file :  null,
    votingCardUrl_show_URL: '../../../../../assets/images/customers/voting card.jpg',
    userProFileUrl_file :  null,
    userProFileUrl_show_URL: 'assets/images/profile/user-1.jpg',
    birthCertificateUrl_file :  null,
    birthCertificateUrl_show_URL: '../../../../../assets/images/customers/birth-certificate.jpg',
    schoolLeavingCertificateUrl_file :  null,
    schoolLeavingCertificateUrl_show_URL: '../../../../../assets/images/customers/school-leaving-certificate.jpg',
    lightBillUrl_file :  null,
    lightBillUrl_show_URL: '../../../../../assets/images/customers/light bill Pic.jpg',
    casteCertificateUrl_file :  null,
    casteCertificateUrl_show_URL: '../../../../../assets/images/customers/caste-certificate.jpg',
  }
  lightBillUrlArray :any = []

  constructor(
    public datePipe: DatePipe,
    private formBuilder : FormBuilder,
    private customerService :CustomerService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {    
    this.customersFormBuilder()
    this.route.params.subscribe(params => {
      if (params['customersId?']) {
        this.getEditCustomerData(params['customersId?'])
        this.isEdit = true
      } else {
        this.isEdit = false
      }
    });
  }

  selectUserProFile(event: any): void {

    if (!event.target.files[0] || event.target.files[0].length === 0) {
      // this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.msg = "Only images are supported";
      return;
    }
    // tslint:disable-next-line - Disables all
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line - Disables all
    reader.onload = (_event) => {
      this.customersForm.controls['userProFile'].setValue(event.target.files[0])
      // tslint:disable-next-line - Disables all
      this.imagePath = reader.result;
    };
  }

  displaySelectedFile(event:any ,docType: string, docShowUrl: any) {
    if(event.target.files[0].type === 'application/pdf') {
      this.document_URL[docType] = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.document_URL[docShowUrl] = reader.result;
        const pdfDataUrl = reader.result as string;
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfDataUrl);
        this.isPdfShow = true
      };
    } else {
      this.document_URL[docType] = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.document_URL[docShowUrl] = reader.result;
        this.isPdfShow = false

      };
    }
  }

  customersFormBuilder() {
    this.customersForm = this.formBuilder.group({
      userProFile : [''],
      firstName : ['' , [Validators.required, alphabeticValidator()]],
      middleName : ['' , [Validators.required, alphabeticValidator()]],
      lastName : ['' , [Validators.required, alphabeticValidator()]],
      dateOfBirth : ['' , Validators.required],
      mobileNumber : ['' , [Validators.required, mobileNumberPatternValidator(/^\d{10}$/)]],
      emailId : ['' ,[Validators.required, Validators.email]],
      isGender : [''],
      isMarriedStatus: [''],
      panCardUrl: [''],
      aadharCardFontUrl: [''],
      aadharCardBackUrl: [''],
      drivingLicenseUrl: [''],
      passPortUrl: [''],
      votingCardUrl: [''],
      birthCertificateUrl: [''],
      schoolLeavingCertificateUrl: [''],
      lightBillUrl: [''],
      casteCertificateUrl: [''],
    })
  }

  submitData() {
    if (this.customerEditData.customer_uuid) {
      const customerRegisterPayload = {
        action: "edit_customer",
        customer_id : this.customerEditData.customer_uuid,
        first_name: this.customersForm.value.firstName,
        middle_name: this.customersForm.value.middleName,
        last_name: this.customersForm.value.lastName,
        mobile_number: this.customersForm.value.mobileNumber.toString(),
        email_id: this.customersForm.value.emailId,
        gender: this.customersForm.value.isGender,
        user_image_url: this.customerEditData.user_image_url,
        date_of_birth : this.customersForm.value.dateOfBirth,
        is_married: this.customersForm.value.isMarriedStatus === 'no' ? false : true,
        aadhar_back_url: this.customersForm.value.aadharCardBackUrl,
        aadhar_front_url: this.customersForm.value.aadharCardFontUrl,
        aadhar_number: "",
        birth_certificate_url: this.customersForm.value.birthCertificateUrl,
        driving_number: "",
        driving_url: this.customersForm.value.drivingLicenseUrl,
        leaving_certificate_url: this.customersForm.value.schoolLeavingCertificateUrl,
        light_bill_urls: [''],
        pancard_number: "",
        pancard_url: this.customersForm.value.panCardUrl,
        passport_expiry_date: "",
        passport_number: "",
        passport_url: this.customersForm.value.passPortUrl,
        voting_url: this.customersForm.value.votingCardUrl,
        caste_certificate_url : this.customersForm.value.casteCertificateUrl
      }

      this.customerService.manageCustomer(customerRegisterPayload).subscribe((res:any) => {
        if (res) {
          this.openConfigSnackBar(res.message)
        }
      })      
      
    } else {
      const signedURLPaylod = {
        folder: "user-image",
        file_name: this.customersForm.value.userProFile.name,
        content_type: this.customersForm.value.userProFile.type
      }
  
      this.customerService.createGeneralImageUpload(signedURLPaylod).subscribe((signedURLRes:any) => {
        if (signedURLRes) {
          this.customerService.imageUpload(signedURLRes.uploadURL ,this.customersForm.value.userProFile).then((res:any) => {
            if (res) {
              const customerRegisterPayload = {
                company_id: "89bb5322-5f41-49fc-ad63-3cf8167c3500",
                first_name: this.customersForm.value.firstName,
                middle_name: this.customersForm.value.middleName,
                last_name: this.customersForm.value.lastName,
                mobile_number: this.customersForm.value.mobileNumber.toString(),
                email_id: this.customersForm.value.emailId,
                gender: this.customersForm.value.isGender,
                user_image_url: signedURLRes.Key,
                date_of_birth : this.customersForm.value.dateOfBirth,
                is_married: this.customersForm.value.isMarriedStatus === 'no' ? false : true,
                aadhar_back_url: this.customersForm.value.aadharCardBackUrl,
                aadhar_front_url: this.customersForm.value.aadharCardFontUrl,
                aadhar_number: "",
                birth_certificate_url: "",
                driving_number: "",
                driving_url: this.customersForm.value.drivingLicenseUrl,
                leaving_certificate_url: "",
                light_bill_urls: [],
                pancard_number: "",
                pancard_url: this.customersForm.value.panCardUrl,
                passport_expiry_date: "",
                passport_number: "",
                passport_url: this.customersForm.value.passPortUrl,
                voting_url: this.customersForm.value.votingCardUrl,
                caste_certificate_url : this.customersForm.value.casteCertificateUrl
              }
              this.customerService.createCustomer(customerRegisterPayload).subscribe((res:any) => {
                if (res) {
                  this.openConfigSnackBar(res.message)
                }
              })      
            }
          })
        
        }
      })
    }


  }

  cancel(itemName: any) {
    switch (itemName) {
      case 'panCard':
        this.customersForm.controls['panCardUrl'].setValue('')
        this.panCardImagePath = '../../../../../assets/images/customers/pan card.jpeg'
        break;
      case 'aadharCard':
        this.customersForm.controls['aadharCardFontUrl'].setValue('')
        this.customersForm.controls['aadharCardBackUrl'].setValue('')
        this.aadharFontImagePath = '../../../../../assets/images/customers/aadhar card font image.jpg';
        this.aadharBackImagePath = '../../../../../assets/images/customers/aadhar card back image.jpg';
        break;
      case 'drivingLicense':
        this.customersForm.controls['drivingLicenseUrl'].setValue('')
        this.drivingLicenseImagePath = '../../../../../assets/images/customers/driving license.jpg';
        break;
      case 'passPort':
        this.customersForm.controls['passPortUrl'].setValue('')
        this.passPortImagePath = '../../../../../assets/images/customers/passport.webp';
        break;
      case 'votingCard':
        this.customersForm.controls['votingCardUrl'].setValue('')
        this.votingCardImagePath = '../../../../../assets/images/customers/voting card.jpg';
        break;
      case 'birthCertificateCard':
        this.customersForm.controls['birthCertificateUrl'].setValue('')
        this.birthCertificatePath = '../../../../../assets/images/customers/voting card.jpg';
        break;
      case 'schoolLeavingCertificateCard':
        this.customersForm.controls['schoolLeavingCertificateUrl'].setValue('')
        this.schoolLeavingCertificatePath = '../../../../../assets/images/customers/school-leaving-certificate.jpg';
        break;
      case 'lightBillUrlPic':
        this.customersForm.controls['lightBillUrl'].setValue('')
        this.lightBillPath = '../../../../../assets/images/customers/light bill Pic.jpg';
        break;
      case 'casteCertificateCard':
        this.customersForm.controls['casteCertificateUrl'].setValue('')
        this.casteCertificatePath = '../../../../../assets/images/customers/caste-certificate.jpg';
        break;
      default:
    }
  }

  openConfigSnackBar(snackbarTitle :any) {
    this._snackBar.open(snackbarTitle, 'Splash', {
      duration: 2 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  getEditCustomerData(customerId :any){
    const payload = {
      action : "get_customer_details",
      customer_id : customerId 
    }
    this.customerService.manageCustomer(payload).subscribe((res:any) => {
      if (res) {
        this.customerEditData = res.data.customerData
        this.customersForm.controls['firstName'].setValue(res.data.customerData.first_name)
        this.customersForm.controls['middleName'].setValue(res.data.customerData.middle_name)
        this.customersForm.controls['lastName'].setValue(res.data.customerData.last_name)
        this.customersForm.controls['lastName'].setValue(res.data.customerData.last_name)
        this.customersForm.controls['dateOfBirth'].setValue(res.data.customerData.date_of_birth)
        this.customersForm.controls['mobileNumber'].setValue(res.data.customerData.mobile_number) 
        this.customersForm.controls['emailId'].setValue(res.data.customerData.email_id) 
        this.customersForm.controls['isGender'].setValue(res.data.customerData.gender) 
        this.customersForm.controls['isMarriedStatus'].setValue(  res.data.customerData.is_married ? 'yes' : 'no')
        this.customersForm.controls['panCardUrl'].setValue(res.data.customerData.documents.pancard_url) 
        this.customersForm.controls['aadharCardFontUrl'].setValue(res.data.customerData.documents.aadhar_front_url) 
        this.customersForm.controls['aadharCardBackUrl'].setValue(res.data.customerData.documents.aadhar_back_url) 
        this.customersForm.controls['drivingLicenseUrl'].setValue(res.data.customerData.documents.driving_url) 
        this.customersForm.controls['passPortUrl'].setValue(res.data.customerData.documents.passport_url) 
        this.customersForm.controls['votingCardUrl'].setValue(res.data.customerData.documents.voting_url) 
        this.customersForm.controls['userProFile'].setValue(res.data.customerData.user_image_url) 
        this.customersForm.controls['birthCertificateUrl'].setValue(res.data.customerData.documents.birth_certificate_url) 
        this.customersForm.controls['schoolLeavingCertificateUrl'].setValue(res.data.customerData.documents.leaving_certificate_url) 
        this.lightBillUrlArray = []
        this.lightBillUrlArray = res.data.customerData.documents.light_bill_urls
        this.customersForm.controls['lightBillUrl'].setValue(res.data.customerData.documents.light_bill_urls[0])       
        this.customersForm.controls['casteCertificateUrl'].setValue(res.data.customerData.documents.caste_certificate_url) 

       } 
    })
  }

  uploaddocuments(documentsName: any, docType: any) {
    const signedURLPaylod = {
      folder: this.customerEditData.customer_id + '-' + this.customerEditData.first_name,
      file_name: this.document_URL[docType].name,
      content_type: this.document_URL[docType].type
    }
   this.uploadAndSaveDocument(signedURLPaylod ,this.document_URL[docType] , documentsName )
  } 


  uploadAndSaveDocument(signedURLPaylod: any ,document_file :any  ,documentsName :any) {
    const customerRegisterPayload = {
      action: "edit_customer",
      customer_id: this.customerEditData.customer_uuid,
      first_name: this.customersForm.value.firstName,
      middle_name: this.customersForm.value.middleName,
      last_name: this.customersForm.value.lastName,
      mobile_number: this.customersForm.value.mobileNumber.toString(),
      email_id: this.customersForm.value.emailId,
      gender: this.customersForm.value.isGender,
      user_image_url: this.customerEditData.user_image_url,
      date_of_birth: this.customersForm.value.dateOfBirth,
      is_married: this.customersForm.value.isMarriedStatus === 'no' ? false : true,
      aadhar_back_url: this.customersForm.value.aadharCardBackUrl,
      aadhar_front_url: this.customersForm.value.aadharCardFontUrl,
      aadhar_number: "",
      birth_certificate_url: this.customersForm.value.birthCertificateUrl,
      driving_number: "",
      driving_url: this.customersForm.value.drivingLicenseUrl,
      leaving_certificate_url: this.customersForm.value.schoolLeavingCertificateUrl,
      light_bill_urls: [],
      pancard_number: "",
      pancard_url: this.customersForm.value.panCardUrl,
      passport_expiry_date: "",
      passport_number: "",
      passport_url: this.customersForm.value.passPortUrl,
      voting_url: this.customersForm.value.votingCardUrl,
      caste_certificate_url : this.customersForm.value.casteCertificateUrl
    }
    this.customerService.createGeneralImageUpload(signedURLPaylod).subscribe((signedURLRes: any) => {
      if (signedURLRes) {
        this.customerService.imageUpload(signedURLRes.uploadURL, document_file).then((res: any) => {
          if (res) {
            switch (documentsName) {
              case 'pancard':
                customerRegisterPayload.pancard_url = signedURLRes.Key
                break;
              case 'aadharcardfont':
                customerRegisterPayload.aadhar_front_url = signedURLRes.Key
                break;
              case 'aadharcardback':
                customerRegisterPayload.aadhar_back_url = signedURLRes.Key
                break;
              case 'drivingLicense':
                customerRegisterPayload.driving_url = signedURLRes.Key
                break;
              case 'passPortUrl':
                customerRegisterPayload.passport_url = signedURLRes.Key
                break;
              case 'votingCardUrl':
                customerRegisterPayload.voting_url = signedURLRes.Key
                break;
              case 'birthCertificateUrl':
                customerRegisterPayload.birth_certificate_url = signedURLRes.Key
                break;
              case 'schoolLeavingCertificateUrl':
                customerRegisterPayload.leaving_certificate_url = signedURLRes.Key
                break;
              case 'lightBillUrl':
                this.lightBillUrlArray.push(signedURLRes.Key)
                customerRegisterPayload.light_bill_urls = this.lightBillUrlArray
                break;
                case 'casteCertificateUrl':
                  customerRegisterPayload.caste_certificate_url = signedURLRes.Key
                  break;
              default:
                break;
            }
            this.customerService.manageCustomer(customerRegisterPayload).subscribe((res: any) => {
              if (res) {
                this.openConfigSnackBar(res.message)
              }
            })
          }
        })
      }
    })
  }

  getDocumentUrl(docName:string, docUrl:string, formControlName: string) {
    if(this.document_URL[docName]) {
      return this.document_URL[docUrl]
    } else {
      return this.customersForm.value[formControlName] ?  this.S3_BUCKE_URL + this.customersForm.value[formControlName]  :  this.document_URL[docUrl]
    }

  }

  aadharCardFontAndBackImageUpload(){
    this.uploaddocuments('aadharcardfont','aadharCardFont_file')
    this.uploaddocuments('aadharcardback','aadharCardBack_file')
  }
}