import { applyDecorators } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiOperation,
	ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

export const Documentation = (info: {
	summary: string;
	description: string;
	response: { description: string; type: any };
}) =>
	applyDecorators(
		ApiOperation({
			summary: info.summary,
			description: info.description,
		}),
		ApiOkResponse({
			description: info.response.description,
			type: info.response.type,
		}),
		ApiBadRequestResponse({
			description:
				"If any required params are missing or has invalid format or type.",
		}),
		ApiUnprocessableEntityResponse({
			description:
				"If was not possible process the request because of some wrong information.",
		}),
	);
