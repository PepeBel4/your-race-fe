import { Component,OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { Competition } from '../competition/competition';
import { CompetitionService } from '../competition/competition.service';

@Component({
	selector: 'presenter',
	templateUrl: 'presenter.template.html',
  	encapsulation: ViewEncapsulation.None

})
export class Presenter implements OnInit {
    id: number;

	constructor(
        private route: ActivatedRoute,
        private competitionService: CompetitionService
        ) {}

    @Input()
    competition: Competition;

	ngOnInit() {    
        let competitionRequest = this.route.params    
            .flatMap((params: Params) =>
                this.competitionService.getCompetition(+params['id']));
        competitionRequest.subscribe(response => {
            this.competition = response.json();
            this.competitionService.setSelectedCompetition(this.competition);
        })
    }

}