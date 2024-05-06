import { Component, Input, Output, EventEmitter } from "@angular/core";
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'side-nav',
  standalone: true,
  imports: [MatIconModule, MatListModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  @Input() isExpanded: boolean;
  @Output() toggleMenu = new EventEmitter();

  public routeLinks = [
    { link: "about", name: "About", icon: "dashboard" },
    { link: "locations", name: "Locations", icon: "account_balance" },
  ];
}
