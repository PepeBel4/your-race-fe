import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Scoring } from './scoring';

@Injectable()
export class ScoringService {
	private scoringsUrl = 'http://localhost:3001/competitions/1/groups/1/scorings';

	constructor(
		private http: Http
	) {}

	getScorings(): Observable<Scoring[]> {
		return this.http.get(this.scoringsUrl)
						.map((response: Response) => <Scoring[]>response.json())
						.catch(this.handleError);
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