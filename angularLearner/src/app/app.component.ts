import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentListComponent } from './base/component-list/component-list.component';
import { LoggingService } from './services/logging.service';
import { ELEMENT_DATA } from './utils/data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularLearner';
}


// child routes
// next, previous pages - programmatically and via links
