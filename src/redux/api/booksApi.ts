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
			providesTags: (id) => [
				{ type: "book", id },
				{ type: "book", id: "LIST" },
			],
		}),
		addBook: builder.mutation({
			query: (book) => ({
				url: "/api/books",
				method: "POST",
				body: book,
			}),
			invalidatesTags: [{ type: "book", id: "LIST" }],
		}),
		updateBook: builder.mutation({
			query: ({ id, book }) => ({
				url: `/api/books/${id}`,
				method: "PUT",
				body: book,
			}),
			invalidatesTags: ({ id }) => [
				{ type: "book", id },
				{ type: "book", id: "LIST" },
			],
		}),
		deleteBook: builder.mutation({
			query: (id) => ({
				url: `/api/books/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (id) => [
				{ type: "book", id },
				{ type: "book", id: "LIST" },
			],
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
