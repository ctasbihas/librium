import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Book } from "@/types/book.interface";
import BookRow from "./BookRow";

const BooksTable = ({ books }: { books: Book[] }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Title</TableHead>
					<TableHead>Author</TableHead>
					<TableHead>Genre</TableHead>
					<TableHead>ISBN</TableHead>
					<TableHead>Copies</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{books.map((book) => (
					<BookRow
						book={book}
						key={book._id}
					/>
				))}
			</TableBody>
		</Table>
	);
};

export default BooksTable;
