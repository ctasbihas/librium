import { Button } from "@/components/ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { addBook } from "@/redux/features/bookSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import z from "zod";

type BookFormData = z.infer<typeof bookSchema>;
type TextInputFieldProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label: string;
	placeholder: string;
	type?: string;
	onChange?: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
};

const bookSchema = z.object({
	// _id: z.string(),
	title: z.string().min(1, "Title is required"),
	author: z.string().min(1, "Author is required"),
	genre: z.string().min(1, "Genre is required"),
	isbn: z.string().min(10, "ISBN must be at least 10 characters"),
	description: z.string().optional(),
	copies: z.number().min(1, "Must have at least 1 copy"),
	available: z.boolean(),
});

const TextInputField = <T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	type = "text",
	onChange,
}: TextInputFieldProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						{type === "textarea" ? (
							<Textarea
								placeholder={placeholder}
								className="min-h-[100px]"
								{...field}
								onChange={onChange ? onChange : field.onChange}
							/>
						) : (
							<Input
								type={type}
								placeholder={placeholder}
								{...field}
								onChange={onChange ? onChange : field.onChange}
							/>
						)}
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

const AddBookModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const form = useForm<BookFormData>({
		resolver: zodResolver(bookSchema),
		defaultValues: {
			// _id: "",
			title: "",
			author: "",
			genre: "",
			isbn: "",
			description: "",
			copies: 1,
			available: true,
		},
	});
	const handleAddBook = async (data: BookFormData) => {
		try {
			setIsLoading(true);
			dispatch(addBook(data));
			toast.success("Book added successfully!");
			form.reset();
		} catch (error) {
			toast.error("Failed to add book. Please try again.");
			console.error("Error adding book:", error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<DialogContent className="sm:max-w-[600px]">
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
						<TextInputField
							control={form.control}
							name="title"
							label="Title"
							placeholder="Enter book title"
						/>
						<TextInputField
							control={form.control}
							name="author"
							label="Author"
							placeholder="Enter author name"
						/>
						<TextInputField
							control={form.control}
							name="genre"
							label="Genre"
							placeholder="Enter genre"
						/>
						<TextInputField
							control={form.control}
							name="isbn"
							label="ISBN"
							placeholder="Enter ISBN"
						/>
						<TextInputField
							control={form.control}
							name="copies"
							label="Number of Copies"
							placeholder="1"
							type="number"
							onChange={(e) =>
								form.setValue(
									"copies",
									parseInt(e.target.value) || 1
								)
							}
						/>
						<FormField
							control={form.control}
							name="available"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">
											Available
										</FormLabel>
										<FormDescription>
											Mark this book as available for
											borrowing
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<TextInputField
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
	);
};
export default AddBookModal;
