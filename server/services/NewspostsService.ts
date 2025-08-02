import type { NewPost, Service, PaginationParams, PaginatedResponse, PostCreateRequest, PostUpdateRequest, PostQueryParams } from '../types/types';
import { NewspostsRepository } from '../dal/NewspostsRepository';
import { ValidationError, NewspostsServiceError } from '../helpers/errors';
import { validateData, validateCreateNewspost, validateUpdateNewspost } from '../helpers/validator';
import { logger } from '../helpers/logger';

export class NewspostsService implements Service<NewPost> {
    private repository: NewspostsRepository;

    constructor() {
        this.repository = new NewspostsRepository();
    }

    async getAll(params?: PostQueryParams): Promise<PaginatedResponse<NewPost>> {
        try {
            if (params) {
                if (params.page < 0) {
                    throw new ValidationError('Page number cannot be negative');
                }
                if (params.size <= 0 || params.size > 100) {
                    throw new ValidationError('Page size must be between 1 and 100');
                }
            }

            return await this.repository.getAll(params);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            }
            logger.error('Error in NewspostsService.getAll:', error);
            throw new NewspostsServiceError('Failed to retrieve posts', error as Error);
        }
    }

    async getById(id: number): Promise<NewPost | null> {
        try {
            if (!id || typeof id !== 'number' || id <= 0) {
                throw new ValidationError('Invalid post ID - must be a positive number');
            }

            return await this.repository.getById(id);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            }
            logger.error('Error in NewspostsService.getById:', error);
            throw new NewspostsServiceError('Failed to retrieve post', error as Error);
        }
    }

    async create(data: PostCreateRequest): Promise<NewPost> {
        try {
            validateData(data, validateCreateNewspost, 'Post creation failed');

            return await this.repository.create(data);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            }
            logger.error('Error in NewspostsService.create:', error);
            throw new NewspostsServiceError('Failed to create post', error as Error);
        }
    }

    async update(id: number, data: PostUpdateRequest): Promise<NewPost | null> {
        try {
            if (!id || typeof id !== 'number' || id <= 0) {
                throw new ValidationError('Invalid post ID - must be a positive number');
            }

            if (!data || Object.keys(data).length === 0) {
                throw new ValidationError('At least one field must be provided for update');
            }

            validateData(data, validateUpdateNewspost, 'Post update failed');

            return await this.repository.update(id, data);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            }
            logger.error('Error in NewspostsService.update:', error);
            throw new NewspostsServiceError('Failed to update post', error as Error);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            if (!id || typeof id !== 'number' || id <= 0) {
                throw new ValidationError('Invalid post ID - must be a positive number');
            }

            return await this.repository.delete(id);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            }
            logger.error('Error in NewspostsService.delete:', error);
            throw new NewspostsServiceError('Failed to delete post', error as Error);
        }
    }

    async triggerError(): Promise<never> {
        throw new NewspostsServiceError('This is a demo error from NewspostsService');
    }
}
