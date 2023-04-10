declare namespace Express {
	export interface Request {
		projection?: { _id: number; name?: number; weight?: number };
	}
}
