import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  // @HostListener('click') clickDropDown(eventData: Event) {
  //   this.isOpen = !this.isOpen;
  // }

  // @HostListener('focusout') unSelectDropDown(eventData: Event) {
  //   this.isOpen = false;
  // }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
}
