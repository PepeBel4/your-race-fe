import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { Group } from '../group';
import { GroupService } from '../../group.service';

@Component({
	selector: 'group-new',
	templateUrl: 'group-new.component.html',
  	encapsulation: ViewEncapsulation.None
})

export class GroupNew implements OnInit {
	group = new Group;
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