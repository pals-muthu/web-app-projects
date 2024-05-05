import { PeriodicElement } from "../utils/types";
import { ELEMENT_DATA } from "../utils/data";
import { Observable } from "rxjs";
import { ResolveFn } from "@angular/router";

export const baseData: ResolveFn<PeriodicElement[]> = () => {
  return ELEMENT_DATA;
}
