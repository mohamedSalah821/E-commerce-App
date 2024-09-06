import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../baseUrl/Environment';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  
  constructor(private _HttpClient:HttpClient) { 
  }

  checkOut(cartId:string,userData:any):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${Environment.localUrl}`,
      {
        "shippingAddress":userData
      }

    ) 
  }
}
