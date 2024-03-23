import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { ELEMENT_DATA } from '../../utils/data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-component-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './component-item.component.html',
  styleUrl: './component-item.component.css'
})
export class ComponentItemComponent implements OnInit, OnDestroy {
  position: Number;
  name: String;
  weight: Number;
  symbol: String;

  paramsSubscription: Subscription = new Subscription();

  constructor (private route: ActivatedRoute, private router: Router) {
    this.position = 0;
    this.name = '';
    this.weight = 0;
    this.symbol = '';
  }

  loadUserDetail (id: string) {
    const currentItem = ELEMENT_DATA.find((item) => item.position.toString() === id);
    console.log('currentItem: ', currentItem);
    this.position = currentItem?.position || 0;
    this.name = currentItem?.name || '';
    this.weight = currentItem?.weight || 0;
    this.symbol = currentItem?.symbol || '';
  }

  ngOnInit(): void {
    console.log('on init: ', this.route.snapshot.params);
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {  this.loadUserDetail(params['id'])});
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  getPreviousPositions () : string  {
    if (this.position === 1) {
      return (ELEMENT_DATA.length - 1).toString();
    }
    return (Number(this.position) - 1).toString();
  }

  getNextPostition () : string {
    if (this.position === (ELEMENT_DATA.length - 1)) {
      return '1';
    }
    return (Number(this.position) + 1).toString();
  }

  goNext () {
    this.router.navigate(['item', this.getNextPostition()]);
  }


}
