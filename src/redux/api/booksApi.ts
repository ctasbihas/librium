import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
	reducerPath: "booksApi",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL,
	}),
	tagTypes: ["book"],
	endpoints: (builder) => ({
		getBooks: builder.query({
			query: () => "/api/books",
			providesTags: (result) =>
				Array.isArray(result)
					? [
							...result.map(
								({ id }: { id: string | number }) => ({
									type: "book" as const,
									id,
								})
							),
							{ type: "book", id: "LIST" },
					  ]
					: [{ type: "book", id: "LIST" }],
		}),
		getBookById: builder.query({
			query: (id) => `/api/books/${id}`,
		}),
		addBook: builder.mutation({
			query: (book) => ({
				url: "/api/books",
				method: "POST",
				body: book,
			}),
		}),
		updateBook: builder.mutation({
			query: ({ id, ...book }) => ({
				url: `/api/books/${id}`,
				method: "PUT",
				body: book,
			}),
		}),
		deleteBook: builder.mutation({
			query: (id) => ({
				url: `/api/books/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetBooksQuery,
	useGetBookByIdQuery,
	useAddBookMutation,
	useUpdateBookMutation,
	useDeleteBookMutation,
} = booksApi;
