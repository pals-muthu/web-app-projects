import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { RecipeItem } from "../utils/types";

@Injectable()
export class RecipeService {

  baseUrl = 'http://localhost:4110';

  constructor (private http: HttpClient) {

  }

  getRecipes (): Observable<RecipeItem[]> {
    return this.http.get<RecipeItem[]>(this.baseUrl, {
      observe: "body"
    }).pipe(map(data => {
      if (data['status'] === 'success' && Object.keys(data['data'] || {}).length) {
        return Object.values(data['data']);
      }
      return data;
     }));
  }

  createRecipe (data: any) {
    return this.http.post(this.baseUrl, data, {
      observe: "body"
    });
  }

  getRecipe (id: string) {
    return this.http.get(this.baseUrl, {
      observe: "body",
      params: new HttpParams({ fromObject: { id } })
    });
  }

}
