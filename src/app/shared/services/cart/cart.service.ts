import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { Environment } from '../../../baseUrl/Environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
 

  constructor(private _HttpClient:HttpClient) { 
    
  }

  

  
  cartNum:BehaviorSubject<number>=new BehaviorSubject(0)

  addProductToCart(productId:string):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/cart`,
      {
        "productId":productId
      }
      
    )
  }

  updateCart(productId:string,pCount:string):Observable<any>
  {
    return this._HttpClient.put(`${Environment.baseUrl}/api/v1/cart/${productId}`,
      {
        "count":pCount
      }
    )
  }

  getCart():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/cart`
      
    )
  }

  removeSpecItem(productId:string):Observable<any>
  {
    return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/cart/${productId}`
    )
  }

  clearCart():Observable<any>
  {
    return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/cart`
      
    )
  }

}
