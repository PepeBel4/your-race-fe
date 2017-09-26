import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';

import { Competition } from './competition';

@Injectable()
export class CompetitionService {
	private competitionsUrl = 'http://localhost:3001/competitions/';

	constructor(
		private authHttp: AuthHttp
	) {}

	getCompetitions(): Observable<Competition[]> {

		return this.authHttp.get(this.competitionsUrl)
						.map((response: Response) => <Competition[]>response.json())
						.catch(this.handleError);
	}

	getCompetition(id: number) {
		return this.authHttp.get(this.competitionsUrl + id);
	}

	createCompetition(competition) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.authHttp.post(this.competitionsUrl, JSON.stringify(competition), {
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