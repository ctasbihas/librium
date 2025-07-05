import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import InputField from "../InputField";

type BookFormData = z.infer<typeof bookSchema>;

const bookSchema = z.object({
	title: z.string().min(1, "Title is required"),
	author: z.string().min(1, "Author is required"),
	genre: z.string().min(1, "Genre is required"),
	isbn: z.string().min(10, "ISBN must be at least 10 characters"),
	description: z.string().optional(),
	copies: z.number().min(0, "Copies cannot be negative"),
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

const AddBookModal = ({
	modal,
	setModal,
}: {
	modal: boolean;
	setModal: () => void;
}) => {
	const [isLoading, setIsLoading] = useState(false);
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
			setModal();
			form.reset();
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
		<Dialog
			open={modal}
			onOpenChange={setModal}
		>
			<DialogTrigger asChild>
				<Button className="bg-gradient-to-r dark:from-secondary from-accent dark:to-accent to-secondary dark:hover:to-secondary hover:to-accent transition-colors duration-300 cursor-pointer">
					<Plus className="h-4 w-4 mr-2" />
					Add New Book
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px] h-[75vh] sm:h-auto overflow-scroll">
				<DialogHeader>
					<DialogTitle>Add New Book</DialogTitle>
					<DialogDescription>
						Enter the details of the new book below.
					</DialogDescription>
				</DialogHeader>
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
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a genre" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{genres.map((genre) => (
													<SelectItem
														key={genre.value}
														value={genre.value}
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
									const value = parseInt(e.target.value) || 0;
									form.setValue("copies", Math.max(0, value));
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
						<DialogFooter className="mt-4 flex gap-4">
							<DialogClose asChild>
								<Button
									type="button"
									variant="outline"
									className="bg-white text-gray-700 hover:bg-gray-100 transition-colors duration-300"
								>
									Cancel
								</Button>
							</DialogClose>
							<Button
								type="submit"
								disabled={isLoading}
								className="bg-gradient-to-r dark:from-secondary from-accent dark:to-accent to-secondary dark:hover:to-secondary hover:to-accent transition-colors duration-300 cursor-pointer"
							>
								{isLoading ? "Adding Book..." : "Add Book"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
export default AddBookModal;
