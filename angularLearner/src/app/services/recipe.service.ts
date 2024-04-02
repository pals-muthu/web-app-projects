import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class RecipeService {

  baseUrl = 'http://localhost:4110';

  constructor (private http: HttpClient) {

  }

  getRecipes () {
    return this.http.get(this.baseUrl, {
      observe: "body"
    });
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
