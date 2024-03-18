import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';


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

  constructor(
    public datePipe: DatePipe,
    private formBuilder : FormBuilder,
    // public dialogRef: MatDialogRef<CustomersComponent>,
    // // @Optional() is used to prevent error if no data is passed
    // @Optional() @Inject(MAT_DIALOG_DATA) public data: Customers,
  ) {
    // this.local_data = { ...data };
    // this.action = this.local_data.action;
    // if (this.local_data.DateOfJoining !== undefined) {
    //   this.joiningDate = this.datePipe.transform(
    //     new Date(this.local_data.DateOfJoining),
    //     'yyyy-MM-dd',
    //   );
    // }
    // if (this.local_data.imagePath === undefined) {
    //   this.local_data.imagePath = 'assets/images/profile/user-1.jpg';
    // }
  }
  ngOnInit(): void {
    this.customersFormBuilder()
  //   if (this.action === 'Update') {
  //     delete this.local_data.action
  //     this.customersForm.setValue(this.local_data)
  //   }

  }

  // doAction(): void {
  //   let num = 15155115515155151;
  //   while (num > 9) {
  //     let sum = 0;
  //     while (num > 0) {
  //       sum += num % 10;
  //       num = Math.floor(num / 10);
  //     }
  //     num = sum;
  //   }
  //   this.customersForm.controls['id'].setValue(num)
  //   console.log("this.customersForm.value========>>>" ,this.customersForm.value);
    
  //   this.dialogRef.close({ event: this.action, data: this.customersForm.value });
  // }

  // closeDialog(): void {
  //   this.dialogRef.close({ event: 'Cancel' });
  // }

  selectFile(event: any): void {
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
      // tslint:disable-next-line - Disables all
      this.imagePath = reader.result;
    };
  }

  selectAadharCardFontPic(event: any): void {
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
      // tslint:disable-next-line - Disables all
      this.aadharFontImagePath = reader.result;
    };
  }

  selectAadharCardBackPic(event: any): void {
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
      // tslint:disable-next-line - Disables all
      this.aadharBackImagePath = reader.result;
    };
  }

  selectPanCardPic(event: any): void {
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
      // tslint:disable-next-line - Disables all
      this.panCardImagePath = reader.result;
    };
  }

  // msg :any
  // selectPanCardPic(event: any): void {
  //   const file = event.target.files[0];

  //   if (!file) {
  //     this.msg = 'You must select an image';
  //     return;
  //   }

  //   if (file.size > 200 * 1024) {
  //     this.msg = 'File size exceeds 200KB limit';
  //     return;
  //   }
  
  //   const mimeType = file.type;
  //   if (!mimeType || !mimeType.match(/^image\//)) {
  //     this.msg = "Only images are supported";
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.msg = '';
  //     this.panCardImagePath = reader.result;
  //   };
  // }

  selectDrivingLicensePic(event: any): void {
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
      // tslint:disable-next-line - Disables all
      this.drivingLicenseImagePath = reader.result;
    };
  }

  selectVotingCardPic(event: any): void {
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
      // tslint:disable-next-line - Disables all
      this.votingCardImagePath = reader.result;
    };
  }

  selectPassPortPic(event: any): void {
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
      // tslint:disable-next-line - Disables all
      this.passPortImagePath = reader.result;
    };
  }

    // customersFormBuilder() {
    //   this.customersForm = this.formBuilder.group({
    //     id: [''],
    //     firstName: [''],
    //     middleName: [''],
    //     lastName: [''],
    //     aadharName: [''],
    //     aadharNumber: [''],
    //     panNumber: [''],
    //     dateOfBirth: [''],
    //     mobileNumber: [''],
    //     emailId: [''],
    //     isGender: [''],
    //     isMarriedStatus: [''],
    //     isPassport: [''],
    //     marriageCertificateNumber: [''],
    //     passportNumber: [''],
    //     passportExpiredDate: [''],
    //     imagePath : ['']
    //   });
    // }


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
    })
  }

  submitData(){
    console.log(this.customersForm.value);
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
      default:
    }
  }
  
}