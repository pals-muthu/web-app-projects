import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LearnerObject, PeriodicElement } from '../../utils/types';

@Component({
  selector: 'app-component-one',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './component-one.component.html',
  styleUrl: './component-one.component.css'
})
export class ComponentOneComponent {

  @Input('elementData') ELEMENT_DATA: PeriodicElement[] = [];
  @Output() counterUpdated = new EventEmitter<Number>();

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
