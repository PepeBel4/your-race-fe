import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { Competition } from '../competition';
import { CompetitionService } from '../competition.service';
import { AuthService } from '../../auth/auth.service';

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
		private competitionService: CompetitionService,
		public auth: AuthService,
		private _location: Location
	) {}

	backClicked() {
		console.log('back clicked..');
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

	createCompetition(competition) {
		this.submitted = true;
		this.competition.created_by = this.profile.sub;
		this.competitionService.createCompetition(competition)
			.subscribe(
				data => {
					console.log(data);
					console.log(this.profile);
					return true }, 
				error => {
					console.log("Error saving proposal");
					console.log(error);
					return Observable.throw(error);
				}
			);
	}
}