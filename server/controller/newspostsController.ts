import { Request, Response } from 'express';
import { NewspostsService } from '../services/NewspostsService';
import type { PaginationParams, PostCreateRequest, PostUpdateRequest } from '../types/types';

const newspostsService = new NewspostsService();

export const getNewsPosts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const page = parseInt(req.query.page as string) || 0;
        const size = parseInt(req.query.size as string) || 10;

        const params: PaginationParams = { page, size };
        const posts = await newspostsService.getAll(params);

        return res.status(200).json(posts);
    } catch (error) {
        console.error('Error in getNewsPosts:', error);
        const message = error instanceof Error ? error.message : 'Server error';
        return res.status(400).json({ message });
    }
};

export const getSinglePost = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const post = await newspostsService.getById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error('Error in getSinglePost:', error);
        const message = error instanceof Error ? error.message : 'Server error';
        return res.status(400).json({ message });
    }
};

export const createPost = async (req: Request<{}, {}, PostCreateRequest>, res: Response): Promise<Response> => {
    try {
        const newPost = await newspostsService.create(req.body);
        return res.status(201).json(newPost);
    } catch (error) {
        console.error('Error in createPost:', error);
        const message = error instanceof Error ? error.message : 'Server error';
        return res.status(400).json({ message });
    }
};

export const updatePost = async (req: Request<{ id: string }, {}, PostUpdateRequest>, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const updatedPost = await newspostsService.update(id, req.body);

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error in updatePost:', error);
        const message = error instanceof Error ? error.message : 'Server error';
        return res.status(400).json({ message });
    }
};

export const deletePost = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const deleted = await newspostsService.delete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error in deletePost:', error);
        const message = error instanceof Error ? error.message : 'Server error';
        return res.status(500).json({ message });
    }
};
