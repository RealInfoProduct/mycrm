import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { LoginService } from 'src/app/shared/services/login.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService, 
    private router: Router , 
    private loginService : LoginService , 
    private authService :AuthService,
    private _snackBar :MatSnackBar) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    const payload = {
      user_name: this.form.value.uname,
      password: this.form.value.password
  }
    this.loginService.employeeLoginUser(payload).subscribe((res:any) => {
      if (res) {
          this.authService.setToken(res.data.token)
          this.openConfigSnackBar(res.message)
          this.router.navigate(['/dashboards/dashboard1']);
      }
    } , (error) => {
      this.openConfigSnackBar(error.error.message)

    })

  }

  openConfigSnackBar(snackbarTitle :any) {
    this._snackBar.open(snackbarTitle, 'Splash', {
      duration: 2 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
