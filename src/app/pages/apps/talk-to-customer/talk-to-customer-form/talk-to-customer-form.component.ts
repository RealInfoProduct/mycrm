import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/pages/ui-components/dialog/dialog.component';

@Component({
  selector: 'app-talk-to-customer-form',
  templateUrl: './talk-to-customer-form.component.html',
  styleUrls: ['./talk-to-customer-form.component.scss']
})
export class TalkToCustomerFormComponent {

  constructor(public dialogRef: MatDialogRef<TalkToCustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,){}



    onNoClick(): void {
      this.dialogRef.close({ event: 'action', data: 'data' });
    }
}
