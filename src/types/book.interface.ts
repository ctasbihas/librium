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

export interface BorrowRequest {
	bookId: string;
	quantity: number;
	dueDate: string;
}

export interface Borrow {
	_id: string;
	bookId: string;
	book?: Book;
	quantity: number;
	dueDate: string;
	borrowedAt: string;
}

export interface BorrowSummary {
	bookTitle: string;
	isbn: string;
	totalQuantityBorrowed: number;
}
