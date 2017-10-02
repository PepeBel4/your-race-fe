import { Race } from './show/race';

export class Fleet {
	constructor(
		public id: number,
		public name: string,
		public fleet_type: string,
		public races: Race,
		public group: string
	) {}
}