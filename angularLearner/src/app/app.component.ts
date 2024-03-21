import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentOneComponent } from './base/component-one/component-one.component';
import { PeriodicElement } from './utils/types';
import { LoggingService } from './services/logging.service';


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComponentOneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angularLearner';
  ELEMENT_DATA = ELEMENT_DATA;
  counterValue: Number = 0;
  subscribeCounterValue: Number = 0;

  loggingService: LoggingService;

  constructor (loggingService: LoggingService) {
    this.loggingService = loggingService
  }

  ngOnInit(): void {
    this.loggingService.globalCounterEmitter.subscribe((value) => {
      this.subscribeCounterValue = value;
    })
  }

  updateGlobalCounter(event: Number) {
    this.counterValue = event;
  }

}
