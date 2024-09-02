import { Module } from "@nestjs/common";
import { DrizzleBookRepository } from "./books.repository";

@Module({
	providers: [DrizzleBookRepository],
	exports: [DrizzleBookRepository],
})
export class DrizzleModule {}
