import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../Models/Products';
import configurl from '../../assets/config/config.json'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = configurl.apiServer.url + '/api/product/';  
  constructor(private http: HttpClient) { }
  getProductList(token:any): Observable<Products[]> {
    const httpHeaders = { 
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        'Authorization': 'Bearer '+ token,
      })};
    console.log(token);
    return this.http.get<Products[]>(this.url + 'ProductsList',httpHeaders);
  }
  postProductData(productData: Products,token:any): Observable<Products> {
    const httpHeaders = { 
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        'Authorization': 'Bearer '+ token,
      })};
    return this.http.post<Products>(this.url + 'CreateProduct', productData, httpHeaders);
  }
  updateProduct(product: Products,token:any): Observable<Products> {
    const httpHeaders = { 
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'PUT',
        'Authorization': 'Bearer '+ token,
      })};    return this.http.put<Products>(this.url + 'UpdateProduct?id=' + product.productId, product, httpHeaders);
  }
  deleteProductById(id: number,token:any): Observable<number> {
    const httpHeaders = { 
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'DELETE',
        'Authorization': 'Bearer '+ token,
      })};
    return this.http.delete<number>(this.url + 'DeleteProduct?id=' + id, httpHeaders);
  }
  getProductDetailsById(id: string,token:any): Observable<Products> {
    const httpHeaders = { 
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        'Authorization': 'Bearer '+ token,
      })};
    return this.http.get<Products>(this.url + 'ProductDetail?id=' + id,httpHeaders);
  }
}
