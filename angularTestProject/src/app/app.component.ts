import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularTestProject';
  username = '';
  isUsernameEmpty = true;

  clearUsername() {
    this.username = '';
    this.isUsernameEmpty = true;
  }

  checkUsernameIsEmpty() {
    this.isUsernameEmpty = false;
    if (this.username == '') {
      this.isUsernameEmpty = true;
    }
    console.log(this.isUsernameEmpty);

  }
}
