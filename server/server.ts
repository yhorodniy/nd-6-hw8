import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';

import staticGet from './routes/staticGet';
import newsPosts from './routes/newsPosts';
import { requestLogger } from './helpers/requestLogger';
import { errorHandler } from './helpers/errorHandler';
import { logger } from './helpers/logger';
import { CLIENT_DIST } from './config/paths';
import { triggerError } from './controller/newspostsController';

dotenv.config();

const app: Application = express();
const PORT: string | number = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static(CLIENT_DIST));
app.use(cors({
    origin: process.env.REDIRECT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(requestLogger);

app.use('/api/newsposts', newsPosts);
app.use('/', staticGet);

app.use('/error', triggerError);

app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);  
});
