import { jwtDecode } from 'jwt-decode';
import type { DecodedToken, User } from '../types';

export const setToken = (token: string) => {
    localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const setUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
    localStorage.removeItem('user');
};

export const isTokenValid = (): boolean => {
    const token = getToken();
    if (!token) return false;

    try {
        const decoded = jwtDecode<DecodedToken>(token);
        // exp is in seconds, Date.now() is in ms
        if (decoded.exp * 1000 < Date.now()) {
            removeToken();
            removeUser();
            return false;
        }
        return true;
    } catch {
        return false;
    }
};
