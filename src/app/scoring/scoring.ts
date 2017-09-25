export class Scoring {
	constructor(
		public competitor: string,
		public points: number,
		public points_with_discards: number,
		public discards: number,
		public race_positions: array
	) {}
}