import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeReduxComponent } from './recipe-redux.component';

describe('RecipeReduxComponent', () => {
  let component: RecipeReduxComponent;
  let fixture: ComponentFixture<RecipeReduxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeReduxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeReduxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
