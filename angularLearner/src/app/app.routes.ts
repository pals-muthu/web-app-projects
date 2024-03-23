import { Routes } from '@angular/router';
import { ComponentItemsComponent } from './base/component-items/component-items.component';
import { ComponentItemComponent } from './base/component-item/component-item.component';

export const routes: Routes = [
  { path: '', component: ComponentItemsComponent },
  { path: 'item/:id', component: ComponentItemComponent}

];
