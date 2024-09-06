import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../baseUrl/Environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private _HttpClient:HttpClient) { }

  getproducts():Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/products`)
  }
  getSomeproducts():Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/products?limit=12`)
  }

  getSpeProudct(productId:string):Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/products/${productId} `)
  }
}
