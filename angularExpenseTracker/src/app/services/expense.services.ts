import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface ExpenseType {
  amount: Number,
  description: String,
  type: String
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseURL = 'http://localhost:4110'

  constructor (private http: HttpClient) {

  }

  getExpenses () {
    return this.http.get(this.baseURL, {
      headers: { 'Content-Type': 'application/json'},
      params: new HttpParams().set('schema', 'expense'),
    })
  }

  createExpenses (body: ExpenseType) {
    return this.http.post(this.baseURL, body, {
      headers: { 'Content-Type': 'application/json'},
      params: new HttpParams().set('schema', 'expense'),
    });
  }

}
