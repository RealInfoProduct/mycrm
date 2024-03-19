import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PancardFormComponent } from './pancard-form/pancard-form.component';

export interface Employee {
  id: number;
  Name: string;
  Position: string;
  Email: string;
  Mobile: number;
  DateOfJoining: Date;
  Salary: number;
  Projects: number;
  imagePath: string;
}

export interface PanCard {
    id : number
    yourFirstName : string
    yourMiddleName : string
    yourLastName : string
    fatherFirstName : string
    fatherMiddleName : string
    fatherLastName : string
    address : string
    dateOfBirth : string
    gender : string
    pancardNumber : number
    isPanCardStatus : string
    applicationNumber : number
    fee : number
    isFeeStatus : string
    emailId : string
    mobileNumber : number
}

@Component({
  selector: 'app-pancard',
  templateUrl: './pancard.component.html',
  styleUrls: ['./pancard.component.scss']
})

export class PancardComponent implements OnInit {

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'yourFirstName',
    'applicationeNumber',
    'feeStatus',
    'dateOfBirth',
    'emailId',
    'mobileNumber',
    'action',
  ];
   panCardList = [
    {
      id : 1,
      yourFirstName: "fdgdgfd",
      yourMiddleName: "gfdfgd",
      yourLastName: "fgdfgdfg",
      fatherFirstName: "ddfgd",
      fatherMiddleName: "fgdfgdgfd",
      fatherLastName: "fddgd",
      address: "dafs sfdgsfgsaf gsgdfsgdfasg d",
      dateOfBirth: "0011-12-12",
      gender: "male",
      pancardNumber: 54456456,
      isPanCardStatus: "Pending",
      applicationNumber: 123232223122232320,
      fee: 122,
      isFeeStatus: "pending",
      emailId: "1113@GMAIL.COM",
      mobileNumber: 2321223,
      imagePath: 'assets/images/profile/user-2.jpg',
  }
  ];
  dataSource = new MatTableDataSource(this.panCardList);
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
    const dialogRef = this.dialog.open(PancardFormComponent, {
      data: obj,
      width : action === 'Delete' ? '20%' : '40%'
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
  addRowData(row_obj: PanCard): void {
    // this.dataSource.data.unshift();
    this.panCardList.push(
      {
        id : row_obj.id,
        yourFirstName : row_obj.yourFirstName,
        yourMiddleName : row_obj.yourMiddleName,
        yourLastName : row_obj.yourLastName,
        fatherFirstName : row_obj.fatherFirstName,
        fatherMiddleName : row_obj.fatherMiddleName,
        fatherLastName : row_obj.fatherLastName,
        address : row_obj.address,
        dateOfBirth : row_obj.dateOfBirth,
        gender : row_obj.gender,
        pancardNumber : row_obj.pancardNumber,
        isPanCardStatus : row_obj.isPanCardStatus,
        applicationNumber : row_obj.applicationNumber,
        fee : row_obj.fee,
        isFeeStatus : row_obj.isFeeStatus,
        emailId : row_obj.emailId,
        mobileNumber : row_obj.mobileNumber,
        imagePath: 'assets/images/profile/user-2.jpg',

    }
    )

  this.dataSource = new MatTableDataSource(this.panCardList);

    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: PanCard): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.id === row_obj.id) {
          value.id = row_obj.id,
          value.yourFirstName = row_obj.yourFirstName,
          value.yourMiddleName = row_obj.yourMiddleName,
          value.yourLastName = row_obj.yourLastName,
          value.fatherFirstName = row_obj.fatherFirstName,
          value.fatherMiddleName = row_obj.fatherMiddleName,
          value.fatherLastName = row_obj.fatherLastName,
          value.address = row_obj.address,
          value.dateOfBirth = row_obj.dateOfBirth,
          value.gender = row_obj.gender,
          value.pancardNumber = row_obj.pancardNumber,
          value.isPanCardStatus = row_obj.isPanCardStatus,
          value.applicationNumber = row_obj.applicationNumber,
          value.fee = row_obj.fee,
          value.isFeeStatus = row_obj.isFeeStatus,
          value.emailId = row_obj.emailId,
          value.mobileNumber = row_obj.mobileNumber,
          value.imagePath = 'assets/images/profile/user-4.jpg'
      }
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: PanCard): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.id !== row_obj.id;
    });
  }
  
}
