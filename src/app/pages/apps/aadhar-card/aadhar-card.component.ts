import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AadharFormComponent } from './aadhar-form/aadhar-form.component';

export interface Employee {
  id: number;
  Name: string;
  applicationNumber: string;
  feeStatus: string;
  emailId: string;
  mobileNumber: number;
  dateOfBirth: Date;
  Salary: number;
  Projects: number;
  imagePath: string;
}


export interface aadharCard {
id:number
yourFirstName:string,
yourMiddleName:string,
yourLastName:string,
fatherFirstName:string,
fatherMiddleName:string,
fatherLastName:string,
address:string,
aadhaarNumber:number,
isAadhaarStatus:string,
applicationNumber:number,
fee:number,
isFeeStatus:string,
emailId:string,
selectGender:string,
dateOfBirth:string,
mobileNumber:number,
}

@Component({
  selector: 'app-aadhar-card',
  templateUrl: './aadhar-card.component.html',
  styleUrls: ['./aadhar-card.component.scss']
})

export class AadharCardComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  
  displayedColumns: string[] = [
    '#',
    'yourFirstName',
    'applicationNumber',
    'isFeeStatus',
    'emailId',
    'mobileNumber',
    'dateOfBirth',
    'action',
  ];
 aadharCardList = [
    {
      id:1,
      yourFirstName: "Johnathan Deo",
      yourMiddleName: "Johnathan Deo",
      yourLastName: "Johnathan Deo",
      fatherFirstName: "demo",
      fatherMiddleName: "demo",
      fatherLastName: "demo",
      address: "surat",
      aadhaarNumber: 445362796876,
      isAadhaarStatus: "Completed",
      applicationNumber: 76676,
      fee: 670,
      isFeeStatus: "Receview",
      emailId: "JohnathanDeo@gmail.com",
      selectGender: "Female",
      dateOfBirth: "2000-07-06",
      mobileNumber: 6776667673,
      imagePath:"assets/images/profile/user-2.jpg"
  }
  ];
  
  dataSource = new MatTableDataSource(this.aadharCardList);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe) { }
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AadharFormComponent, {
      data: obj,
      width : action === 'Delete' ?'25%':'50%'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  // tslint:disable-next-line - Disables all
  addRowData(row_obj: aadharCard): void {
    // this.dataSource.data.unshift()
    this.aadharCardList.push(
      {
      id:row_obj.id,
      yourFirstName:row_obj.yourFirstName,
      yourMiddleName: row_obj.yourMiddleName,
      yourLastName: row_obj.yourLastName,
      fatherFirstName: row_obj.fatherFirstName,
      fatherMiddleName: row_obj.fatherMiddleName,
      fatherLastName:row_obj.fatherLastName ,
      address:row_obj.address,
      aadhaarNumber: row_obj.aadhaarNumber,
      isAadhaarStatus: row_obj.isAadhaarStatus,
      applicationNumber: row_obj.applicationNumber,
      fee:row_obj.fee,
      isFeeStatus: row_obj.isFeeStatus,
      emailId: row_obj.emailId,
      selectGender: row_obj.selectGender,
      dateOfBirth: row_obj.dateOfBirth,
      mobileNumber: row_obj.mobileNumber,
      imagePath: 'assets/images/profile/user-2.jpg',
    });
    this.dataSource= new MatTableDataSource(this.aadharCardList);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: aadharCard): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.id === row_obj.id) {
        value.yourFirstName = row_obj.yourFirstName;
        value.yourMiddleName = row_obj.yourMiddleName;
        value.yourLastName = row_obj.yourLastName;
        value.fatherFirstName = row_obj.fatherFirstName;
        value.fatherMiddleName = row_obj.fatherMiddleName;
        value.fatherLastName = row_obj.fatherLastName;
        value.address = row_obj.address;
        value.aadhaarNumber = row_obj.aadhaarNumber;
        value.isAadhaarStatus = row_obj.isAadhaarStatus;
        value.applicationNumber = row_obj.applicationNumber;
        value.fee = row_obj.fee;
        value.isFeeStatus = row_obj.isFeeStatus;
        value.emailId = row_obj.emailId;
        value.selectGender = row_obj.selectGender;
        value.dateOfBirth = row_obj.dateOfBirth;
        value.mobileNumber = row_obj.mobileNumber;
        value.imagePath = "assets/images/profile/user-2.jpg";
      }
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: aadharCard): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.id !== row_obj.id;
    });
  }
}
