import dotenv from 'dotenv';
import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';

import staticGet from './routes/staticGet';
import newsPosts from './routes/newsPosts';

dotenv.config();

const app: Application = express();
const staticDirPath = path.resolve(__dirname, '../client/dist');
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(staticDirPath));
app.use(cors({
    origin: process.env.REDIRECT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use('/api/newsposts', newsPosts);
app.use('/', staticGet);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);  
});
