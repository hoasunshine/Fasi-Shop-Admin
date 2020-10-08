import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/model/category';
import { Product } from 'src/model/product';

@Injectable({
  providedIn: 'root'
})
export class InsideService {

  private categoryUrl = 'http://localhost:8080/categories';
  private productUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  getCategoryData() {
    return this.http.get(this.categoryUrl);
  }

  addCategory(category: Category) {
    const obj = JSON.stringify(category);
    return this.http.post(this.categoryUrl, obj, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  getDetailCategory(id) {
    return this.http.get(`${this.categoryUrl}/${id}`)
  }

  updateCategory(category: Category, id: string) {
    const obj = JSON.stringify(category);
    return this.http.put(`${this.categoryUrl}/${id}`, obj, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteCategory(id) {
    return this.http.delete(`${this.categoryUrl}/${id}`);
  }

  getProductData() {
    return this.http.get(this.productUrl);
  }

  addProduct(product: Product) {
    const obj = JSON.stringify(product);
    return this.http.post(this.productUrl, obj, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  deleteProduct(id) {
    return this.http.delete(`${this.productUrl}/${id}`);
  }
}
