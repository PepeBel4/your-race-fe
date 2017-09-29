import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { Competition } from './competition';
import { CompetitionService } from './competition.service';

@Component({
	selector: 'competitions',
	templateUrl: 'competitions.component.html',
  	encapsulation: ViewEncapsulation.None

})
export class Competitions implements OnInit {

    data: any[];

	competitions: Competition[];
	errorMessage: string;
	private timer: any;
	private sub: Subscription;

	constructor( private competitionService: CompetitionService) {}

	
	ngOnInit() {    
		this.timer = Observable.timer(0,5000);  
		this.sub = this.timer.subscribe(() => this.getCompetitions());   
    }

    ngOnDestroy(){
        console.log("Destroy timer");
        // unsubscribe here
        this.sub.unsubscribe();

    }

    getCompetitions() {
    	this.competitionService.getCompetitions()
    		.subscribe(
    			competitions => this.data = competitions,
    			error => this.errorMessage = <any>error
    		);
    }
}