import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../baseUrl/Environment';
import { loginData, UserData } from '../../interfaces/user-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    userData:BehaviorSubject<any>=new BehaviorSubject(null)

  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    if(typeof localStorage !== 'undefined'){
      if(localStorage.getItem('userToken') !== null){
        this.decodeUserData()
        this._Router.navigate([localStorage.getItem('currentPage')])

      }

    }
   }

  sendRrgister(userData:UserData):Observable<any>{
    return this._HttpClient.post<any>(`${Environment.baseUrl}/api/v1/auth/signup`,userData)
  }

  sendLogin(userData:loginData):Observable<any>{
    return this._HttpClient.post<any>(`${Environment.baseUrl}/api/v1/auth/signin`,userData)
  }

  sendEmailApi(email:string):Observable<any>{

    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/forgotPasswords`,email)
  }
  
  sendcodeApi(code:string):Observable<any>{

    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/verifyResetCode`,code)
  }

  resetDataApi(userData:any):Observable<any>{

    return this._HttpClient.put(`${Environment.baseUrl}/api/v1/auth/resetPassword`,userData)
  }

  decodeUserData(){


    if( localStorage.getItem('userToken') !== null)
    {
      //store token
    let token:any=localStorage.getItem('userToken')

    //decode
    this.userData.next(jwtDecode(JSON.stringify(token)));

    }
    
    
  }
}
