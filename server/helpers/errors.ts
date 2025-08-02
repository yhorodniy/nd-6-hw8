export class ValidationError extends Error {
    constructor(message: string, public details?: any) {
        super(message);
        this.name = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

export class NewspostsServiceError extends Error {
    constructor(message: string, public originalError?: Error) {
        super(message);
        this.name = 'NewspostsServiceError';
        Object.setPrototypeOf(this, NewspostsServiceError.prototype);
    }
}
