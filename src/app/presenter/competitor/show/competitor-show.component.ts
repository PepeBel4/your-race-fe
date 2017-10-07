import { Component,OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Competitor } from '../../../competitor/competitor';
import { CompetitorService } from '../../../competitor/competitor.service';

@Component({
	selector: 'competitor-show',
	templateUrl: 'competitor-show.component.html',
  	encapsulation: ViewEncapsulation.None,
  	styleUrls: ['./profile.style.scss']
})

export class CompetitorShow implements OnInit {
	id: number;
	routeId: any;

	constructor(
		private http: Http,
		private route: ActivatedRoute,
		private competitorService: CompetitorService
	 ) {}

	@Input()
	competitor: Competitor;

	ngOnInit(): void {
		let competitionRequest = this.route.params	
			.flatMap((params: Params) =>
				this.competitorService.getCompetitor(+params['competition_id'],+params['group_id'],+params['id']));
		competitionRequest.subscribe(response => {
			this.competitor = response.json()
			})
	}
}