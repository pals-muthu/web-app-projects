import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../../services/logging.service';
import { ELEMENT_DATA } from '../../utils/data';
import { ComponentListComponent } from '../component-list/component-list.component';

@Component({
  selector: 'app-component-items',
  standalone: true,
  imports: [ComponentListComponent],
  templateUrl: './component-items.component.html',
  styleUrl: './component-items.component.css'
})
export class ComponentItemsComponent implements OnInit {
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
