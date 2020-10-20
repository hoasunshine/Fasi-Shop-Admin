import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/model/category';
import { DataProducts } from 'src/model/dataProducts';
import { Product } from 'src/model/product';

@Injectable({
  providedIn: 'root'
})
export class InsideService {

  private accountUrl = 'http://localhost:8080/accounts';
  private categoryUrl = 'http://localhost:8080/categories';
  private productUrl = 'http://localhost:8080/products';
  private orderUrl = 'http://localhost:8080/order';
  private productAmountUrl = 'http://localhost:8080/warehouse';
  private productImageListUrl = 'http://localhost:8080/products/listImage';
  private hotProductUrl = 'http://localhost:8080/hotProducts';
  private blogUrl = 'http://localhost:8080/blog';

  constructor(private http: HttpClient) { }

  // Account
  getAccountData() {
    return this.http.get(this.accountUrl);
  }

  getAccountDetail(id) {
    return this.http.get(`${this.accountUrl}/${id}`);
  }

  deactiveAccount(id) {
    return this.http.delete(`${this.accountUrl}/${id}`);
  }

  // Category
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

  //Product
  getProductData() {
    return this.http.get(this.productUrl);
  }

  getProductAmountByProductId(id) {
    return this.http.get(`${this.productAmountUrl}/${id}`);
  }

  getProductImageListByProductId(id) {
    return this.http.get(`${this.productImageListUrl}/${id}`);
  }

  addProduct(data: DataProducts) {
    const obj = JSON.stringify(data);
    return this.http.post(this.productUrl, obj, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  getDetailProduct(id) {
    return this.http.get(`${this.productUrl}/${id}`);
  }

  updateProduct(data: DataProducts, id: string) {
    const obj = JSON.stringify(data);
    return this.http.put(`${this.productUrl}/${id}`, obj, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  deleteProduct(id) {
    return this.http.delete(`${this.productUrl}/${id}`);
  }

  //Transaction

  getAllTransaction() {
    return this.http.get(this.orderUrl);
  }

  getTransactionDetail(id) {
    return this.http.get(`${this.orderUrl}/${id}`);
  }

  changeStatus(path, id) {
    return this.http.delete(`${this.orderUrl}/${path}/${id}`);
  }

  // hot product

  getHotProducts() {
    return this.http.get(this.hotProductUrl);
  }

  createHotProduct(data) {
    const obj = JSON.stringify(data);
    return this.http.post(this.hotProductUrl, obj, {
      headers: {'Content-Type': 'application/json'}
    })
  }

  activeHotProduct(id) {
    return this.http.put(`${this.hotProductUrl}/${id}`, {
      headers: {'Content-Type': 'application/json'}
    })
  }

  deactiveHotProduct(id) {
    return this.http.delete(`${this.hotProductUrl}/${id}`);
  }

  // blog

  getBlogDatas() {
    return this.http.get(`${this.blogUrl}/getAll`);
  }

  getBlogDetail(id) {
    return this.http.get(`${this.blogUrl}/${id}`);
  }

  createBlog(data) {
    const obj = JSON.stringify(data);
    return this.http.post(this.blogUrl, obj, {
      headers: {'Content-Type': 'application/json'}
    })
  }

  updateBlog(data, id) {
    const obj = JSON.stringify(data);
    return this.http.put(`${this.blogUrl}/${id}`, obj, {
      headers: {'Content-Type': 'application/json'}
    });
  }

}
