import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:3000/admin';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  addProduct(productData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/product/add`, productData);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/${id}/delete`);
  }

  editProduct(id: string, productData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/product/${id}/edit`, productData);
  }
}
