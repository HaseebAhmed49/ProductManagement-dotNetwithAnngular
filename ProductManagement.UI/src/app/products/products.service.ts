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
  updateProduct(product: Products): Observable<Products> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Products>(this.url + 'UpdateProduct?id=' + product.productId, product, httpHeaders);
  }
  deleteProductById(id: number): Observable<number> {
    return this.http.post<number>(this.url + 'DeleteProduct?id=' + id, null);
  }
  getProductDetailsById(id: string): Observable<Products> {
    return this.http.get<Products>(this.url + 'ProductDetail?id=' + id);
  }
}
