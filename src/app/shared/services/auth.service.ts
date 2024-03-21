import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token = '11'

  constructor() { }

  isAuthorised(){
    return Boolean(localStorage.getItem('Authorization'))
  }

  setToken(Authorization: any) {
    localStorage.setItem('Authorization', Authorization);
  }
  
}
