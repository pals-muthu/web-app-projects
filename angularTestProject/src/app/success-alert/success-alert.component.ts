import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-success-alert',
    templateUrl: './success-alert.component.html',
    styleUrls: ['./success-alert.component.css']
})
export class SuccessAlertComponent implements OnInit {

    successMsg = 'Success! logged in';
    successIndex: number = 0;
    successDisplayMsg: string = 'Success not triggered';

    getSuccessIndex() {
        return this.successIndex;
    }

    updateSuccessMsg(event) {
        console.log("--> event: ", event);
        console.log("--> event: ", event.srcElement.parentElement);
        this.successIndex += 1;
        this.successDisplayMsg = `success trigerred ${this.successIndex} times.`;
    }

    updateSuccessMsg1(event: Event) {
        // console.log("--> event: ", event);
        console.log("--> event: ", (<HTMLInputElement>event.target));
        this.successIndex += 1;
        this.successDisplayMsg = `success trigerred ${this.successIndex} times.`;
    }

    constructor() { }

    ngOnInit(): void {
    }

}
