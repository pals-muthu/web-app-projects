import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';

import { UsersService } from './users.service';
import { CounterService } from './counter.service'

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [UsersService, CounterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
