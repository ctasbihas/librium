"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useGetBookByIdQuery } from "@/redux/api/booksApi";
import { useBorrowBookMutation } from "@/redux/api/borrowApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const borrowSchema = z.object({
	book: z.string().min(1, "Book ID is required"),
	quantity: z.number().min(1, "Quantity must be at least 1"),
	dueDate: z.date({
		required_error: "Due date is required",
	}),
});

type BorrowFormData = z.infer<typeof borrowSchema>;

const BorrowBook = () => {
	const { bookId } = useParams();
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		data,
		isLoading: isLoadingBook,
		error,
	} = useGetBookByIdQuery(bookId, {
		skip: !bookId,
		refetchOnReconnect: true,
		refetchOnMountOrArgChange: true,
	});

	const [borrowBook] = useBorrowBookMutation();

	const bookDetails = data?.data;

	const getTomorrowDate = () => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow;
	};

	const form = useForm<BorrowFormData>({
		resolver: zodResolver(borrowSchema),
		defaultValues: {
			book: bookId || "",
			quantity: 1,
			dueDate: getTomorrowDate(),
		},
	});

	const onSubmit = async (data: BorrowFormData) => {
		try {
			setIsSubmitting(true);
			const borrowData = {
				book: bookId,
				quantity: data.quantity,
				dueDate: data.dueDate.toISOString(),
			};

			await borrowBook(borrowData).unwrap();

			toast.success(
				`📚 "${bookDetails?.title || bookId}" successfully borrowed!`
			);

			navigate("/borrow-summary");
		} catch (error: any) {
			toast.error(
				error?.data?.message ||
					error?.message ||
					"Failed to borrow book. Please try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoadingBook) {
		return (
			<div className="max-w-lg mx-auto p-6 bg-card shadow-lg rounded-lg">
				<div className="animate-pulse">
					{/* Header section skeleton */}
					<div className="mb-8 text-center">
						<div className="h-4 bg-gray-200 rounded w-24 mb-6 mx-auto"></div>
						<div className="h-10 bg-gray-200 rounded w-3/4 mb-3 mx-auto"></div>
						<div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
					</div>

					{/* Book details card skeleton */}
					<div className="mb-6 p-4 bg-muted rounded-lg border">
						<div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
						<div className="space-y-2">
							<div className="h-4 bg-gray-200 rounded w-full"></div>
							<div className="h-4 bg-gray-200 rounded w-3/4"></div>
							<div className="h-4 bg-gray-200 rounded w-1/2"></div>
						</div>
					</div>

					{/* Form skeleton */}
					<div className="space-y-6">
						<div className="flex space-x-2">
							<div className="flex-1">
								<div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
								<div className="h-10 bg-gray-200 rounded w-full"></div>
							</div>
							<div className="w-24">
								<div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
								<div className="h-10 bg-gray-200 rounded w-full"></div>
							</div>
						</div>
						<div className="h-10 bg-gray-200 rounded w-full"></div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="max-w-lg mx-auto p-6 bg-card shadow-lg rounded-lg">
				<div className="text-center text-red-500">
					<p>Failed to load book details</p>
					<p className="text-sm mt-2">Please try again later</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-lg mx-auto p-6 bg-card shadow-lg rounded-lg">
			<div className="mb-8 text-center animate-scale-in">
				<Link
					to="/books"
					className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors duration-300"
				>
					<ArrowLeft className="h-4 w-4 mr-2" />
					Back to Books
				</Link>
				<h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
					Borrow a Book
				</h1>
				<p className="text-muted-foreground text-lg">
					Add a book to your borrow collection
				</p>
			</div>
			<h2 className="text-2xl font-bold mb-4 text-primary"></h2>

			{bookDetails && (
				<div className="mb-6 p-4 bg-muted rounded-lg border">
					<h3 className="font-semibold text-lg mb-2">Book Details</h3>
					<div className="space-y-1 text-sm">
						<p>
							<span className="font-medium">Title:</span>{" "}
							{bookDetails.title}
						</p>
						<p>
							<span className="font-medium">Author:</span>{" "}
							{bookDetails.author}
						</p>
						<p>
							<span className="font-medium">Available:</span>{" "}
							{bookDetails.copies} copies
						</p>
					</div>
				</div>
			)}

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="flex space-x-2">
						<FormField
							control={form.control}
							name="quantity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quantity</FormLabel>
									<FormControl>
										<Input
											type="number"
											min="1"
											placeholder="1"
											{...field}
											onChange={(e) =>
												field.onChange(
													parseInt(e.target.value) ||
														1
												)
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="dueDate"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Due Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] pl-3 hover:text-white text-left font-normal",
														!field.value &&
															"text-muted-foreground"
													)}
												>
													{field.value ? (
														format(
															field.value,
															"PPP"
														)
													) : (
														<span>
															Pick return date
														</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className="w-auto p-0"
											align="start"
										>
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) => {
													const today = new Date();
													today.setHours(0, 0, 0, 0);
													const tomorrow = new Date(
														today
													);
													tomorrow.setDate(
														tomorrow.getDate() + 1
													);
													return date < tomorrow;
												}}
												captionLayout="dropdown"
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full cursor-pointer"
					>
						{isSubmitting ? "Processing..." : "Borrow Book"}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default BorrowBook;
