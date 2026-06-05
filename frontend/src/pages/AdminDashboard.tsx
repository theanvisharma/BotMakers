import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { LogOut, ShieldAlert } from 'lucide-react';
import TextType from '../components/TextType';
import MagicRings from '../components/MagicRings';
import ReflectiveCard from '../components/ReflectiveCard';
import MagicBento from '../components/MagicBento';

export const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const adminQuery = useQuery({
        queryKey: ['adminDashboard'],
        queryFn: async () => {
            const { data } = await api.get('/admin/dashboard');
            return data;
        },
    });

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const bentoCards = [
        {
            color: '#120F17',
            title: 'Admin Dashboard',
            description: 'Manage platform content with full administrative privileges, including uploading new content, editing existing items, deleting outdated resources, and controlling what is available to users.',
            label: 'Info'
        },
        {
            color: '#120F17',
            title: 'System Status',
            description: adminQuery.data?.message || 'Loading...',
            label: 'Status'
        },
        {
            color: '#120F17',
            title: 'Authorities',
            description: adminQuery.data?.authorities?.[0]?.authority || 'ROLE_ADMIN',
            label: 'Role'
        }
    ];

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
            {/* Navbar */}
            <nav className="border-b border-[#2A2A2A] bg-[#11161F]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                                <ShieldAlert size={18} className="text-blue-500" />
                            </div>
                            <h1 className="text-lg font-bold tracking-wide font-serif">Admin Portal</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:block text-right">
                                <div className="text-sm font-semibold">{user?.name}</div>
                                <div className="text-[10px] text-blue-400 uppercase tracking-widest">{user?.role}</div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-500 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
                
                {/* Welcome Banner */}
                <div className="bg-[#11161F] border border-[#2A2A2A] rounded-3xl mb-12 relative overflow-hidden flex flex-col justify-center min-h-[300px]">
                    <div className="absolute inset-0 z-0 opacity-70 mix-blend-screen pointer-events-auto">
                        <MagicRings 
                            color="#EF4444"
                            colorTwo="#A855F7"
                            ringCount={6}
                            speed={1}
                            attenuation={10}
                            lineThickness={2}
                            baseRadius={0.35}
                            radiusStep={0.1}
                            scaleRate={0.1}
                            opacity={1}
                            blur={0}
                            noiseAmount={0.1}
                            rotation={0}
                            ringGap={1.5}
                            fadeIn={0.7}
                            fadeOut={0.5}
                            followMouse={true}
                            mouseInfluence={0.2}
                            hoverScale={1.2}
                            parallax={0.05}
                            clickBurst={true}
                        />
                    </div>
                    <div className="relative z-10 p-8 md:p-12 pointer-events-none">
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold min-h-[120px] max-w-3xl leading-tight">
                            <TextType 
                              text={[
                                  `Hello ${user?.name || ''}!`, 
                                  "You are an admin.", 
                                  "As an admin you can upload, edit, and delete stuff and more and more."
                              ]}
                              typingSpeed={50}
                              pauseDuration={1500}
                              showCursor={true}
                              cursorCharacter="_"
                            />
                        </h2>
                    </div>
                </div>

                {/* Profile & Info Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-1 flex justify-center lg:justify-start">
                        <ReflectiveCard user={user} color="#ffffff" overlayColor="rgba(239, 68, 68, 0.1)" />
                    </div>
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            Your Profile Data
                        </h2>
                        <div className="w-full">
                            <MagicBento 
                                cards={bentoCards}
                                textAutoHide={false}
                                enableStars={true}
                                enableSpotlight={true}
                                enableBorderGlow={true}
                                enableTilt={true}
                                enableMagnetism={false}
                                clickEffect={true}
                                glowColor="239, 68, 68"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Signature */}
                <footer className="text-center pb-8 border-t border-[#2A2A2A] pt-8">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                        Made by Anvi Sharma • theanvisharma@gmail.com
                    </p>
                </footer>
            </main>
        </div>
    );
};
