export interface NewPost {
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

export interface PaginationParams {
    page: number;
    size: number;
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

export interface Repository<T> {
    getAll(params?: PaginationParams): Promise<PaginatedResponse<T>>;
    getById(id: string): Promise<T | null>;
    create(data: Omit<T, 'id' | 'createDate'>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}

export interface Service<T> extends Repository<T> {}
