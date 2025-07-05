import Icon from "@/assets/logo.png";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	useGetBookByIdQuery,
	useUpdateBookMutation,
} from "@/redux/api/booksApi";
import type { CreateBookInput } from "@/types/book.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import * as z from "zod";
import InputField from "../components/layout/InputField";
import { Button } from "../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../components/ui/form";

const bookSchema = z.object({
	title: z.string().min(1, "Title is required"),
	author: z.string().min(1, "Author is required"),
	genre: z.string().min(1, "Genre is required"),
	isbn: z.string().min(10, "ISBN must be at least 10 characters"),
	description: z.string().optional(),
	copies: z.number().min(0, "Copies cannot be negative"),
	available: z.boolean().optional(),
});

const EditBook = () => {
	const { id } = useParams<{ id: string }>();
	const { data, error } = useGetBookByIdQuery(id, {
		skip: !id,
		refetchOnReconnect: true,
		refetchOnMountOrArgChange: true,
	});
	const [updateBook] = useUpdateBookMutation();
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const book = data?.data;
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

	const form = useForm<CreateBookInput>({
		resolver: zodResolver(bookSchema),
		defaultValues: {
			title: "",
			author: "",
			genre: "",
			isbn: "",
			description: "",
			copies: 0,
			available: false,
		},
	});

	useEffect(() => {
		if (!id) {
			toast.error("Book ID is required", {
				style: {
					backgroundColor: "#ef4444",
					color: "white",
					border: "1px solid #dc2626",
				},
			});
			navigate("/books");
			return;
		}
		if (error) {
			toast.error("Failed to load book", {
				style: {
					backgroundColor: "#ef4444",
					color: "white",
					border: "1px solid #dc2626",
				},
			});
			navigate("/books");
			return;
		}
		if (book) {
			form.reset({
				title: book.title,
				author: book.author,
				genre: book.genre,
				isbn: book.isbn,
				description: book.description || "",
				copies: book.copies,
				available: book.copies > 0,
			});
		}
	}, [id, book, error, navigate, form]);

	const onSubmit = async (data: CreateBookInput) => {
		if (!id) return;

		try {
			setIsSubmitting(true);
			await updateBook({ id, book: data }).unwrap();
			toast.success("Book updated successfully!", {
				style: {
					backgroundColor: "#10b981",
					color: "white",
					border: "1px solid #059669",
				},
			});
			navigate("/books");
		} catch (error) {
			toast.error("Failed to update book", {
				style: {
					backgroundColor: "#ef4444",
					color: "white",
					border: "1px solid #dc2626",
				},
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181c23] via-[#232733] to-[#181c23]">
			<div className="w-full max-w-xl px-4 py-12">
				<Card className="w-full rounded-2xl shadow-2xl border-0 bg-[#181c23]/95 backdrop-blur-md animate-fade-in">
					<CardHeader className="text-center pb-8">
						<div className="flex items-center justify-center">
							<img
								src={Icon}
								alt="Librium Icon"
								className="w-20 animate-bounce [animation-duration:3s] [animation-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] bg-gradient-to-br from-[#232733] via-[#2a2f3d] to-[#181c23] rounded-full"
							/>
						</div>
						<CardTitle className="text-3xl font-bold bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
							Edit Book
						</CardTitle>
						<CardDescription className="text-base text-[#b0b3c7] mt-2">
							Update the details of "{book?.title}"
						</CardDescription>
					</CardHeader>

					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<InputField
									control={form.control}
									name="title"
									label="Title"
									placeholder="Enter book title"
								/>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
													value={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select a genre" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{genres.map((genre) => (
															<SelectItem
																key={
																	genre.value
																}
																value={
																	genre.value
																}
															>
																{genre.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<InputField
										control={form.control}
										name="copies"
										label="Number of Copies"
										placeholder="Enter number of copies"
										type="number"
										onChange={(e) => {
											const value =
												parseInt(e.target.value) || 0;
											const finalValue = Math.max(
												0,
												value
											);
											form.setValue("copies", finalValue);
											form.setValue(
												"available",
												finalValue > 0
											);
										}}
									/>
									<InputField
										control={form.control}
										name="isbn"
										label="ISBN"
										placeholder="Enter ISBN"
									/>
								</div>

								<InputField
									control={form.control}
									name="description"
									label="Description (Optional)"
									placeholder="Enter book description"
									type="textarea"
								/>

								<div className="flex gap-4 pt-4">
									<Button
										type="button"
										variant="outline"
										onClick={() => navigate("/books")}
										className="flex-1 rounded-lg bg-[#232733]/60 border border-[#232733] text-[#b0b3c7] hover:text-[#B0B3C7] hover:bg-[#232733] transition-all duration-200 cursor-pointer"
									>
										<ArrowLeft className="h-4 w-4 mr-2" />
										Cancel
									</Button>

									<Button
										type="submit"
										disabled={isSubmitting}
										variant={"outline"}
										className="flex-1 rounded-lg bg-gradient-to-r from-premium-gradient-start via-premium-gradient-middle to-premium-gradient-ends text-white hover:text-white border-0 shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer"
									>
										{isSubmitting ? (
											<>
												<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
												Updating...
											</>
										) : (
											<>
												<Save className="h-4 w-4 mr-2" />
												Update Book
											</>
										)}
									</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default EditBook;
