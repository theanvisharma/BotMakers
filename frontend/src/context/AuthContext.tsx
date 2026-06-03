import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { getUser, isTokenValid, removeToken, removeUser, setToken, setUser as setLocalUser } from '../utils/auth';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUserState] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = () => {
            if (isTokenValid()) {
                const storedUser = getUser();
                if (storedUser) {
                    setUserState(storedUser);
                }
            } else {
                removeToken();
                removeUser();
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = (token: string, newUser: User) => {
        setToken(token);
        setLocalUser(newUser);
        setUserState(newUser);
    };

    const logout = () => {
        removeToken();
        removeUser();
        setUserState(null);
    };

    if (isLoading) {
        return <div>Loading...</div>; // Could be a better loading spinner
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
