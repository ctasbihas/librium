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
import { useDeleteBookMutation } from "@/redux/api/booksApi";
import type { Book } from "@/types/book.interface";
import { Edit, Loader2Icon, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const BookRow = ({ book }: { book: Book }) => {
	const [deleteBook, { isLoading }] = useDeleteBookMutation();
	const navigate = useNavigate();

	const handleDelete = async (id: string, title: string) => {
		try {
			const response = await deleteBook(id).unwrap();
			if (response.success) {
				toast.success(`Book "${title}" deleted successfully!`, {
					style: {
						backgroundColor: "#16a34a",
						color: "white",
						border: "1px solid #15803d",
					},
				});
			} else {
				toast.error(response.message || "Failed to delete book.", {
					style: {
						backgroundColor: "#ef4444",
						color: "white",
						border: "1px solid #dc2626",
					},
				});
			}
		} catch (error: any) {
			const apiMessage =
				error.data.error.message ||
				error.data.message ||
				"Failed to delete book. Please try again.";
			toast.error(apiMessage);
			console.error("Error deleting book:", error);
		}
	};

	const handleRowClick = () => {
		navigate(`/books/${book._id}`);
	};

	return (
		<TableRow
			key={book._id}
			className="cursor-pointer hover:bg-muted/50"
			onClick={handleRowClick}
		>
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
				<div
					className="flex justify-end space-x-2"
					onClick={(e) => e.stopPropagation()}
				>
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
								{isLoading ? (
									<Button
										size="sm"
										variant="destructive"
										disabled
									>
										<Loader2Icon className="animate-spin" />
										Deleting Book
									</Button>
								) : (
									<>
										<AlertDialogCancel>
											Cancel
										</AlertDialogCancel>
										<AlertDialogAction
											onClick={() =>
												handleDelete(
													book._id,
													book.title
												)
											}
											className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
											disabled={isLoading}
										>
											Delete
										</AlertDialogAction>
									</>
								)}
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</TableCell>
		</TableRow>
	);
};

export default BookRow;
