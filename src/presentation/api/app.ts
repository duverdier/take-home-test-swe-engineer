import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { buildOpenApiDocument } from './openapi';
import { createRoutes } from './routes';
import { BankAccountImpl } from '../../domain/repositories/bank-account-impl';
import { SystemClock } from '../../infrastructure/system-clock';
import { StatementPrinter } from '../statement-printer';

const app = express();
app.use(express.json());

const account = new BankAccountImpl(new SystemClock(), new StatementPrinter());

app.use(createRoutes(account));

const doc = buildOpenApiDocument();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(doc));

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT ? +process.env.PORT : 3000;
const api = process.env.API ? process.env.API : 'http://localhost';
app.listen(port, () => {
	console.log(`API listening on ${api}:${port}`);
	console.log(`Swagger UI on ${api}:${port}/docs`);
});
