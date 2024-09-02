import { randomUUID as uuidV4 } from "node:crypto";
import type { Author } from "./author";
import type { Genre } from "./genre";
import type { Title } from "./title";
import type { Year } from "./year";

export class Book {
	private constructor(private readonly props: BookProps) {}

	static create(params: CreateBookParams) {
		if (params.publishYear.value > new Date().getFullYear()) {
			throw new Error("Not is possible create a book with future publishYear");
		}

		return new Book({
			id: uuidV4(),
			...params,
		});
	}

	toJSON() {
		return {
			...this.props,
			title: this.props.title.value,
			author: this.props.author.value,
			genre: this.props.genre.value,
			publishYear: this.props.publishYear.value,
		};
	}
}

export type BookProps = {
	id: string;
	title: Title;
	author: Author;
	genre: Genre;
	publishYear: Year;
	quantity: number;
};

export type CreateBookParams = Omit<BookProps, "id">;
