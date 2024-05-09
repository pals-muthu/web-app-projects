import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SideNavComponent } from './helpers/side-nav/side-nav.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { GeneralState } from './store/general.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatSidenavModule, SideNavComponent, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angularExpenseTracker';

  public isExpanded = false;

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  public loader = false;

  constructor (private store: Store<{ general: GeneralState}>, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.store.select(state => state.general).subscribe((res) => {
      setTimeout(() => {
        this.loader = res.loader;
        this.cdr.detectChanges(); // Manually trigger change detection
      }, 0);
    })
  }

}
