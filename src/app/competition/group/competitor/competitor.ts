export class Competitor {
	constructor(
		public id: number,
		public group_id: number,
		public number: string,
		public name: string,
		public country?: string
	) {}
}