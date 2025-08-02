import { Request, Response, NextFunction } from 'express';
import { logger } from '../helpers/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    const logData = {
        method: req.method,
        url: req.url,
        body: req.body && Object.keys(req.body).length > 0 ? req.body : undefined
    };

    logger.info('Incoming request', logData);
    next();
};
