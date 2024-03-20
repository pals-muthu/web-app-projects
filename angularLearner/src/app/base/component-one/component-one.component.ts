import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ContentChild, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LearnerObject, PeriodicElement } from '../../utils/types';

@Component({
  selector: 'app-component-one',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './component-one.component.html',
  styleUrl: './component-one.component.css'
})
export class ComponentOneComponent implements OnChanges, AfterViewInit, AfterContentInit {

  @Input('elementData') ELEMENT_DATA: PeriodicElement[] = [];
  @Output() counterUpdated = new EventEmitter<Number>();
  
  @ViewChild('refOne') refOne: any;
  @ContentChild('refBase') refBase: any;

  incomingObject: LearnerObject = {
    arr: [],
  };

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
    console.log('loader values ngAfterViewInit: ', this.refOne, this.refBase)
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log('loader values ngAfterContentInit: ', this.refOne, this.refBase)
  }

  counterName: number = 0;

  handleClickEvent (event: Event) {
    console.log('event target: ', event.target);
  }

  handleChangeEvent (event: Event) {
    const value = Number.parseInt((event.target as HTMLInputElement).value);
    console.log('event target: ', value);
    this.counterUpdated.emit(value);
  }

}
