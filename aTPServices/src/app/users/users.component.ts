import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Input() user: {name: string, status: string};
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  updateUserStatus() {
    this.userService.toggleStatus(this.user);
  }

}
