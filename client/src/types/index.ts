export const NewsGenre = {
    BUSINESS: 'Business',
    HEALTH: 'Health', 
    TECHNOLOGY: 'Technology',
    OTHER: 'Other'
} as const;

export type NewsGenreType = typeof NewsGenre[keyof typeof NewsGenre];

export interface Post {
    id: number;
    title: string;
    text: string;
    genre: NewsGenreType;
    isPrivate: boolean;
    createDate: Date;
}

export interface PostCreateRequest {
    title: string;
    text: string;
    genre: NewsGenreType;
    isPrivate: boolean;
}

export interface PostUpdateRequest {
    title?: string;
    text?: string;
    genre?: NewsGenreType;
    isPrivate?: boolean;
}

// Типи для пагінації
export interface PaginationParams {
    page: number;
    size: number;
}

export interface PostQueryParams extends PaginationParams {
    genre?: NewsGenreType;
}

export interface PaginationInfo {
    page: number;
    size: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: PaginationInfo;
}
