import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Control, FieldValues, Path } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

type InputFieldProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label: string;
	placeholder: string;
	type?: string;
	onChange?: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
};

const InputField = <T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	type = "text",
	onChange,
}: InputFieldProps<T>) => {
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

export default InputField;
