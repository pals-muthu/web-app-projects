import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  counter: number = 0;
  // toEmit = false;
  intervalRef = null;
  @Output() emitCounter = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  sendCounter = () => {
    this.counter++;
    this.emitCounter.emit(this.counter);
    // this.runInterval();
  }

  // runInterval(){
  //   if (!this.toEmit) {
  //     return;
  //   }
  //   setTimeout(this.sendCounter, 1000);
  // }

  startGame() {
    console.log("started game successfully");
    // this.toEmit = true;
    // this.runInterval();
    this.intervalRef = setInterval(this.sendCounter, 1000);
  }

  stopGame() {
    console.log("stopped game successfully");
    // this.toEmit = false;
    clearInterval(this.intervalRef);
    this.counter = 0;
  }

}
