import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

export interface ExpenseType {
  amount: Number,
  description: String,
  type: String
  id: String
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseURL = 'http://localhost:4110'

  constructor (private http: HttpClient) {

  }

  getExpenses (): Observable<ExpenseType[]> {
    return this.http.get<ExpenseType[]>(this.baseURL, {
      headers: { 'Content-Type': 'application/json'},
      params: new HttpParams().set('schema', 'expense'),
    }).pipe(
      map(res => {
        if (res['status'] === 'success' && res['data']) {
          return Object.values(res['data'] || {});
        }
        return res;
      })
    )
  }

  getExpense (id: String): Observable<ExpenseType> {
    return this.http.get<ExpenseType>(this.baseURL + `/${id}`, {
      headers: { 'Content-Type': 'application/json'},
      params: new HttpParams().set('schema', 'expense'),
    }).pipe(
      map(res => {
        if (res['status'] === 'success' && res['data']) {
          return res['data'];
        }
        return res;
      })
    )
  }

  createExpenses (body: ExpenseType): Observable<ExpenseType> {
    return this.http.post<ExpenseType>(this.baseURL, body, {
      headers: { 'Content-Type': 'application/json'},
      params: new HttpParams().set('schema', 'expense'),
    }).pipe(
      map(res => {
        if (res['status'] === 'success' && res['data']) {
          return res['data'];
        }
        return res;
      })
    )
  }

  editExpense (id: String, body: ExpenseType): Observable<ExpenseType> {
    return this.http.put<ExpenseType>(this.baseURL + `/${id}`, body, {
      headers: { 'Content-Type': 'application/json'},
      params: new HttpParams().set('schema', 'expense'),
    }).pipe(
      map(res => {
        if (res['status'] === 'success' && res['data']) {
          return res['data'];
        }
        return res;
      })
    )
  }

  deleteExpense (id: String): Observable<ExpenseType> {
    return this.http.delete<ExpenseType>(this.baseURL + `/${id}`, {
      params: new HttpParams().set('schema', 'expense'),
    }).pipe(
      map(res => {
        if (res['status'] === 'success' && res['data']) {
          return res['data'];
        }
        return res;
      })
    )
  }

}
