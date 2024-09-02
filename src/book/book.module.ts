import { DrizzleModule } from "@/libs/drizzle";
import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";

@Module({
	imports: [DrizzleModule],
	controllers: [BookController],
	providers: [BookService],
})
export class BookModule {}
