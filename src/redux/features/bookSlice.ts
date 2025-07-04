import type { Book } from "@/types/book.interface";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

interface IInitialState {
	books: Book[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

const initialBooks: Book[] = [];
const initialStatus: "idle" | "loading" | "succeeded" | "failed" = "idle";
const initialError: string | null = null;

const initialState: IInitialState = {
	books: initialBooks,
	status: initialStatus,
	error: initialError,
};

const bookSlice = createSlice({
	name: "book",
	initialState,
	reducers: {
		addBook: (state, action: PayloadAction<Book>) => {
			state.books.push(action.payload);
		},
		removeBook: (state, action: PayloadAction<string>) => {
			state.books = state.books.filter(
				(book) => book._id !== action.payload
			);
		},
		updateBook: (state, action: PayloadAction<Book>) => {
			const index = state.books.findIndex(
				(book) => book._id === action.payload._id
			);
			if (index !== -1) {
				state.books[index] = action.payload;
			}
		},
	},
});

export const selectBooks = (state: RootState) => state.book.books;
export const selectBooksStatus = (state: RootState) => state.book.status;
export const { addBook } = bookSlice.actions;

export default bookSlice.reducer;
