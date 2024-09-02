import { ValueObject } from "@/core/value-object";
import { isString, length } from "class-validator";

export class Genre extends ValueObject {
	private constructor(name: string) {
		super(name);
	}

	static create(name: string) {
		return new Genre(name);
	}

	validate(name: string) {
		if (!name) {
			throw new Error("Genre is required");
		}

		if (!isString(name)) {
			throw new Error("Genre must to be a string");
		}

		if (!length(name, 1, 255)) {
			throw new Error("Genre must have at least 1 char and 255 in max");
		}
	}
}
