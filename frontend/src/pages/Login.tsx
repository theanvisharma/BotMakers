import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import type { AuthResponse } from '../types';
import { Mail, Lock } from 'lucide-react';

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = location.state?.from?.pathname || '/dashboard';

    const loginMutation = useMutation({
        mutationFn: async (data: any) => {
            const response = await api.post<AuthResponse>('/auth/login', data);
            return response.data;
        },
        onSuccess: (data) => {
            login(data.token, data.user);
            navigate(from, { replace: true });
        },
        onError: (error: any) => {
            alert(error.response?.data?.message || 'Login failed');
        }
    });

    const onSubmit = (data: any) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background subtle gradients for dark mode */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-apple-blue/20 blur-[120px] pointer-events-none hidden dark:block"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none hidden dark:block"></div>

            <div className="w-full max-w-md glass-panel rounded-3xl p-8 sm:p-10 z-10 relative">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-semibold tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-apple-gray text-sm">Sign in to your account</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-xs font-semibold text-apple-gray uppercase tracking-wider mb-2">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail size={18} className="text-gray-400" />
                            </div>
                            <input
                                {...register('email', { required: 'Email is required' })}
                                type="email"
                                className="apple-input pl-11"
                                placeholder="name@example.com"
                            />
                        </div>
                        {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message as string}</span>}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-semibold text-apple-gray uppercase tracking-wider">Password</label>
                            <a href="#" className="text-xs font-medium text-apple-blue hover:underline">Forgot?</a>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={18} className="text-gray-400" />
                            </div>
                            <input
                                {...register('password', { required: 'Password is required' })}
                                type="password"
                                className="apple-input pl-11"
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message as string}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full mt-6 bg-apple-blue hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-apple-gray">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-apple-blue font-medium hover:underline">
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    );
};
