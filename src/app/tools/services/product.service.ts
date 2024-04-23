import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://econimic-pricing.onrender.com/api/v1/product/list';

  constructor(private http: HttpClient) { }

  getProductList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
