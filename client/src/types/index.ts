export interface Post {
    id: string;
    title: string;
    text: string;
    createDate?: Date;
}

export interface PostCreateRequest {
    title: string;
    text: string;
}

export interface PostUpdateRequest {
    title?: string;
    text?: string;
}

// Типи для пагінації
export interface PaginationParams {
    page: number;
    size: number;
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
