import InputField from "@/components/layout/InputField";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAddBookMutation } from "@/redux/api/booksApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, BookIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

type BookFormData = z.infer<typeof bookSchema>;

const bookSchema = z.object({
	title: z.string().min(1, "Title is required"),
	author: z.string().min(1, "Author is required"),
	genre: z.string().min(1, "Genre is required"),
	isbn: z.string().min(10, "ISBN must be at least 10 characters"),
	description: z.string().optional(),
	copies: z.number().min(1, "Must have at least 1 copy"),
});

const genres = [
	{ value: "FICTION", label: "Fiction" },
	{ value: "NON_FICTION", label: "Non-Fiction" },
	{ value: "FANTASY", label: "Fantasy" },
	{ value: "SCIENCE", label: "Science" },
	{ value: "BIOGRAPHY", label: "Biography" },
	{ value: "HISTORY", label: "History" },
	{ value: "SELF_HELP", label: "Self-Help" },
	{ value: "MEMOIR", label: "Memoir" },
	{ value: "PSYCHOLOGY", label: "Psychology" },
	{ value: "THRILLER", label: "Thriller" },
	{ value: "ROMANCE", label: "Romance" },
];

const AddBook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const form = useForm<BookFormData>({
		resolver: zodResolver(bookSchema),
		defaultValues: {
			title: "",
			author: "",
			genre: "",
			isbn: "",
			description: "",
			copies: 0,
		},
	});
	const [addBook] = useAddBookMutation();

	const handleAddBook = async (data: BookFormData) => {
		try {
			setIsLoading(true);
			const response = await addBook(data).unwrap();
			toast.success(`Book "${response.data.title}" added successfully!`, {
				style: {
					backgroundColor: "#10b981",
					color: "white",
					border: "1px solid #059669",
				},
			});
			navigate(-1);
		} catch (error: any) {
			const apiMessage =
				error.data.error.message ||
				error.data.message ||
				"Failed to add book. Please try again.";
			toast.error(apiMessage, {
				style: {
					backgroundColor: "#ef4444",
					color: "white",
					border: "1px solid #dc2626",
				},
			});
			console.error("Error adding book:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-background via-surface to-background">
			<div className="w-full max-w-2xl animate-fade-in-up">
				{/* Header */}
				<div className="mb-8 text-center animate-scale-in">
					<Link
						to="/books"
						className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors duration-300"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Books
					</Link>
					<h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
						Add New Book
					</h1>
					<p className="text-muted-foreground text-lg">
						Add a new book to your library collection
					</p>
				</div>

				{/* Form */}
				<div className="animate-slide-in-left delay-200">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<BookIcon className="h-5 w-5 mr-2" />
								Book Information
							</CardTitle>
							<CardDescription>
								Fill in the details for the new book
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(handleAddBook)}
									className="space-y-6"
								>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<InputField
											control={form.control}
											name="title"
											label="Title"
											placeholder="Enter book title"
										/>
										<InputField
											control={form.control}
											name="author"
											label="Author"
											placeholder="Enter author name"
										/>

										<FormField
											control={form.control}
											name="genre"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Genre</FormLabel>
													<Select
														onValueChange={
															field.onChange
														}
														defaultValue={
															field.value
														}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select a genre" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{genres.map(
																(genre) => (
																	<SelectItem
																		key={
																			genre.value
																		}
																		value={
																			genre.value
																		}
																	>
																		{
																			genre.label
																		}
																	</SelectItem>
																)
															)}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>

										<InputField
											control={form.control}
											name="isbn"
											label="ISBN"
											placeholder="Enter ISBN"
										/>
										<InputField
											control={form.control}
											name="copies"
											label="Number of Copies"
											placeholder="1"
											type="number"
											onChange={(e) => {
												const value =
													parseInt(e.target.value) ||
													0;
												form.setValue(
													"copies",
													Math.max(0, value)
												);
											}}
										/>
									</div>

									<InputField
										control={form.control}
										name="description"
										label="Description"
										placeholder="Enter book description (optional)"
										type="textarea"
									/>

									<div className="flex gap-4">
										<Button
											type="submit"
											disabled={isLoading}
											className="bg-gradient-to-r from-primary to-primary-hover"
										>
											{isLoading
												? "Adding Book..."
												: "Add Book"}
										</Button>
										<Link to="/books">
											<Button
												type="button"
												variant="outline"
											>
												Cancel
											</Button>
										</Link>
									</div>
								</form>
							</Form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default AddBook;
