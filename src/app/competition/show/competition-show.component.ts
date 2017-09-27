import { Component,OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Competition } from '../competition';
import { CompetitionService } from '../competition.service';

@Component({
	selector: 'competition-show',
	templateUrl: 'competition-show.component.html',
  	encapsulation: ViewEncapsulation.None
})

export class CompetitionShow implements OnInit {
	id: number;
	routeId: any;

	constructor(
		private http: Http,
		private route: ActivatedRoute,
		private competitionService: CompetitionService
	 ) {}

	@Input()
	competition: Competition;

	ngOnInit(): void {

		let competitionRequest = this.route.params	
			.flatMap((params: Params) =>
				this.competitionService.getCompetition(+params['id']));
		competitionRequest.subscribe(response => {
			this.competition = response.json();
			this.competitionService.setSelectedCompetition(this.competition);
		})
	}
}