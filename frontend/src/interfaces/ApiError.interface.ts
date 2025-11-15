export interface ApiError {
    message: string;
    statusCode?: number;
}

export class ApiException extends Error implements ApiError {
    public readonly statusCode?: number;

    constructor(message: string, statusCode?: number) {
        super(message);
        this.name = "ApiException";
        this.statusCode = statusCode;
    }
}
