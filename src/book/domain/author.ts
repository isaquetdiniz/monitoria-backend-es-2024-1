import { ValueObject } from "@/core/value-object";
import { isString, length } from "class-validator";

export class Author extends ValueObject {
	private constructor(name: string) {
		super(name);
	}

	static create(name: string) {
		return new Author(name);
	}

	validate(name: string) {
		if (!name) {
			throw new Error("Author is required");
		}

		if (!isString(name)) {
			throw new Error("Author must to be a string");
		}

		if (!length(name, 1, 255)) {
			throw new Error("Author must have at least 1 char and 255 in max");
		}
	}
}
