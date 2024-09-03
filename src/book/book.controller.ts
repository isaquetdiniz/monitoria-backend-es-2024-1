import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiOperation,
	ApiProperty,
	ApiPropertyOptional,
	ApiTags,
	ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import {
	IsInt,
	IsOptional,
	IsString,
	IsUUID,
	Length,
	Min,
} from "class-validator";
import { BookService } from "./book.service";

export class CreateBookBody {
	@ApiProperty({
		description: "The book tile",
		example: "Era uma vez",
	})
	@IsString()
	@Length(1, 255)
	title: string;

	@ApiProperty({
		description: "The book author",
		example: "Carlinhos bala",
	})
	@IsString()
	@Length(1, 255)
	author: string;

	@ApiProperty({
		description: "The book genre",
		example: "Romance",
	})
	@IsString()
	@Length(1, 255)
	genre: string;

	@ApiProperty({
		description: "The book publish year",
		example: 1948,
	})
	@IsInt()
	@Min(0)
	publishYear: number;

	@ApiProperty({
		description: "The book stock quantity",
		example: 140,
	})
	@IsInt()
	@Min(0)
	quantity: number;
}

export class GetBooksQuery {
	@ApiPropertyOptional({
		description: "The book genre to search for",
	})
	@IsOptional()
	@IsString()
	@Length(1, 255)
	genre?: string;
}

export class GetBookByIdParams {
	@ApiProperty({
		description: "The book id",
	})
	@IsUUID(4)
	id: string;
}

export class UpdateBookBody {
	@ApiPropertyOptional({
		description: "The book tile",
		example: "Era uma vez",
	})
	@IsOptional()
	@IsString()
	@Length(1, 255)
	title?: string;

	@ApiPropertyOptional({
		description: "The book author",
		example: "Carlinhos bala",
	})
	@IsOptional()
	@IsString()
	@Length(1, 255)
	author?: string;

	@ApiPropertyOptional({
		description: "The book genre",
		example: "Romance",
	})
	@IsOptional()
	@IsString()
	@Length(1, 255)
	genre?: string;

	@ApiPropertyOptional({
		description: "The book publish year",
		example: 1948,
	})
	@IsOptional()
	@IsInt()
	@Min(0)
	publishYear?: number;

	@ApiPropertyOptional({
		description: "The book stock quantity",
		example: 140,
	})
	@IsOptional()
	@IsInt()
	@Min(0)
	quantity?: number;
}

export class BookDTO {
	@ApiProperty({
		description: "The book id",
		example: "850f1fa5-6cf0-4768-ac6f-bf23d87bdc97",
	})
	id: string;

	@ApiProperty({
		description: "The book tile",
		example: "Era uma vez",
	})
	title: string;

	@ApiProperty({
		description: "The book author",
		example: "Carlinhos bala",
	})
	author: string;

	@ApiProperty({
		description: "The book genre",
		example: "Romance",
	})
	genre: string;

	@ApiProperty({
		description: "The book publish year",
		example: 1948,
	})
	publishYear: number;

	@ApiProperty({
		description: "The book stock quantity",
		example: 140,
	})
	quantity: number;
}

export class BookDetailDTO {
	@ApiProperty({
		description: "The books details",
	})
	data: BookDTO;
}

export class BooksListDTO {
	@ApiProperty({
		description: "The books list",
		isArray: true,
		type: BookDTO,
	})
	data: BookDTO[];
}

@Controller("books")
@ApiTags("Books")
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@ApiOperation({
		summary: "Create a new book.",
		description: "Create a new book.",
	})
	@ApiOkResponse({
		description: "The book created successfully.",
		type: BookDetailDTO,
	})
	@ApiBadRequestResponse({
		description:
			"If any required params are missing or has invalid format or type.",
	})
	@ApiUnprocessableEntityResponse({
		description:
			"If was not possible process the request because of some wrong information.",
	})
	@Post()
	async createBook(@Body() body: CreateBookBody) {
		const book = await this.bookService.createBook(body);

		return {
			data: book,
		};
	}

	@ApiOperation({
		summary: "Get a books list.",
		description: "Get a books list by filter.",
	})
	@ApiOkResponse({
		description: "The books list returned successfully.",
		type: BooksListDTO,
	})
	@ApiBadRequestResponse({
		description:
			"If any required params are missing or has invalid format or type.",
	})
	@ApiUnprocessableEntityResponse({
		description:
			"If was not possible process the request because of some wrong information.",
	})
	@Get()
	async getBooks(@Query() query: GetBooksQuery) {
		const books = await this.bookService.getBooks(query);

		return { data: books };
	}

	@ApiOperation({
		summary: "Get a book.",
		description: "Get a book by id.",
	})
	@ApiOkResponse({
		description: "The book returned successfully.",
		type: BookDetailDTO,
	})
	@ApiBadRequestResponse({
		description:
			"If any required params are missing or has invalid format or type.",
	})
	@ApiUnprocessableEntityResponse({
		description:
			"If was not possible process the request because of some wrong information.",
	})
	@Get(":id")
	async getBookById(@Param() params: GetBookByIdParams) {
		const book = await this.bookService.getBook(params.id);

		return {
			data: book,
		};
	}

	@ApiOperation({
		summary: "Update a book.",
		description: "Update a book.",
	})
	@ApiOkResponse({
		description: "The book updated successfully.",
		type: BookDetailDTO,
	})
	@ApiBadRequestResponse({
		description:
			"If any required params are missing or has invalid format or type.",
	})
	@ApiUnprocessableEntityResponse({
		description:
			"If was not possible process the request because of some wrong information.",
	})
	@Patch(":id")
	async updateBook(
		@Param() params: GetBookByIdParams,
		@Body() body: UpdateBookBody,
	) {
		const book = await this.bookService.updateBook(params.id, body);

		return {
			data: book,
		};
	}

	@ApiOperation({
		summary: "Delete a book.",
		description: "Delete a book by id.",
	})
	@ApiOkResponse({
		description: "The book deleted successfully.",
		type: BookDetailDTO,
	})
	@ApiBadRequestResponse({
		description:
			"If any required params are missing or has invalid format or type.",
	})
	@ApiUnprocessableEntityResponse({
		description:
			"If was not possible process the request because of some wrong information.",
	})
	@Delete(":id")
	async deleteBook(@Param() params: GetBookByIdParams) {
		const book = await this.bookService.deleteBook(params.id);

		return {
			data: book,
		};
	}
}
