import { z } from 'zod';
import {
	OpenAPIRegistry,
	OpenApiGeneratorV3,
	extendZodWithOpenApi,
} from '@asteasolutions/zod-to-openapi';
import { amountSchema } from './schemas';
import type { OpenAPIObject } from 'openapi3-ts/oas30';

extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();

registry.register('AmountDto', amountSchema);

registry.registerPath({
	method: 'post',
	path: '/deposit',
	request: {
		body: { content: { 'application/json': { schema: amountSchema } } },
	},
	responses: {
		200: { description: 'Deposit successful' },
		400: { description: 'Validation error' },
	},
});

registry.registerPath({
	method: 'post',
	path: '/withdraw',
	request: {
		body: { content: { 'application/json': { schema: amountSchema } } },
	},
	responses: {
		200: { description: 'Withdrawal successful' },
		400: { description: 'Validation error' },
	},
});

registry.registerPath({
	method: 'get',
	path: '/statement',
	responses: {
		200: { description: 'Statement returned' },
	},
});

export function buildOpenApiDocument(): OpenAPIObject {
	const generator = new OpenApiGeneratorV3(registry.definitions);

	return generator.generateDocument({
		openapi: '3.0.0',
		info: {
			title: 'Bank Account API',
			version: '1.0.0',
		},
	});
}
