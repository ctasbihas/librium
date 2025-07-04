import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
	reducerPath: "borrowApi",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL,
	}),
	tagTypes: ["borrow"],
	endpoints: (builder) => ({
		getBorrowedBooks: builder.query({
			query: () => "/api/borrow",
			providesTags: (result) =>
				Array.isArray(result)
					? [
							...result.map(
								({ id }: { id: string | number }) => ({
									type: "borrow" as const,
									id,
								})
							),
							{ type: "borrow", id: "LIST" },
					  ]
					: [{ type: "borrow", id: "LIST" }],
		}),
	}),
});

export const { useGetBorrowedBooksQuery } = borrowApi;
