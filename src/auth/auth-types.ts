export interface RegisterRequest {
    email: string;
    passowrd: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user:{
        id: number;
        email: string;
    };
}

export interface JWTPayload {
    userId: number;
    email: string;
}