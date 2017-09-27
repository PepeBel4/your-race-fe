import { Component,OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Fleet } from '../fleet';
import { FleetService } from '../fleet.service';

@Component({
	selector: 'fleet-show',
	templateUrl: 'fleet-show.component.html',
  	encapsulation: ViewEncapsulation.None
})

export class FleetShow implements OnInit {
	id: number;
	routeId: any;

	constructor(
		private http: Http,
		private route: ActivatedRoute,
		private fleetService: FleetService
	 ) {}

	@Input()
	fleet: Fleet;

	ngOnInit(): void {
		let competitionRequest = this.route.params	
			.flatMap((params: Params) =>
				this.fleetService.getFleet(+params['competition_id'],+params['group_id'],+params['id']));
		competitionRequest.subscribe(response => {
			console.log(response.json());
			this.fleet = response.json()
			})
	}
}