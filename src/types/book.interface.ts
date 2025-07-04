export interface Book {
	_id: string;
	title: string;
	author: string;
	genre: string;
	isbn: string;
	description?: string;
	copies: number;
	available: boolean;
	createdAt?: string;
	updatedAt?: string;
}

export interface CreateBookInput {
	title: string;
	author: string;
	genre: string;
	isbn: string;
	description?: string;
	copies: number;
	available?: boolean;
}

export interface UpdateBookInput extends Partial<CreateBookInput> {
	_id: string;
}

export interface IBorrowSummary {
	book: {
		title: string;
		isbn: string;
	};
	totalQuantity: number;
}
