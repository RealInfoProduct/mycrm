import { DatePipe } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersComponent, Customers } from '../../customers/customers.component';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.scss']
})
export class NewFileComponent {
  customersForm: FormGroup
  action: string;
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    private formBuilder : FormBuilder,
    public dialogRef: MatDialogRef<CustomersComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Customers,
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.local_data.DateOfJoining !== undefined) {
      this.joiningDate = this.datePipe.transform(
        new Date(this.local_data.DateOfJoining),
        'yyyy-MM-dd',
      );
    }
    if (this.local_data.imagePath === undefined) {
      this.local_data.imagePath = 'assets/images/profile/user-1.jpg';
    }
  }
  ngOnInit(): void {
    this.customersFormBuilder()
    if (this.action === 'Update') {
      delete this.local_data.action
      this.customersForm.setValue(this.local_data)
    }
  }

  doAction(): void {
    let num = 15155115515155151;
    while (num > 9) {
      let sum = 0;
      while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
      }
      num = sum;
    }
    this.customersForm.controls['id'].setValue(num)
    console.log("this.customersForm.value========>>>" ,this.customersForm.value);
    
    this.dialogRef.close({ event: this.action, data: this.customersForm.value });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

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
      this.local_data.imagePath = reader.result;
    };
  }

    customersFormBuilder() {
      this.customersForm = this.formBuilder.group({
        id: [''],
        firstName: [''],
        middleName: [''],
        lastName: [''],
        aadharName: [''],
        aadharNumber: [''],
        panNumber: [''],
        dateOfBirth: [''],
        mobileNumber: [''],
        emailId: [''],
        isGender: [''],
        isMarriedStatus: [''],
        isPassport: [''],
        marriageCertificateNumber: [''],
        passportNumber: [''],
        passportExpiredDate: [''],
        imagePath : ['']
      });
    }
}
