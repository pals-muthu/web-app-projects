import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable()
export class UsersService {

  registeredUsers: {name: string, status: string}[] = [
    {name: 'Max',  status: 'active'},
    {name: 'Emily',  status: 'inactive'}
  ]

  constructor(private counterService: CounterService) {}

  toggleStatus (useriD: number) {
    let currentUser = this.registeredUsers[useriD]
    if (currentUser.status === 'active') {
      currentUser.status = 'inactive';
      this.counterService.updateMovedToInactiveCounter();
    } else {
      currentUser.status = 'active';
      this.counterService.updateMovedToActiveCounter();
    }
  }
}
