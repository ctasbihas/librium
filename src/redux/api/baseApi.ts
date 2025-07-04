import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({
		baseUrl:
			import.meta.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
	}),
	endpoints: (builder) => ({
		getBooks: builder.query({
			query: () => "/api/books",
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
} = baseApi;
