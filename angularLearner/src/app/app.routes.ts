import { Routes } from '@angular/router';
import { ComponentItemsComponent } from './base/component-items/component-items.component';
import { ComponentItemComponent } from './base/component-item/component-item.component';
import { SampleGuard } from './services/sample-guard.service';
import { baseData } from './services/resolve-data.service';
import { ReactiveFormComponent } from './base/reactive-form/reactive-form.component';

export const routes: Routes = [
  { path: '', component: ComponentItemsComponent, canActivate: [SampleGuard], resolve: { baseData }},
  { path: 'item/:id', component: ComponentItemComponent, canActivate: [SampleGuard], resolve: { baseData }},
  { path: 'new-user', component: ReactiveFormComponent }

];
