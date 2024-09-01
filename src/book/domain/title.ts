import { ValueObject } from "@/core/value-object";
import { isString, length } from "class-validator";

export class Title extends ValueObject {
	private constructor(name: string) {
		super({ value: name });
	}

	static create(name: string) {
		return new Title(name);
	}

	validate(name: string) {
		if (!name) {
			throw new Error("Title is required");
		}

		if (!isString(name)) {
			throw new Error("Title must to be a string");
		}

		if (!length(name, 1, 255)) {
			throw new Error("Title must have at least 1 char and 255 in max");
		}
	}
}
