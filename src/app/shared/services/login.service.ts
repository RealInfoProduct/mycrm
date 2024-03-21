import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Apiconstants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService : ApiService) { }

  employeeLoginUser(payload :any){
    return this.apiService.post(Apiconstants.employeeLogin , payload)
  }
}
