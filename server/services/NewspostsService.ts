import type { NewPost, Service, PaginationParams, PaginatedResponse, PostCreateRequest, PostUpdateRequest } from '../types/types';
import { NewspostsRepository } from '../dal/NewspostsRepository';

export class NewspostsService implements Service<NewPost> {
    private repository: NewspostsRepository;

    constructor() {
        this.repository = new NewspostsRepository();
    }

    async getAll(params?: PaginationParams): Promise<PaginatedResponse<NewPost>> {
        try {
            if (params) {
                if (params.page < 0) {
                    throw new Error('Page number cannot be negative');
                }
                if (params.size <= 0 || params.size > 100) {
                    throw new Error('Page size must be between 1 and 100');
                }
            }

            return await this.repository.getAll(params);
        } catch (error) {
            console.error('Error in NewspostsService.getAll:', error);
            throw error;
        }
    }

    async getById(id: string): Promise<NewPost | null> {
        try {
            if (!id || typeof id !== 'string') {
                throw new Error('Invalid post ID');
            }

            return await this.repository.getById(id);
        } catch (error) {
            console.error('Error in NewspostsService.getById:', error);
            throw error;
        }
    }

    async create(data: PostCreateRequest): Promise<NewPost> {
        try {
            if (!data.title || !data.text) {
                throw new Error('Title and text are required');
            }

            if (data.title.length < 3 || data.title.length > 200) {
                throw new Error('Title must be between 3 and 200 characters');
            }

            if (data.text.length < 10 || data.text.length > 5000) {
                throw new Error('Text must be between 10 and 5000 characters');
            }

            return await this.repository.create(data);
        } catch (error) {
            console.error('Error in NewspostsService.create:', error);
            throw error;
        }
    }

    async update(id: string, data: PostUpdateRequest): Promise<NewPost | null> {
        try {
            if (!id || typeof id !== 'string') {
                throw new Error('Invalid post ID');
            }

            if (!data.title && !data.text) {
                throw new Error('At least one field (title or text) must be provided for update');
            }

            if (data.title !== undefined) {
                if (data.title.length < 3 || data.title.length > 200) {
                    throw new Error('Title must be between 3 and 200 characters');
                }
            }

            if (data.text !== undefined) {
                if (data.text.length < 10 || data.text.length > 5000) {
                    throw new Error('Text must be between 10 and 5000 characters');
                }
            }

            return await this.repository.update(id, data);
        } catch (error) {
            console.error('Error in NewspostsService.update:', error);
            throw error;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            if (!id || typeof id !== 'string') {
                throw new Error('Invalid post ID');
            }

            return await this.repository.delete(id);
        } catch (error) {
            console.error('Error in NewspostsService.delete:', error);
            throw error;
        }
    }
}
