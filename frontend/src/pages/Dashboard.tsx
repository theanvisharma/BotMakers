import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === 'ADMIN') {
            navigate('/admin-dashboard', { replace: true });
        } else if (user) {
            navigate('/member-dashboard', { replace: true });
        }
    }, [user, navigate]);

    // Simple loading state while redirecting
    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
            <div className="animate-pulse space-y-4 text-center">
                <div className="h-2 w-12 bg-blue-500/50 rounded mx-auto"></div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Routing...</p>
            </div>
        </div>
    );
};
