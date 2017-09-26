import { Component,ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Competition } from '../competition';
import { CompetitionService } from '../competition.service';

@Component({
	selector: 'competition-new',
	templateUrl: 'competition-new.component.html',
  	encapsulation: ViewEncapsulation.None,
  	providers: [ CompetitionService ]
})

export class CompetitionNew {
	competition = new Competition;
}