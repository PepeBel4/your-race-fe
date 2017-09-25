export class Competition {
	constructor(
		public id?: number,
		public title: string,
		public groups?: array,
		public created_by?: number,
		public created_at?: timestamp,
		public updated_at?: timestamp
	) {}
}

// 1,'RS:X World Championships',1