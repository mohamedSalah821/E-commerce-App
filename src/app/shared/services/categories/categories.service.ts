import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../baseUrl/Environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllCategories():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/categories`)
  }

  getSubCat(subId:string):Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/categories/${subId}/subcategories`)
  }

  getSpecificSubCategory(subSpecSubId:string):Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/subcategories/${subSpecSubId}`)
  }
}
