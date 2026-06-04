
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import type { AuthResponse } from '../types';
import { User, ShieldCheck, Mail, Lock, User as UserIcon } from 'lucide-react';

export const Register = () => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: { role: 'USER', name: '', email: '', password: '' }
    });
    const navigate = useNavigate();
    const { login } = useAuth();
    const currentRole = watch('role');

    const registerMutation = useMutation({
        mutationFn: async (data: any) => {
            const response = await api.post<AuthResponse>('/auth/register', data);
            return response.data;
        },
        onSuccess: (data) => {
            login(data.token, data.user);
            navigate('/dashboard', { replace: true });
        },
        onError: (error: any) => {
            alert(error.response?.data?.message || 'Registration failed');
        }
    });

    const onSubmit = (data: any) => {
        registerMutation.mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background subtle gradients for dark mode */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-apple-blue/20 blur-[120px] pointer-events-none hidden dark:block"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none hidden dark:block"></div>

            <div className="w-full max-w-md glass-panel rounded-3xl p-8 sm:p-10 z-10 relative">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold tracking-tight mb-2">Create Account</h1>
                    <p className="text-apple-gray text-sm">Select your role and sign up</p>
                </div>

                {/* Role Segmented Control */}
                <div className="p-1 bg-gray-100 dark:bg-[#1c1c1e] rounded-xl flex mb-8 border border-gray-200 dark:border-white/10">
                    <button
                        type="button"
                        onClick={() => setValue('role', 'USER')}
                        className={`role-toggle-btn ${currentRole === 'USER' ? 'role-toggle-active' : 'role-toggle-inactive'}`}
                    >
                        <User size={16} /> Member
                    </button>
                    <button
                        type="button"
                        onClick={() => setValue('role', 'ADMIN')}
                        className={`role-toggle-btn ${currentRole === 'ADMIN' ? 'role-toggle-active' : 'role-toggle-inactive'}`}
                    >
                        <ShieldCheck size={16} /> Admin
                    </button>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-xs font-semibold text-apple-gray uppercase tracking-wider mb-2">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <UserIcon size={18} className="text-gray-400" />
                            </div>
                            <input
                                {...register('name', { required: 'Name is required' })}
                                type="text"
                                className="apple-input pl-11"
                                placeholder="John Doe"
                            />
                        </div>
                        {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message as string}</span>}
                    </div>

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
                        <label className="block text-xs font-semibold text-apple-gray uppercase tracking-wider mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={18} className="text-gray-400" />
                            </div>
                            <input
                                {...register('password', { 
                                    required: 'Password is required', 
                                    minLength: { value: 6, message: 'Minimum 6 characters' },
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
                                        message: 'Must contain at least 1 letter and 1 number'
                                    }
                                })}
                                type="password"
                                className="apple-input pl-11"
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message as string}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={registerMutation.isPending}
                        className="w-full mt-6 bg-apple-blue hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {registerMutation.isPending ? 'Processing...' : 'Continue'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-apple-gray">
                    Already have an account?{' '}
                    <Link to="/login" className="text-apple-blue font-medium hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};
