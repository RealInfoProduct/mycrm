import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppEmployeeDialogContentComponent } from '../../employee/employee.component';
import { Employee } from '../aadhar-card.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { log } from 'console';

@Component({
  selector: 'app-aadhar-form',
  templateUrl: './aadhar-form.component.html',
  styleUrls: ['./aadhar-form.component.scss']
})
export class AadharFormComponent implements OnInit {
  aadharForm:FormGroup;
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    private fb:FormBuilder,
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppEmployeeDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Employee,
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
    this.aadharBuilder()
    if(this.action === 'Update'){
      delete this.local_data.action
      this.aadharForm.setValue(this.local_data)
    }
  }
    aadharBuilder(){
      this.aadharForm=this.fb.group({
        id:[''],
        yourFirstName:[''], 
        yourMiddleName:[''] ,
        yourLastName:[''],
        fatherFirstName:[''],
        fatherMiddleName:[''],
        fatherLastName:[''],
        address:[''],
        aadhaarNumber:[''],
        isAadhaarStatus:[''],
        applicationNumber:[''],
        fee:[''],
        isFeeStatus:[''],
        emailId:[''],
        selectGender:[''],
        dateOfBirth:[''],
        mobileNumber:['']

      })
    }
  doAction(): void {
    this.aadharForm.controls['id'].setValue(12)
    this.dialogRef.close({ event: this.action, data: this.aadharForm.value});
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
}
