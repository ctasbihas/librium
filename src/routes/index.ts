import App from "@/App";
import Books from "@/pages/Books";
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
				path: "edit-book/:id",
				Component: EditBook,
				loader: async ({ params }) => {
					if (!params.id) {
						throw new Error("Book ID is required");
					}
					return params.id;
				},
			},
		],
	},
]);

export default router;
