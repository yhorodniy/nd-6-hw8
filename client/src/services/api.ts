import axios from 'axios';
import type { Post, PostCreateRequest, PostUpdateRequest, PaginatedResponse, PaginationParams } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const newsAPI = {
    getAllPosts: async (params?: PaginationParams): Promise<PaginatedResponse<Post>> => {
        const queryParams = new URLSearchParams();
        if (params) {
            queryParams.append('page', params.page.toString());
            queryParams.append('size', params.size.toString());
        }
        
        const response = await api.get<PaginatedResponse<Post>>(`/newsposts?${queryParams.toString()}`);
        return response.data;
    },

    getPostById: async (id: string): Promise<Post> => {
        const response = await api.get<Post>(`/newsposts/${id}`);
        return response.data;
    },

    createPost: async (post: PostCreateRequest): Promise<Post> => {
        const response = await api.post<Post>('/newsposts', post);
        return response.data;
    },

    updatePost: async (id: string, post: PostUpdateRequest): Promise<Post> => {
        const response = await api.put<Post>(`/newsposts/${id}`, post);
        return response.data;
    },

    deletePost: async (id: string): Promise<void> => {
        await api.delete(`/newsposts/${id}`);
    },
};
