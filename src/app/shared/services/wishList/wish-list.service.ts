import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../../baseUrl/Environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  wishNum:BehaviorSubject<number>=new BehaviorSubject(0)


  constructor(private _HttpClient:HttpClient) { }

  addProductToWishList(pId:string):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": pId
      }
    )
  }


  removeProductFromWishList(pId:string):Observable<any>
  {
    return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/wishlist/${pId}`)
  }

  getWishList():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/wishlist`)
  }


}
