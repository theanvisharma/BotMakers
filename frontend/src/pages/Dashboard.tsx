
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, ShieldAlert } from 'lucide-react';

export const Dashboard = () => {
    const { user, logout } = useAuth();

    const userQuery = useQuery({
        queryKey: ['userDashboard'],
        queryFn: async () => {
            const { data } = await api.get('/user/dashboard');
            return data;
        },
    });

    const adminQuery = useQuery({
        queryKey: ['adminDashboard'],
        queryFn: async () => {
            const { data } = await api.get('/admin/dashboard');
            return data;
        },
        enabled: user?.role === 'ADMIN',
    });

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-apple-blue/10 blur-[150px] pointer-events-none hidden dark:block"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none hidden dark:block"></div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 glass-panel border-x-0 border-t-0 rounded-none">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-apple-blue flex items-center justify-center text-white font-bold shadow-lg shadow-apple-blue/30">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <h1 className="text-xl font-semibold tracking-tight">myDashboard</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col text-right">
                                <span className="text-sm font-medium">{user?.name}</span>
                                <span className="text-xs text-apple-gray uppercase tracking-wider">{user?.role}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-300 dark:text-gray-400 dark:hover:text-red-400"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
                
                {/* User Card */}
                <div className="glass-panel rounded-3xl p-8 transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-apple-blue rounded-2xl">
                            <UserIcon size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">User Overview</h2>
                            <p className="text-sm text-apple-gray">Your personal information and status.</p>
                        </div>
                    </div>
                    
                    {userQuery.isLoading ? (
                        <div className="animate-pulse flex space-x-4">
                            <div className="flex-1 space-y-4 py-1">
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                            </div>
                        </div>
                    ) : userQuery.isError ? (
                        <p className="text-red-500 text-sm">Error loading user dashboard</p>
                    ) : (
                        <div className="bg-gray-100 dark:bg-[#1c1c1e] p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                            <pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-300 font-mono">
                                {JSON.stringify(userQuery.data, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>

                {/* Admin Card */}
                {user?.role === 'ADMIN' && (
                    <div className="glass-panel rounded-3xl p-8 border-l-4 border-l-purple-500 transition-transform hover:-translate-y-1 duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl">
                                <ShieldAlert size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold">Admin Controls</h2>
                                <p className="text-sm text-apple-gray">System-wide metrics and settings.</p>
                            </div>
                        </div>

                        {adminQuery.isLoading ? (
                            <div className="animate-pulse flex space-x-4">
                                <div className="flex-1 space-y-4 py-1">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                                </div>
                            </div>
                        ) : adminQuery.isError ? (
                            <p className="text-red-500 text-sm">Error loading admin dashboard</p>
                        ) : (
                            <div className="bg-purple-50 dark:bg-[#1c1c1e] p-6 rounded-2xl border border-purple-100 dark:border-purple-500/20">
                                <pre className="text-sm overflow-x-auto text-purple-900 dark:text-purple-300 font-mono">
                                    {JSON.stringify(adminQuery.data, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};
