import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';

import { Group } from './group';

@Injectable()
export class GroupService {
	private groupsUrl = 'http://localhost:3001/competitions/1groups';

	constructor(
		private authHttp: AuthHttp
	) {}

	getGroups(): Observable<Group[]> {

		return this.authHttp.get(this.groupsUrl)
						.map((response: Response) => <Group[]>response.json())
						.catch(this.handleError);
	}

	getGroup(id: number) {
		return this.authHttp.get(this.groupsUrl + id);
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