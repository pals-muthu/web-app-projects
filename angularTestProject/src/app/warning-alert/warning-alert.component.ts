import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
  styleUrls: ['./warning-alert.component.css']
})
export class WarningAlertComponent implements OnInit {

  allowNewWarnings = true;
  constructor() {
    setTimeout(() => {
      this.allowNewWarnings = false;
    }, 2000);
  }

  ngOnInit(): void {
  }

}
