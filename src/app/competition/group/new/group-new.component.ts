import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { Competition } from '../competition';
import { CompetitionService } from '../../competition.service';

@Component({
	selector: 'competition-new',
	templateUrl: 'competition-new.component.html',
  	encapsulation: ViewEncapsulation.None
})

export class CompetitionNew implements OnInit {
	competition = new Competition;
	submitted: boolean = false;
	profile: any;

	constructor(
		private _location: Location
	) {}

	backClicked() {
		console.log('back clicked..');
        this._location.back();
    }

	ngOnInit() {}
}