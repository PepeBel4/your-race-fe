import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';

import { Race } from './race';

@Injectable()
export class RaceService {
	private apiUrl = 'http://localhost:3001/';

	constructor(
		private authHttp: AuthHttp
	) {}

	getRace(competition_id: number, group_id: number, fleet_id: number, id: number) {
		return this.authHttp.get(this.apiUrl + 'competitions/' + competition_id + '/groups/' + group_id + '/fleets/' + fleet_id + '/races/' + id);
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