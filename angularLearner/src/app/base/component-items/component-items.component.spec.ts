import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentItemsComponent } from './component-items.component';

describe('ComponentItemsComponent', () => {
  let component: ComponentItemsComponent;
  let fixture: ComponentFixture<ComponentItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
