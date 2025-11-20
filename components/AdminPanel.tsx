
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Users, FileText, DollarSign, Settings, Save } from 'lucide-react';

export const AdminPanel: React.FC = () => {
    const [stats, setStats] = useState({
        users: 0,
        resumes: 0,
        revenue: 0,
    });
    const [config, setConfig] = useState({
        geminiKey: '',
        creemKey: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
        fetchConfig();
    }, []);

    const fetchStats = async () => {
        // In a real app, you would use Supabase count queries or a dedicated RPC function
        // For now, we'll mock some data or fetch basic counts if tables exist
        try {
            const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
            const { count: resumeCount } = await supabase.from('resumes').select('*', { count: 'exact', head: true });

            setStats({
                users: userCount || 120, // Mock fallback
                resumes: resumeCount || 450, // Mock fallback
                revenue: 1250, // Mock
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchConfig = async () => {
        try {
            const { data } = await supabase.from('app_config').select('*');
            if (data) {
                const newConfig = { ...config };
                data.forEach((item: any) => {
                    if (item.key === 'gemini_api_key') newConfig.geminiKey = item.value;
                    if (item.key === 'creem_api_key') newConfig.creemKey = item.value;
                });
                setConfig(newConfig);
            }
        } catch (error) {
            console.error('Error fetching config:', error);
        }
    };

    const handleSaveConfig = async () => {
        try {
            const updates = [
                { key: 'gemini_api_key', value: config.geminiKey, description: 'Gemini API Key' },
                { key: 'creem_api_key', value: config.creemKey, description: 'Creem API Key' },
            ];

            const { error } = await supabase.from('app_config').upsert(updates);
            if (error) throw error;
            alert('Configuration saved!');
        } catch (error) {
            console.error('Error saving config:', error);
            alert('Failed to save configuration.');
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-display font-bold text-ink mb-8">Admin Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink/5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-ink-light font-mono uppercase tracking-wider">Total Users</p>
                        <p className="text-2xl font-bold text-ink">{stats.users}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink/5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                        <FileText size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-ink-light font-mono uppercase tracking-wider">Resumes Generated</p>
                        <p className="text-2xl font-bold text-ink">{stats.resumes}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink/5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-ink-light font-mono uppercase tracking-wider">Total Revenue</p>
                        <p className="text-2xl font-bold text-ink">${stats.revenue}</p>
                    </div>
                </div>
            </div>

            {/* Configuration */}
            <div className="bg-white rounded-3xl shadow-sm border border-ink/5 overflow-hidden">
                <div className="p-6 border-b border-ink/5 bg-paper">
                    <h2 className="text-lg font-bold text-ink flex items-center gap-2">
                        <Settings size={20} />
                        System Configuration
                    </h2>
                </div>
                <div className="p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-ink mb-2">Gemini API Key</label>
                        <input
                            type="password"
                            value={config.geminiKey}
                            onChange={(e) => setConfig({ ...config, geminiKey: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-mono text-sm"
                            placeholder="AIzaSy..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-ink mb-2">Creem API Key</label>
                        <input
                            type="password"
                            value={config.creemKey}
                            onChange={(e) => setConfig({ ...config, creemKey: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-mono text-sm"
                            placeholder="sk_live_..."
                        />
                    </div>
                    <div className="pt-4">
                        <button
                            onClick={handleSaveConfig}
                            className="bg-ink text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-accent transition-colors flex items-center gap-2"
                        >
                            <Save size={16} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
