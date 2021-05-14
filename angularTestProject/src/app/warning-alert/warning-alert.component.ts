import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
  styleUrls: ['./warning-alert.component.css']
})
export class WarningAlertComponent implements OnInit {

  // warningColor = 'none';
  // font = 'normal';
  warningColor = 'lightpink'
  font = 'italic'

  allowNewWarnings = false;
  constructor() {
    setTimeout(() => {
      this.allowNewWarnings = true;
    }, 2000);
  }

  ngOnInit(): void {
  }

  enableWarning() {

    this.warningColor = '#FFFBD6';
    this.font = 'normal';
    // this.warningColor = 'lightpink'
    // this.font = 'italic'
  }

  getColor() {
    return this.warningColor;
  }

  getFont() {
    return this.font
  }

}
