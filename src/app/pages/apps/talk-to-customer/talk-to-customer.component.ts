import { Component, ElementRef, ViewChild } from '@angular/core';
import { messages } from './talk-to-customer-data';
import { MatDialog } from '@angular/material/dialog';
import { TalkToCustomerFormComponent } from './talk-to-customer-form/talk-to-customer-form.component';

@Component({
  selector: 'app-talk-to-customer',
  templateUrl: './talk-to-customer.component.html',
  styleUrls: ['./talk-to-customer.component.scss']
})
export class TalkToCustomerComponent {
  sidePanelOpened = true;
  msg = '';

  // MESSAGE
  selectedMessage: any;

  public messages: Array<any> = messages;
  // tslint:disable-next-line - Disables all
  // messages: Object[] = messages;

  constructor(public dialog: MatDialog) {
    this.selectedMessage = this.messages[0];
  }

  @ViewChild('myInput', { static: true }) myInput: ElementRef =
    Object.create(null);

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  // tslint:disable-next-line - Disables all
  onSelect(message: Object[]): void {
    this.selectedMessage = message;
  }

  OnAddMsg(): void {
    this.msg = this.myInput.nativeElement.value;

    if (this.msg !== '') {
      this.selectedMessage.chat.push({
        type: 'even',
        msg: this.msg,
        date: new Date(),
      });
    }

    this.myInput.nativeElement.value = '';
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(TalkToCustomerFormComponent, {
      data: {},
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
