import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';

import { Competitor } from './competitor';

@Injectable()
export class CompetitorService {
	private apiUrl = 'http://localhost:3001/';

	constructor(
		private authHttp: AuthHttp
	) {}

	getCompetitor(competition_id: number, group_id: number, id: number) {
		return this.authHttp.get(this.apiUrl + 'competitions/' + competition_id + '/groups/' + group_id + '/competitors/' + id);
	}

	createCompetitor(competition_id: number, group_id: number, competitor) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.authHttp.post(this.apiUrl + 'competitions/' + competition_id + '/groups/' + group_id + '/competitors/', JSON.stringify(competitor), {
			headers: headers}).map((res: Response) => res.json());
	}

	private handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}