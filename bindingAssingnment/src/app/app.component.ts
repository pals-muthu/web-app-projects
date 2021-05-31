import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'bindingAssingnment';
  counterEmitted = false;
  counter = 0;
  gameValues: Array<number> = [];

  addOddOrEven(counterVal) {
    console.log("counterVal", counterVal);
    this.counterEmitted = true;
    this.counter = counterVal
  }

  ngOnInit() {

  }

  ngDoCheck() {
    console.log("do check, ", this.counterEmitted);
    if (!this.counterEmitted && this.counter > 0) {
      console.log("Hitpoint");
      this.gameValues.push(this.counter);
      this.counterEmitted= true;
    } else {
    this.counterEmitted= false;
    }
  }

}
