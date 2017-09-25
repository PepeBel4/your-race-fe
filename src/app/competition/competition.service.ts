import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Competition } from './competition';

@Injectable()
export class CompetitionService {
	private competitionsUrl = 'http://localhost:3001/competitions/';

	constructor(
		private http: Http
	) {}

	getCompetitions(): Observable<Competition[]> {
		return this.http.get(this.competitionsUrl)
						.map((response: Response) => <Competition[]>response.json())
						.catch(this.handleError);
	}

	getCompetition(id: number) {
		return this.http.get(this.competitionsUrl + id);
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