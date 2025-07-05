import { useGetBookByIdQuery } from "@/redux/api/booksApi";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";

const BookSkeleton = () => {
	return (
		<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
					<div className="p-4 sm:p-6 lg:p-8">
						<div className="h-6 sm:h-8 bg-gray-300 dark:bg-gray-700 rounded mb-3 sm:mb-4"></div>
						<div className="h-4 sm:h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4 sm:mb-6 w-3/4"></div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
							{[...Array(4)].map((_, i) => (
								<div
									key={i}
									className="h-4 sm:h-5 bg-gray-300 dark:bg-gray-700 rounded"
								></div>
							))}
						</div>
						<div className="mb-4 sm:mb-6">
							<div className="h-5 sm:h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-1/3"></div>
							<div className="space-y-2">
								<div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
								<div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
								<div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const Book = () => {
	const { id } = useParams();
	const { data, isLoading, error } = useGetBookByIdQuery(id!);

	if (isLoading) {
		return <BookSkeleton />;
	}

	if (error) {
		return (
			<section className="flex flex-col items-center justify-center h-[calc(100vh-65px)] animate-fade-in px-4">
				<div className="text-red-500 dark:text-red-400 text-base sm:text-lg text-center">
					Error loading book details
				</div>
			</section>
		);
	}

	const book = data?.data;

	if (!book) {
		return (
			<section className="flex flex-col items-center justify-center h-[calc(100vh-65px)] animate-fade-in px-4">
				<div className="text-gray-500 dark:text-gray-400 text-base sm:text-lg text-center">
					Book not found
				</div>
			</section>
		);
	}

	const getGenreDisplay = (genre: string) => {
		const genreMap: { [key: string]: string } = {
			FICTION: "Fiction",
			NON_FICTION: "Non-Fiction",
			SCIENCE: "Science",
			HISTORY: "History",
			BIOGRAPHY: "Biography",
			FANTASY: "Fantasy",
		};
		return genreMap[genre] || genre;
	};

	return (
		<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 animate-fade-in flex flex-col items-center justify-center min-h-[calc(100vh-65px)]">
			<div className="mb-8 text-center animate-scale-in">
				<Link
					to="/books"
					className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors duration-300"
				>
					<ArrowLeft className="h-4 w-4 mr-2" />
					Back to Books
				</Link>
				<h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
					Details of {book.title}
				</h1>
				<p className="text-muted-foreground text-lg">
					Explore the details of this book.
				</p>
			</div>
			<div className="max-w-4xl mx-auto w-full">
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/70">
					<div className="p-4 sm:p-6 lg:p-8">
						<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 animate-slide-in-right leading-tight">
							{book.title}
						</h1>
						<p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 animate-slide-in-right animation-delay-100">
							by {book.author}
						</p>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 animate-slide-in-right animation-delay-200">
							<div className="flex flex-col sm:flex-row sm:items-center">
								<span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">
									Genre:
								</span>
								<span className="sm:ml-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
									{getGenreDisplay(book.genre)}
								</span>
							</div>
							<div className="flex flex-col sm:flex-row sm:items-center">
								<span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">
									ISBN:
								</span>
								<span className="sm:ml-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base break-all">
									{book.isbn}
								</span>
							</div>
							<div className="flex flex-col sm:flex-row sm:items-center">
								<span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">
									Copies:
								</span>
								<span className="sm:ml-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
									{book.copies}
								</span>
							</div>
							<div className="flex flex-col sm:flex-row sm:items-center">
								<span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">
									Available:
								</span>
								<span
									className={`sm:ml-2 font-medium text-sm sm:text-base ${
										book.available
											? "text-green-600 dark:text-green-400"
											: "text-red-600 dark:text-red-400"
									}`}
								>
									{book.available ? "Yes" : "No"}
								</span>
							</div>
						</div>
						{book.description && (
							<div className="animate-slide-in-right animation-delay-300">
								<h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Description
								</h3>
								<p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
									{book.description}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Book;
