import { Request, Response, NextFunction } from 'express';
import { NewspostsService } from '../services/NewspostsService';
import { NewsGenre } from '../types/types';
import type { PostQueryParams, PostCreateRequest, PostUpdateRequest } from '../types/types';

const newspostsService = new NewspostsService();

export const getNewsPosts = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const page = parseInt(req.query.page as string) || 0;
        const size = parseInt(req.query.size as string) || 10;
        const genre = req.query.genre as NewsGenre | undefined;

        const params: PostQueryParams = { page, size };
        if (genre && Object.values(NewsGenre).includes(genre)) {
            params.genre = genre;
        }

        const posts = await newspostsService.getAll(params);

        return res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

export const getSinglePost = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new Error('Invalid post ID - must be a number');
        }

        const post = await newspostsService.getById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

export const createPost = async (req: Request<{}, {}, PostCreateRequest>, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const newPost = await newspostsService.create(req.body);
        return res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
};

export const updatePost = async (req: Request<{ id: string }, {}, PostUpdateRequest>, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new Error('Invalid post ID - must be a number');
        }

        const updatedPost = await newspostsService.update(id, req.body);

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
};

export const deletePost = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new Error('Invalid post ID - must be a number');
        }

        const deleted = await newspostsService.delete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const triggerError = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await newspostsService.triggerError();
    } catch (error) {
        next(error);
    }
};
