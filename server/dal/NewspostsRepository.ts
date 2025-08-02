import fsPromises from 'fs/promises';
import path from 'path';
import type { NewPost, Repository, PaginationParams, PaginatedResponse, PostQueryParams, NewsGenre } from '../types/types';
import { ensureDataFileExists, saveData } from '../helpers/helper';

export class NewspostsRepository implements Repository<NewPost> {
    async getAll(params?: PostQueryParams): Promise<PaginatedResponse<NewPost>> {
        const allPosts = await ensureDataFileExists();

        // Фільтрація за жанром, якщо вказано
        const filteredPosts = params?.genre 
            ? allPosts.filter(post => post.genre === params.genre)
            : allPosts;

        const page = params?.page || 0;
        const size = params?.size || 10;
        
        if (page < 0 || size <= 0) {
            throw new Error('Invalid pagination parameters');
        }
        
        const total = filteredPosts.length;
        const totalPages = Math.ceil(total / size);
        const startIndex = page * size;
        const endIndex = startIndex + size;
        
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
        
        return {
            data: paginatedPosts,
            pagination: {
                page,
                size,
                total,
                totalPages,
                hasNext: (page + 1) < totalPages,
                hasPrev: page > 0
            }
        };
    }

    async getById(id: number): Promise<NewPost | null> {
        const posts = await ensureDataFileExists(false);
        const post = posts.find(p => p.id === id);
        return post || null;
    }

    async create(data: Omit<NewPost, 'id' | 'createDate'>): Promise<NewPost> {
        const posts = await ensureDataFileExists();
        
        const maxId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0;
        
        const newPost: NewPost = {
            id: maxId + 1,
            ...data,
            createDate: new Date()
        };
        
        posts.push(newPost);
        await saveData(posts);
        
        return newPost;
    }

    async update(id: number, data: Partial<NewPost>): Promise<NewPost | null> {
        const posts = await ensureDataFileExists();
        const postIndex = posts.findIndex(p => p.id === id);
        
        if (postIndex === -1) {
            return null;
        }
        
        const allowedFields = ['title', 'text', 'genre', 'isPrivate'];
        const updateData: Partial<NewPost> = {};
        
        Object.keys(data).forEach(key => {
            if (allowedFields.includes(key) && data[key as keyof NewPost] !== undefined) {
                (updateData as any)[key] = data[key as keyof NewPost];
            }
        });
        
        posts[postIndex] = { ...posts[postIndex], ...updateData };
        await saveData(posts);
        
        return posts[postIndex];
    }

    async delete(id: number): Promise<boolean> {
        const posts = await ensureDataFileExists();
        const initialLength = posts.length;
        const filteredPosts = posts.filter(p => p.id !== id);
        
        if (filteredPosts.length === initialLength) {
            return false;
        }
        
        await saveData(filteredPosts);
        return true;
    }
}
