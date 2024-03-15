import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CustomersFormComponent } from '../customers/customers-form/customers-form.component';
import { Customers } from '../customers/customers.component';
import { NewFileComponent } from './new-file/new-file.component';

@Component({
  selector: 'app-itr',
  templateUrl: './itr.component.html',
  styleUrls: ['./itr.component.scss']
})
export class ItrComponent {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'firstName',
    'Email',
    'mobileNumber',
    'aadharNumber',
    'panNumber',
    'isGender',
    'action',
  ];
  customersList :any = [
    {
      id:1,
      firstName: 'Demo User',
      middleName: 'Test',
      lastName: 'User',
      aadharName: 'Demo User Test',
      aadharNumber: 1515151515151515,
      panNumber: 'SDED122E',
      dateOfBirth:  "1001-10-10",
      mobileNumber: 5252515151,
      emailId: 'demouser@gmail.com',
      isGender: 'Male',
      isMarriedStatus: 'No',
      isPassport: 'No',
      marriageCertificateNumber: '1232323232323232',
      passportNumber: '232223232323',
      passportExpiredDate: "1001-05-10",
      imagePath: 'assets/images/profile/user-2.jpg',
    }
  ]
  dataSource = new MatTableDataSource(this.customersList);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe ,private _snackBar: MatSnackBar ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(NewFileComponent, {
      data: obj,
      width : '45%'
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
  addRowData(row_obj: Customers): void {
    this.customersList.push(
      {
        id: row_obj.id,
        firstName: row_obj.firstName ,
        middleName: row_obj.middleName ,
        lastName: row_obj.lastName ,
        aadharName: row_obj.aadharName ,
        aadharNumber: row_obj.aadharNumber ,
        panNumber: row_obj.panNumber ,
        dateOfBirth:  row_obj.dateOfBirth ,
        mobileNumber: row_obj.mobileNumber ,
        emailId: row_obj.emailId ,
        isGender: row_obj.isGender ,
        isMarriedStatus: row_obj.isMarriedStatus ,
        isPassport: row_obj.isPassport ,
        marriageCertificateNumber: row_obj.marriageCertificateNumber ,
        passportNumber: row_obj.passportNumber ,
        passportExpiredDate: row_obj.passportExpiredDate ,
        imagePath : 'assets/images/profile/user-2.jpg'
      }
    )

    // this.dialog.open(AppAddEmployeeComponent);
    this.openConfigSnackBar('Customer Create Successful !!')
    this.dataSource = new MatTableDataSource(this.customersList);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Customers): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.id === row_obj.id) {
        value.id = row_obj.id
        value.firstName = row_obj.firstName
        value.middleName = row_obj.middleName
        value.lastName = row_obj.lastName
        value.aadharName = row_obj.aadharName
        value.aadharNumber = row_obj.aadharNumber
        value.panNumber = row_obj.panNumber
        value.dateOfBirth =  row_obj.dateOfBirth
        value.mobileNumber = row_obj.mobileNumber
        value.emailId = row_obj.emailId
        value.isGender = row_obj.isGender
        value.isMarriedStatus = row_obj.isMarriedStatus
        value.isPassport = row_obj.isPassport
        value.marriageCertificateNumber = row_obj.marriageCertificateNumber
        value.passportNumber = row_obj.passportNumber
        value.passportExpiredDate = row_obj.passportExpiredDate
        value.imagePath = row_obj.imagePath
      }
    this.openConfigSnackBar('Customer UpDate Successful !!')

      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Customers): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.id !== row_obj.id;
    });
    this.openConfigSnackBar('Customer Delete Successful !!')

  }

  openConfigSnackBar(snackbarTitle :any) {
    this._snackBar.open(snackbarTitle, 'Splash', {
      duration: 2 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
