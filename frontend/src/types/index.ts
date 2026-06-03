export type Role = 'USER' | 'ADMIN';

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface DecodedToken {
    sub: string;
    exp: number;
    iat: number;
}
