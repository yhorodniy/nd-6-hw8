import axios from 'axios';
import type { Post, PostCreateRequest, PostUpdateRequest, PaginatedResponse, PostQueryParams } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const newsAPI = {
    getAllPosts: async (params?: PostQueryParams): Promise<PaginatedResponse<Post>> => {
        const queryParams = new URLSearchParams();
        if (params) {
            queryParams.append('page', params.page.toString());
            queryParams.append('size', params.size.toString());
            if (params.genre) {
                queryParams.append('genre', params.genre);
            }
        }
        
        const response = await api.get<PaginatedResponse<Post>>(`/newsposts?${queryParams.toString()}`);
        return response.data;
    },

    getPostById: async (id: number): Promise<Post> => {
        const response = await api.get<Post>(`/newsposts/${id}`);
        return response.data;
    },

    createPost: async (post: PostCreateRequest): Promise<Post> => {
        const response = await api.post<Post>('/newsposts', post);
        return response.data;
    },

    updatePost: async (id: number, post: PostUpdateRequest): Promise<Post> => {
        const response = await api.put<Post>(`/newsposts/${id}`, post);
        return response.data;
    },

    deletePost: async (id: number): Promise<void> => {
        await api.delete(`/newsposts/${id}`);
    },
};
