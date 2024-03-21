import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Apiconstants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private apiService : ApiService) { }

  createCustomer(payload :any){
    return this.apiService.post(Apiconstants.customerRegister , payload)
  }

  createGeneralImageUpload(payload :any){
    return this.apiService.post(Apiconstants.generalImageUpload , payload)
  }

  manageCustomer(payload :any){
    return this.apiService.post(Apiconstants.manageCustomer , payload)
  }

  imageUpload(upload_link:any , payload :any){
    return this.apiService.axiosPut(upload_link , payload  )
  }
}
