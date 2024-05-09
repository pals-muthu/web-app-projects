import { CommonModule } from "@angular/common";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { config } from '../../utils/config';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'side-nav',
  standalone: true,
  imports: [MatIconModule, MatListModule, CommonModule, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  @Input() isExpanded: boolean;
  @Output() toggleMenu = new EventEmitter();

  public routeLinks = Object.values(config.CONSTANTS.ROUTES);
}
