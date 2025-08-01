import express, { Request, Response } from 'express';
import path from 'path';

const router = express.Router();
const reactAppPath = path.resolve(__dirname, '../../client/dist/index.html');

router.get('/', (req: Request, res: Response) => {
    try {
        res.sendFile(reactAppPath);
    } catch (error) {
        res.status(404).json({ error: 'React app not found' });
    }
});

export default router;
