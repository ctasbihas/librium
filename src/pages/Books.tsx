import AddBookModal from "@/components/layout/Books/AddBookModal";
import BooksTable from "@/components/layout/Books/BooksTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useGetBooksQuery } from "@/redux/api/baseApi";
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
	const { data, isLoading, isError } = useGetBooksQuery(undefined);
	const books = [];

	console.log({ data, isLoading, isError });

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
				{/* Modal for Add Book */}
				<Dialog>
					<DialogTrigger asChild>
						<Button className="bg-gradient-to-r dark:from-secondary from-accent dark:to-accent to-secondary dark:hover:to-secondary hover:to-accent transition-colors duration-300 cursor-pointer">
							<Plus className="h-4 w-4 mr-2" />
							Add New Book
						</Button>
					</DialogTrigger>
					<AddBookModal />
				</Dialog>
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
