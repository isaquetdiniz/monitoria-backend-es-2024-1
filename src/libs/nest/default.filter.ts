import { DomainError } from "@/core/errors";
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";

@Catch(DomainError)
export class DefaultErrorFilter implements ExceptionFilter<DomainError> {
	catch(exception: DomainError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		response.status(422).json({
			status: 422,
			error: exception.name,
			message: exception.message,
		});
	}
}
