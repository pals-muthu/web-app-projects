import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Observable, Observer, Subscription, map } from 'rxjs';
import { PeriodicElement } from '../../utils/types';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../../utils/shorten.pipe';

@Component({
  selector: 'app-component-item',
  standalone: true,
  imports: [RouterModule, CommonModule, ShortenPipe],
  templateUrl: './component-item.component.html',
  styleUrl: './component-item.component.css'
})
export class ComponentItemComponent implements OnInit, OnDestroy {
  position: Number;
  name: String;
  weight: Number;
  symbol: String;
  ELEMENT_DATA: PeriodicElement[] = [];

  paramsSubscription: Subscription = new Subscription();
  countSubscription: Subscription = new Subscription();
  newCountSubscription: Subscription = new Subscription();
  show: boolean = true;

  constructor (private route: ActivatedRoute, private router: Router) {
    this.position = 0;
    this.name = '';
    this.weight = 0;
    this.symbol = '';
  }

  loadUserDetail (id: string) {
    this.route.data.subscribe(({ baseData }) => {
      console.log('on init data: ', baseData)
      this.ELEMENT_DATA = baseData;
    });
    const currentItem = this.ELEMENT_DATA.find((item) => item.position.toString() === id);
    console.log('currentItem: ', currentItem);
    this.position = currentItem?.position || 0;
    this.name = currentItem?.name || '';
    this.weight = currentItem?.weight || 0;
    this.symbol = currentItem?.symbol || '';

    // discarding old one
    if (this.countSubscription) {
      this.countSubscription.unsubscribe();
      this.newCountSubscription.unsubscribe();
    }

    // create an observable
    const countObservable = new Observable<number>((observer) => {
      let count: number = 0;
      setInterval(() => {
        if (count > 5) {
          observer.complete();
        }
        count++;
        observer.next(count);
      }, 1500);
    });

    this.countSubscription = countObservable.subscribe((data) => {
      console.log('count data: ', data);
      if (data % 2 === 0) {
        this.show = true;
      } else {
        this.show = false;
      }
    })

    const newCustomObservable = countObservable.pipe(map((data:number) => {
      return 'Round: ' + (data + 1)
    }));

    this.newCountSubscription = newCustomObservable.subscribe((data) => {
      console.log('new count data: ', data);
    })

  }

  ngOnInit(): void {
    console.log('on init: ', this.route.snapshot.params);
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {  this.loadUserDetail(params['id'])});
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.countSubscription.unsubscribe();
    this.newCountSubscription.unsubscribe();
  }

  getPreviousPositions () : string  {
    if (this.position === 1) {
      return (this.ELEMENT_DATA.length - 1).toString();
    }
    return (Number(this.position) - 1).toString();
  }

  getNextPostition () : string {
    if (this.position === (this.ELEMENT_DATA.length - 1)) {
      return '1';
    }
    return (Number(this.position) + 1).toString();
  }

  goNext () {
    this.router.navigate(['item', this.getNextPostition()]);
  }


}
