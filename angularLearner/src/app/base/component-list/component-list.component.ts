import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ContentChild, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LearnerObject, PeriodicElement } from '../../utils/types';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'app-component-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './component-list.component.html',
  styleUrl: './component-list.component.css'
})
export class ComponentListComponent implements OnChanges, AfterViewInit, AfterContentInit {

  @Input('elementData') ELEMENT_DATA: PeriodicElement[] = [];
  @Output() counterUpdated = new EventEmitter<Number>();

  @ViewChild('refList') refList: any;
  @ContentChild('refBase') refBase: any;

  incomingObject: LearnerObject = {
    arr: [],
  };

  counterValue: Number = 0;

  loggingService: LoggingService;

  constructor (loggingService: LoggingService) {
    this.loggingService = loggingService
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['ELEMENT_DATA']) {
      this.incomingObject.arr = this.ELEMENT_DATA;
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log('loader values ngAfterViewInit: ', this.refList, this.refBase)
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log('loader values ngAfterContentInit: ', this.refList, this.refBase)
  }

  setCounter (value: Number) {
    this.counterValue = value;
    this.loggingService.globalCounter = value;
    this.loggingService.globalCounterEmitter.emit(value);
    this.counterUpdated.emit(value);
  }

  handleClickEvent (event: Event) {
    this.loggingService.logInfo(`click event: ${(event.target as HTMLButtonElement)?.textContent}`);
    this.setCounter(0);
  }

  handleChangeEvent (event: Event) {
    const value = Number.parseInt((event.target as HTMLInputElement).value);
    this.loggingService.logInfo(`counter value: ${value}`);
    this.setCounter(value);
  }

}
