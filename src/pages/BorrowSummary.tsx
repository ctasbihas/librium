import { useGetBorrowedBooksQuery } from "@/redux/api/borrowApi";
import type { IBorrowSummary } from "@/types/book.interface";
import { Book as BookIcon, Users } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table";

const BorrowSummary = () => {
	const { data, isLoading, isError } = useGetBorrowedBooksQuery(undefined, {
		refetchOnReconnect: true,
	});
	const borrowSummary = data?.data as IBorrowSummary[];

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-center min-h-96">
					<div className="text-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
						<p className="text-muted-foreground">
							Loading borrow summary...
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Card className="border-destructive">
					<CardHeader>
						<CardTitle className="text-destructive">
							Error Loading Borrow Summary
						</CardTitle>
						<CardDescription>
							Unable to fetch borrow summary. Please check your
							connection or try again later.
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	const totalBooksBorrowed = borrowSummary.reduce(
		(sum, item) => sum + item.totalQuantity,
		0
	);

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-primary mb-2">
					Borrow Summary
				</h1>
				<p className="text-muted-foreground">
					Overview of all borrowed books in your library system
				</p>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Books Borrowed
						</CardTitle>
						<BookIcon className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{totalBooksBorrowed}
						</div>
						<p className="text-xs text-muted-foreground">
							Total quantity of books currently borrowed
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Unique Titles
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{borrowSummary.length}
						</div>
						<p className="text-xs text-muted-foreground">
							Different book titles that have been borrowed
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Borrow Summary Table */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center">
						<Users className="h-5 w-5 mr-2" />
						Borrowed Books Summary
					</CardTitle>
					<CardDescription>
						Detailed breakdown of borrowed books by title and
						quantity
					</CardDescription>
				</CardHeader>
				<CardContent>
					{borrowSummary.length === 0 ? (
						<div className="text-center py-12">
							<BookIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
							<h3 className="text-lg font-semibold mb-2">
								No books borrowed yet
							</h3>
							<p className="text-muted-foreground">
								When books are borrowed, they will appear here
								with their borrow statistics.
							</p>
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Book Title</TableHead>
									<TableHead>ISBN</TableHead>
									<TableHead className="text-right">
										Total Quantity Borrowed
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{borrowSummary.map((item, index) => (
									<TableRow key={index}>
										<TableCell className="font-medium">
											{item.book.title}
										</TableCell>
										<TableCell className="font-mono text-sm">
											{item.book.isbn}
										</TableCell>
										<TableCell className="text-right">
											<span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
												{item.totalQuantity}
											</span>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default BorrowSummary;
