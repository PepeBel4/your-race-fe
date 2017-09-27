import { Component,OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Group } from '../group';
import { GroupService } from '../group.service';

@Component({
	selector: 'group-show',
	templateUrl: 'group-show.component.html',
  	encapsulation: ViewEncapsulation.None
})

export class GroupShow implements OnInit {
	id: number;
	routeId: any;

	constructor(
		private http: Http,
		private route: ActivatedRoute,
		private groupService: GroupService
	 ) {}

	@Input()
	group: Group;

	ngOnInit(): void {
		let competitionRequest = this.route.params	
			.flatMap((params: Params) =>
				this.groupService.getGroup(+params['group_id']));
		competitionRequest.subscribe(response => this.group = response.json())
	}
}