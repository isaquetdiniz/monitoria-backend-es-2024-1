import { DrizzleBookRepository } from "@/libs/drizzle";
import { Injectable } from "@nestjs/common";
import type {
	CreateBookBody,
	GetBooksQuery,
	UpdateBookBody,
} from "./book.controller";
import { Author } from "./domain/author";
import { Book } from "./domain/book";
import { Genre } from "./domain/genre";
import { Title } from "./domain/title";
import { Year } from "./domain/year";

@Injectable()
export class BookService {
	constructor(private readonly bookRepository: DrizzleBookRepository) {}

	async createBook(params: CreateBookBody) {
		const title = Title.create(params.title);
		const author = Author.create(params.author);
		const genre = Genre.create(params.genre);
		const publishYear = Year.create(params.publishYear);

		const book = Book.create({
			title,
			author,
			genre,
			publishYear,
			quantity: params.quantity,
		});

		return this.bookRepository.createBook(book);
	}

	getBooks(params: GetBooksQuery) {
		return this.bookRepository.getAllByFilter(params);
	}

	getBook(id: string) {
		return this.bookRepository.getById(id);
	}

	async updateBook(id: string, params: UpdateBookBody) {
		const book = await this.bookRepository.getById(id);

		if (!book) {
			throw new Error("Book not found");
		}
	}

	async deleteBook(id: string) {
		const book = await this.bookRepository.getById(id);

		if (!book) {
			throw new Error("Book not found");
		}

		await this.bookRepository.deleteById(id);

		return book;
	}
}
