import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Competition } from './competition';
import { CompetitionService } from './competition.service';

@Component({
	selector: 'competitions',
	templateUrl: 'competitions.component.html',
  	encapsulation: ViewEncapsulation.None

})
export class Competitions implements OnInit {

	competitions: Competition[];
	errorMessage: string;

	constructor( private competitionService: CompetitionService) {}

	
	ngOnInit() {
		let timer = Observable.timer(0,5000);  
		timer.subscribe(() => this.getCompetitions());     
    }

    getCompetitions() {
    	this.competitionService.getCompetitions()
    		.subscribe(
    			competitions => this.competitions = competitions,
    			error => this.errorMessage = <any>error
    		);
    }
}