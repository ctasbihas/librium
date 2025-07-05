import AddBookModal from "@/components/layout/Books/AddBookModal";
import BooksTable from "@/components/layout/Books/BooksTable";
import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/api/booksApi";
import {
	Book as BookIcon,
	ChevronLeft,
	ChevronRight,
	Plus,
} from "lucide-react";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";

const Books = () => {
	const [modal, setModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const { data, isLoading, isError } = useGetBooksQuery(
		{ limit: pageSize, page: currentPage },
		{
			refetchOnReconnect: true,
			refetchOnMountOrArgChange: true,
		}
	);

	if (isLoading && !isError) {
		return (
			<div className="container mx-auto px-4 py-4 sm:py-8">
				{/* Header Skeleton */}
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
					<div className="space-y-2">
						<div className="h-6 sm:h-8 w-40 sm:w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
						<div className="h-3 sm:h-4 w-48 sm:w-64 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
					</div>
					<div className="h-9 sm:h-10 w-28 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
				</div>

				{/* Card Skeleton */}
				<Card>
					<CardHeader>
						<div className="space-y-2">
							<div className="h-5 sm:h-6 w-32 sm:w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
							<div className="h-3 sm:h-4 w-40 sm:w-56 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
						</div>
					</CardHeader>
					<CardContent>
						{/* Mobile Card View Skeleton */}
						<div className="block sm:hidden space-y-4">
							{Array.from({ length: 3 }).map((_, i) => (
								<div
									key={i}
									className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
								>
									<div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
									<div className="h-3 w-1/2 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
									<div className="h-3 w-2/3 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
									<div className="flex justify-between items-center">
										<div className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
										<div className="h-6 w-16 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
									</div>
								</div>
							))}
						</div>

						{/* Desktop Table View Skeleton */}
						<div className="hidden sm:block overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
								<thead>
									<tr>
										{Array.from({ length: 5 }).map(
											(_, i) => (
												<th
													key={i}
													className="px-3 lg:px-6 py-3"
												>
													<div className="h-4 w-16 lg:w-24 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
												</th>
											)
										)}
									</tr>
								</thead>
								<tbody>
									{Array.from({ length: 6 }).map(
										(_, rowIdx) => (
											<tr key={rowIdx}>
												{Array.from({ length: 5 }).map(
													(_, colIdx) => (
														<td
															key={colIdx}
															className="px-3 lg:px-6 py-4"
														>
															<div className="h-4 w-12 lg:w-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
														</td>
													)
												)}
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>

						{/* Pagination Skeleton */}
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
							<div className="flex items-center space-x-2">
								<div className="h-4 w-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
								<div className="h-8 w-16 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
								<div className="h-4 w-12 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
							</div>
							<div className="flex items-center justify-center sm:justify-end space-x-2">
								<div className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
								<div className="flex items-center space-x-1">
									{Array.from({ length: 4 }).map((_, i) => (
										<div
											key={i}
											className="h-8 w-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"
										/>
									))}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	const books = data?.data;
	const pagination = data?.pagination;
	const totalPages = pagination.totalPages;
	const totalBooks = pagination.totalBooks;
	const hasNextPage = pagination.hasNextPage;
	const hasPrevPage = pagination.hasPrevPage;

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handlePageSizeChange = (size: number) => {
		setPageSize(size);
		setCurrentPage(1);
	};

	return (
		<div className="container mx-auto px-4 py-4 sm:py-8 min-h-[calc(100vh-65px)] h-auto">
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
				<div>
					<h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
						Books Library
					</h1>
					<p className="text-sm sm:text-base text-muted-foreground">
						Manage your book collection with ease
					</p>
				</div>
				{/* MODAL */}
				<AddBookModal
					modal={modal}
					setModal={() => setModal(!modal)}
				/>
			</div>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center text-lg sm:text-xl">
						<BookIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
						All Books ({totalBooks})
					</CardTitle>
					<CardDescription className="text-sm">
						View and manage all books in your library
					</CardDescription>
				</CardHeader>
				<CardContent>
					{books.length === 0 ? (
						<div className="text-center py-8 sm:py-12">
							<BookIcon className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4" />
							<h3 className="text-base sm:text-lg font-semibold mb-2">
								No books found
							</h3>
							<p className="text-sm sm:text-base text-muted-foreground mb-4 px-4">
								Start building your library by adding your first
								book.
							</p>
							<Button
								onClick={() => setModal(true)}
								className="bg-gradient-to-r from-accent to-secondary hover:from-secondary hover:to-accent transition-colors duration-300"
							>
								<Plus className="h-4 w-4 mr-2" />
								Add First Book
							</Button>
						</div>
					) : (
						<>
							<div className="overflow-x-auto">
								<BooksTable books={books} />
							</div>
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
								<div className="flex items-center justify-center sm:justify-start space-x-2">
									<span className="text-sm text-muted-foreground">
										Show
									</span>
									<select
										value={pageSize}
										onChange={(e) =>
											handlePageSizeChange(
												Number(e.target.value)
											)
										}
										className="border rounded px-2 py-1 text-sm bg-background"
									>
										<option value={5}>5</option>
										<option value={10}>10</option>
										<option value={20}>20</option>
										<option value={50}>50</option>
									</select>
									<span className="text-sm text-muted-foreground">
										entries
									</span>
								</div>

								<div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
									<span className="text-sm text-muted-foreground text-center sm:text-left">
										Page {currentPage} of {totalPages}
									</span>
									<div className="flex items-center justify-center space-x-1">
										<Button
											variant="outline"
											size="sm"
											onClick={() =>
												handlePageChange(
													currentPage - 1
												)
											}
											disabled={!hasPrevPage}
											className="h-8 w-8 p-0 sm:h-auto sm:w-auto sm:p-2"
										>
											<ChevronLeft className="h-4 w-4" />
										</Button>

										{/* Page Numbers - Hide some on mobile */}
										{Array.from(
											{
												length: Math.min(
													window.innerWidth < 640
														? 3
														: 5,
													totalPages
												),
											},
											(_, i) => {
												const pageNumber =
													Math.max(
														1,
														Math.min(
															totalPages -
																(window.innerWidth <
																640
																	? 2
																	: 4),
															currentPage -
																(window.innerWidth <
																640
																	? 1
																	: 2)
														)
													) + i;
												if (pageNumber <= totalPages) {
													return (
														<Button
															key={pageNumber}
															variant={
																currentPage ===
																pageNumber
																	? "default"
																	: "outline"
															}
															size="sm"
															onClick={() =>
																handlePageChange(
																	pageNumber
																)
															}
															className="h-8 w-8 p-0 text-xs sm:h-auto sm:w-auto sm:p-2 sm:text-sm"
														>
															{pageNumber}
														</Button>
													);
												}
												return null;
											}
										)}

										<Button
											variant="outline"
											size="sm"
											onClick={() =>
												handlePageChange(
													currentPage + 1
												)
											}
											disabled={!hasNextPage}
											className="h-8 w-8 p-0 sm:h-auto sm:w-auto sm:p-2"
										>
											<ChevronRight className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Books;
