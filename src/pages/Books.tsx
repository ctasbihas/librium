import AddBookModal from "@/components/layout/Books/AddBookModal";
import BooksTable from "@/components/layout/Books/BooksTable";
import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/api/booksApi";
import { Book as BookIcon, Plus } from "lucide-react";
import { Link } from "react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";

const Books = () => {
	const { data, isLoading, isError } = useGetBooksQuery(undefined, {
		refetchOnReconnect: true,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	if (isLoading && !isError) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-8">
					<div>
						<div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
						<div className="h-4 w-64 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
					</div>
					<div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
				</div>
				<div className="bg-white dark:bg-gray-900 rounded-lg shadow">
					<div className="p-6 border-b border-gray-200 dark:border-gray-700">
						<div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
						<div className="h-4 w-56 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
					</div>
					<div className="p-6">
						<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead>
								<tr>
									{Array.from({ length: 5 }).map((_, i) => (
										<th
											key={i}
											className="px-6 py-3"
										>
											<div className="h-4 w-24 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{Array.from({ length: 6 }).map((_, rowIdx) => (
									<tr key={rowIdx}>
										{Array.from({ length: 5 }).map(
											(_, colIdx) => (
												<td
													key={colIdx}
													className="px-6 py-4"
												>
													<div className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
												</td>
											)
										)}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}

	const books = data.data;

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-bold text-primary mb-2">
						Books Library
					</h1>
					<p className="text-muted-foreground">
						Manage your book collection with ease
					</p>
				</div>
				{/* MODAL */}
				<AddBookModal />
			</div>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center">
						<BookIcon className="h-5 w-5 mr-2" />
						All Books ({books.length})
					</CardTitle>
					<CardDescription>
						View and manage all books in your library
					</CardDescription>
				</CardHeader>
				<CardContent>
					{books.length === 0 ? (
						<div className="text-center py-12">
							<BookIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
							<h3 className="text-lg font-semibold mb-2">
								No books found
							</h3>
							<p className="text-muted-foreground mb-4">
								Start building your library by adding your first
								book.
							</p>
							<Link to="/add-book">
								<Button>
									<Plus className="h-4 w-4 mr-2" />
									Add First Book
								</Button>
							</Link>
						</div>
					) : (
						<BooksTable books={books} />
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Books;
