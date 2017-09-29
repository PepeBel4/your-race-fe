import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Scoring } from './scoring';
import { ScoringService } from './scoring.service';

@Component({
	selector: 'scorings',
	templateUrl: 'scorings.component.html',
  	encapsulation: ViewEncapsulation.None,
  	providers: [ScoringService]

})
export class Scorings implements OnInit {

	scorings: Scoring[];
	errorMessage: string;

	constructor(
		private scoringService: ScoringService
	) {}

	
	ngOnInit() {
		let timer = Observable.timer(0,5000);  
		timer.subscribe(() => this.getScorings());      
    }

    getScorings() {
    	this.scoringService.getScorings()
    		.subscribe(
    			scorings => this.scorings = scorings,
    			error => this.errorMessage = <any>error
    		);
    }
}