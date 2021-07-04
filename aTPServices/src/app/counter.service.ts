import { Injectable } from "@angular/core";

@Injectable()
export class CounterService {

  movedToActiveCounter: number = 0;
  movedToInactiveCounter: number = 0;
  constructor() {}

  updateMovedToActiveCounter() {
    this.movedToActiveCounter++;
  }

  updateMovedToInactiveCounter() {
    this.movedToInactiveCounter++;
  }
}
