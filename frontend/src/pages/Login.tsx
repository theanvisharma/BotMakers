import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import type { AuthResponse } from '../types';
import { ShieldCheck, ArrowRight, User } from 'lucide-react';
import { useState } from 'react';

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [role, setRole] = useState('USER');
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = location.state?.from?.pathname || '/dashboard';

    const loginMutation = useMutation({
        mutationFn: async (data: any) => {
            // We pass the selected role to the login request (optional, backend usually infers from email)
            const response = await api.post<AuthResponse>('/auth/login', { ...data, role });
            return response.data;
        },
        onSuccess: (data) => {
            login(data.token, data.user);
            navigate(from, { replace: true });
        },
        onError: (error: any) => {
            const message = error.response?.status === 401 || error.response?.status === 403 
                ? 'Invalid credentials' 
                : (error.response?.data?.message || 'Login failed');
            alert(message);
        }
    });

    const onSubmit = (data: any) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 font-sans text-white">
            <div className="w-full max-w-[400px] bg-[#0A0A0A] p-2 flex flex-col items-center relative">
                
                {/* Shield Icon */}
                <div className="w-16 h-16 bg-[#11161F] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <ShieldCheck size={28} className="text-blue-500" />
                </div>

                {/* Headers */}
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-center leading-tight mb-2">
                    Welcome
                </h1>
                <p className="text-[#5A6F8F] text-sm mb-6">Select your role and sign in</p>

                {/* Role Switcher */}
                <div className="w-full bg-[#1C1C1E] p-1 rounded-xl flex mb-6">
                    <button
                        type="button"
                        onClick={() => setRole('USER')}
                        className={`flex-1 py-2.5 text-sm font-semibold rounded-lg flex justify-center items-center gap-2 transition-all duration-300 ${
                            role === 'USER' 
                            ? 'bg-black text-blue-500 shadow-md' 
                            : 'text-gray-500 hover:text-gray-400'
                        }`}
                    >
                        <User size={16} /> Member
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('ADMIN')}
                        className={`flex-1 py-2.5 text-sm font-semibold rounded-lg flex justify-center items-center gap-2 transition-all duration-300 ${
                            role === 'ADMIN' 
                            ? 'bg-black text-blue-500 shadow-md' 
                            : 'text-gray-500 hover:text-gray-400'
                        }`}
                    >
                        <ShieldCheck size={16} /> Admin
                    </button>
                </div>



                <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                            Email Address
                        </label>
                        <input
                            {...register('email', { required: 'Email is required' })}
                            type="email"
                            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-gray-600"
                            placeholder="name@example.com"
                        />
                        {errors.email && <span className="text-red-500 text-xs mt-1 ml-1 block">{errors.email.message as string}</span>}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5 ml-1 mr-1">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                Password
                            </label>
                            <a href="#" className="text-[10px] font-medium text-[#3B82F6] hover:underline">
                                Forgot?
                            </a>
                        </div>
                        <input
                            {...register('password', { required: 'Password is required' })}
                            type="password"
                            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-gray-600"
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1 ml-1 block">{errors.password.message as string}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full mt-8 bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold py-3.5 px-4 rounded-xl transition-colors duration-300 disabled:opacity-50 flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    >
                        {loginMutation.isPending ? 'Processing...' : (
                            <>
                                <ArrowRight size={18} /> Sign In as {role === 'USER' ? 'Member' : 'Admin'}
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/register" className="text-xs text-[#5A6F8F] hover:text-white transition-colors">
                        Create an account
                    </Link>
                </div>

                <div className="mt-12 text-[9px] font-bold tracking-[0.2em] text-gray-600">
                    SECURE • PROFESSIONAL • VERIFIED
                </div>
            </div>
        </div>
    );
};
