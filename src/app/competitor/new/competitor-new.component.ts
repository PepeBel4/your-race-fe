import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { Competitor } from '../competitor';
import { CompetitorService } from '../competitor.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Params } from '@angular/router';

declare let Messenger: any;

@Component({
	selector: 'competitor-new',
	encapsulation: ViewEncapsulation.None,
	templateUrl: 'competitor-new.component.html',
	styleUrls: ['./notifications.style.scss']
})

export class CompetitorNew implements OnInit {
	competitor: Competitor
	submitted: boolean = false;
	profile: any;

	constructor(
		private competitorService: CompetitorService,
		public auth: AuthService,
		private route: ActivatedRoute,
		private _location: Location
	) {
 		this.competitor = new Competitor();

	}

	backClicked() {
		this._location.back();
    }

	ngOnInit() {
      if (this.auth.userProfile) {
      	this.profile = this.auth.userProfile;
      } else {
      	this.auth.getProfile((err, profile) => {
        	this.profile = profile;
      	});
      }
  	}

	createCompetitor(competitor) {
		console.log(competitor);
		this.submitted = true;
		this.route.params	
			.flatMap((params: Params) => this.competitorService.createCompetitor(+params['competition_id'],+params['group_id'],competitor))
			.subscribe(
				data => {
					Messenger().post("Competitor added");
      				this.competitor = new Competitor();
      				this.submitted = false;
					return true }, 
				error => {
					console.log("Error saving competitor");
					console.log(error);
					return Observable.throw(error);
				}
			);
	}
}