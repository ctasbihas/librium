import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Book } from "@/types/book.interface";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

const BookRow = ({ book }: { book: Book }) => {
	const API_BASE_URL = import.meta.env.NEXT_PUBLIC_API_BASE_URL;
	const handleDelete = async (id: string, title: string) => {
		fetch(`${API_BASE_URL}/api/books/${id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) =>
				toast(data.message, {
					description: `${title} has been deleted successfully.`,
				})
			);
	};
	return (
		<TableRow key={book._id}>
			<TableCell className="font-medium">{book.title}</TableCell>
			<TableCell>{book.author}</TableCell>
			<TableCell>{book.genre}</TableCell>
			<TableCell className="font-mono text-sm">{book.isbn}</TableCell>
			<TableCell>{book.copies}</TableCell>
			<TableCell>
				<Badge
					variant={
						book.available && book.copies > 0
							? "default"
							: "secondary"
					}
				>
					{book.available && book.copies > 0
						? "Available"
						: "Unavailable"}
				</Badge>
			</TableCell>
			<TableCell className="text-right">
				<div className="flex justify-end space-x-2">
					<Link to={`/edit-book/${book._id}`}>
						<Button
							variant="ghost"
							size="sm"
						>
							<Edit className="h-4 w-4" />
						</Button>
					</Link>

					{book.available && book.copies > 0 && (
						<Link to={`/borrow/${book._id}`}>
							<Button
								variant="outline"
								size="sm"
							>
								Borrow
							</Button>
						</Link>
					)}

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
							>
								<Trash2 className="h-4 w-4 text-destructive" />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Delete Book</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure you want to delete "
									{book.title}"? This action cannot be undone.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={() =>
										handleDelete(book._id, book.title)
									}
									className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
								>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</TableCell>
		</TableRow>
	);
};

export default BookRow;
