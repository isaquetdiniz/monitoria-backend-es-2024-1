import { DefaultErrorFilter } from "@/libs/nest";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { BookModule } from "./book";
import { openapi } from "./libs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(BookModule);

	openapi(app);

	app.useGlobalFilters(new DefaultErrorFilter());
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	app.enableShutdownHooks();

	await app.listen(3000);
}

bootstrap();
