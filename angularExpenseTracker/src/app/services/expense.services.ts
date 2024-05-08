import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

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

  getExpenses (): Observable<ExpenseType[]> {
    console.log('hitting get expenses')
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

  createExpenses (body: ExpenseType) {
    // const res = this.getExpenses();
    // res.subscribe((response) => {
    //   console.log('response: ', response);
    // })

    return this.http.post(this.baseURL, body, {
      headers: { 'Content-Type': 'application/json'},
      params: new HttpParams().set('schema', 'expense'),
    });
  }

}
