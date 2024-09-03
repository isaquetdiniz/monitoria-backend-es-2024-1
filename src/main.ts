import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { BookModule } from "./book";
import { openapi } from "./libs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(BookModule);

	openapi(app);

	app.enableShutdownHooks();

	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	await app.listen(3000);
}

bootstrap();
