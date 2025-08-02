export enum NewsGenre {
    BUSINESS = 'Business',
    HEALTH = 'Health',
    TECHNOLOGY = 'Technology',
    OTHER = 'Other'
}

export interface NewPost {
    id: number;
    title: string;
    text: string;
    genre: NewsGenre;
    isPrivate: boolean;
    createDate: Date;
}

export interface PostCreateRequest {
    title: string;
    text: string;
    genre: NewsGenre;
    isPrivate: boolean;
}

export interface PostUpdateRequest {
    title?: string;
    text?: string;
    genre?: NewsGenre;
    isPrivate?: boolean;
}

export interface PaginationParams {
    page: number;
    size: number;
}

export interface PostQueryParams extends PaginationParams {
    genre?: NewsGenre;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        size: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface ErrorResponse {
    message: string;
    status: number;
    stack?: string;
    originalMessage?: string;
}

export interface Repository<T> {
    getAll(params?: PostQueryParams): Promise<PaginatedResponse<T>>;
    getById(id: number): Promise<T | null>;
    create(data: Omit<T, 'id' | 'createDate'>): Promise<T>;
    update(id: number, data: Partial<T>): Promise<T | null>;
    delete(id: number): Promise<boolean>;
}

export interface Service<T> extends Repository<T> {}
