import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable()
export class UsersService {

  registeredUsers: {name: string, status: string}[] = [
    {name: 'Max',  status: 'active'},
    {name: 'Emily',  status: 'inactive'}
  ]

  constructor(private counterService: CounterService) {}

  toggleStatus (user: {name: string, status: string}) {
    for (let eachUser of this.registeredUsers) {
      if (eachUser.name === user.name) {
        if (eachUser.status === 'active') {
          eachUser.status = 'inactive';
          this.counterService.updateMovedToInactiveCounter();
        } else {
          eachUser.status = 'active';
          this.counterService.updateMovedToActiveCounter();
        }
      }
    }
  }

}
