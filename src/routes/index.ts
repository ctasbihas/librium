import App from "@/App";
import AddBook from "@/pages/AddBook";
import Books from "@/pages/Books";
import BorrowBook from "@/pages/BorrowBook";
import BorrowSummary from "@/pages/BorrowSummary";
import EditBook from "@/pages/EditBook";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
	{
		path: "/",
		Component: App,
		children: [
			{
				index: true,
				Component: Books,
			},
			{
				path: "books",
				Component: Books,
			},
			{
				path: "create-book",
				Component: AddBook,
			},
			{
				path: "edit-book/:id",
				Component: EditBook,
				loader: async ({ params }) => {
					if (!params.id) {
						throw new Error("Book ID is required");
					}
					return params.id;
				},
			},
			{
				path: "borrow-summary",
				Component: BorrowSummary,
			},
			{
				path: "borrow/:bookId",
				Component: BorrowBook,
				loader: async ({ params }) => {
					if (!params.bookId) {
						throw new Error("Book ID is required");
					}
					return params.bookId;
				},
			},
		],
	},
]);

export default router;
