import { Component,ViewEncapsulation } from '@angular/core';
import { Competition } from '../competition';

@Component({
	selector: 'competition-new',
	templateUrl: 'competition-new.component.html',
  	encapsulation: ViewEncapsulation.None
})

export class CompetitionNew {
	competition = new Competition;
}