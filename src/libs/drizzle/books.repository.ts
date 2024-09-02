import type { Book } from "@/book/domain/book";
import { Injectable } from "@nestjs/common";
import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import {
	type BetterSQLite3Database,
	drizzle,
} from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

@Injectable()
export class DrizzleBookRepository {
	private readonly db: BetterSQLite3Database<typeof schema>;

	constructor() {
		const connection = new Database("sqlite.db");

		this.db = drizzle(connection, { schema });
	}

	async createBook(book: Book) {
		const bookJSON = book.toJSON();

		await this.db.insert(schema.books).values({
			id: bookJSON.id,
			title: bookJSON.title,
			author: bookJSON.author,
			genre: bookJSON.genre,
			publishYear: bookJSON.publishYear,
			quantity: bookJSON.quantity,
		});

		return book;
	}

	async getAllByFilter(filter: { genre?: string }) {
		return this.db.query.books.findMany({
			...(filter.genre && { where: eq(schema.books.genre, filter.genre) }),
		});
	}

	async getById(id: string) {
		return this.db.query.books.findFirst({
			where: eq(schema.books.id, id),
		});
	}

	async deleteById(id: string) {
		return this.db.delete(schema.books).where(eq(schema.books.id, id));
	}
}
