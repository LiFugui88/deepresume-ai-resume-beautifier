
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import {
    Users,
    FileText,
    TrendingUp,
    Calendar,
    Crown,
    Layout,
    RefreshCw,
    ChevronDown,
    ChevronUp,
    Eye,
    Download,
    MousePointer
} from 'lucide-react';

interface UserStats {
    total: number;
    free: number;
    pro: number;
    todayNew: number;
    weekNew: number;
    monthNew: number;
}

interface ResumeStats {
    total: number;
    todayNew: number;
    weekNew: number;
    byTemplate: Record<string, number>;
}

interface AnalyticsStats {
    pageViews: {
        total: number;
        today: number;
        week: number;
        loggedIn: number;
        anonymous: number;
    };
    resumeGenerations: {
        total: number;
        today: number;
        week: number;
        loggedIn: number;
        anonymous: number;
    };
    pdfDownloads: {
        total: number;
        today: number;
        week: number;
        byTemplate: Record<string, number>;
    };
}

interface RecentUser {
    id: string;
    email: string;
    full_name: string | null;
    subscription_status: string;
    created_at: string;
}

export const AdminPanel: React.FC = () => {
    const [userStats, setUserStats] = useState<UserStats>({
        total: 0,
        free: 0,
        pro: 0,
        todayNew: 0,
        weekNew: 0,
        monthNew: 0,
    });
    const [resumeStats, setResumeStats] = useState<ResumeStats>({
        total: 0,
        todayNew: 0,
        weekNew: 0,
        byTemplate: {},
    });
    const [analyticsStats, setAnalyticsStats] = useState<AnalyticsStats>({
        pageViews: { total: 0, today: 0, week: 0, loggedIn: 0, anonymous: 0 },
        resumeGenerations: { total: 0, today: 0, week: 0, loggedIn: 0, anonymous: 0 },
        pdfDownloads: { total: 0, today: 0, week: 0, byTemplate: {} },
    });
    const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [showAllUsers, setShowAllUsers] = useState(false);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setRefreshing(true);
        await Promise.all([
            fetchUserStats(),
            fetchResumeStats(),
            fetchAnalyticsStats(),
            fetchRecentUsers(),
        ]);
        setRefreshing(false);
        setLoading(false);
    };

    const fetchUserStats = async () => {
        try {
            const now = new Date();
            const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
            const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
            const monthStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

            const { count: totalCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true });

            const { count: proCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .eq('subscription_status', 'pro');

            const { count: todayCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', todayStart);

            const { count: weekCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', weekStart);

            const { count: monthCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', monthStart);

            setUserStats({
                total: totalCount || 0,
                free: (totalCount || 0) - (proCount || 0),
                pro: proCount || 0,
                todayNew: todayCount || 0,
                weekNew: weekCount || 0,
                monthNew: monthCount || 0,
            });
        } catch (error) {
            console.error('获取用户统计失败:', error);
        }
    };

    const fetchResumeStats = async () => {
        try {
            const now = new Date();
            const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
            const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

            const { count: totalCount } = await supabase
                .from('resumes')
                .select('*', { count: 'exact', head: true });

            const { count: todayCount } = await supabase
                .from('resumes')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', todayStart);

            const { count: weekCount } = await supabase
                .from('resumes')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', weekStart);

            const { data: templateData } = await supabase
                .from('resumes')
                .select('style');

            const byTemplate: Record<string, number> = {};
            if (templateData) {
                templateData.forEach((item: any) => {
                    const style = item.style || '未知';
                    byTemplate[style] = (byTemplate[style] || 0) + 1;
                });
            }

            setResumeStats({
                total: totalCount || 0,
                todayNew: todayCount || 0,
                weekNew: weekCount || 0,
                byTemplate,
            });
        } catch (error) {
            console.error('获取简历统计失败:', error);
        }
    };

    const fetchAnalyticsStats = async () => {
        try {
            const now = new Date();
            const todayDate = now.toISOString().split('T')[0];
            const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            // Page views
            const { count: pvTotal } = await supabase
                .from('analytics')
                .select('*', { count: 'exact', head: true })
                .eq('event_type', 'page_view');

            const { count: pvToday } = await supabase
                .from('analytics')
                .select('*', { count: 'exact', head: true })
                .eq('event_type', 'page_view')
                .eq('event_date', todayDate);

            const { count: pvWeek } = await supabase
                .from('analytics')
                .select('*', { count: 'exact', head: true })
                .eq('event_type', 'page_view')
                .gte('event_date', weekStart);

            const { count: pvLoggedIn } = await supabase
                .from('analytics')
                .select('*', { count: 'exact', head: true })
                .eq('event_type', 'page_view')
                .eq('is_logged_in', true);

            // Resume generations
            const { count: rgTotal } = await supabase
                .from('analytics')
                .select('*', { count: 'exact', head: true })
                .eq('event_type', 'resume_generate');

            const { count: rgToday } = await supabase
                .from('analytics')
                .select('*', { count: 'exact', head: true })
                .eq('event_type', 'resume_generate')
                .eq('event_date', todayDate);

            const { count: rgWeek } = await supabase
                .from('analytics')
                .select('*', { count: 'exact', head: true })
                .eq('event_type', 'resume_generate')
                .gte('event_date', weekStart);

            const { count: rgLoggedIn } = await supabase
                .from('analytics')
                .select('*', { count: 'exact', head: true })
                .eq('event_type', 'resume_generate')
                .eq('is_logged_in', true);

            // PDF downloads
            const { count: dlTotal } = await supabase
                .from('analytics')
                .select('*', { count: 'exact', head: true })
                .eq('event_type', 'pdf_download');

            const { count: dlToday } = await supabase
                .from('analytics')
                .select('*', { count: 'exact', head: true })
                .eq('event_type', 'pdf_download')
                .eq('event_date', todayDate);

            const { count: dlWeek } = await supabase
                .from('analytics')
                .select('*', { count: 'exact', head: true })
                .eq('event_type', 'pdf_download')
                .gte('event_date', weekStart);

            // PDF downloads by template
            const { data: dlTemplateData } = await supabase
                .from('analytics')
                .select('template')
                .eq('event_type', 'pdf_download')
                .not('template', 'is', null);

            const dlByTemplate: Record<string, number> = {};
            if (dlTemplateData) {
                dlTemplateData.forEach((item: any) => {
                    const template = item.template || '未知';
                    dlByTemplate[template] = (dlByTemplate[template] || 0) + 1;
                });
            }

            setAnalyticsStats({
                pageViews: {
                    total: pvTotal || 0,
                    today: pvToday || 0,
                    week: pvWeek || 0,
                    loggedIn: pvLoggedIn || 0,
                    anonymous: (pvTotal || 0) - (pvLoggedIn || 0),
                },
                resumeGenerations: {
                    total: rgTotal || 0,
                    today: rgToday || 0,
                    week: rgWeek || 0,
                    loggedIn: rgLoggedIn || 0,
                    anonymous: (rgTotal || 0) - (rgLoggedIn || 0),
                },
                pdfDownloads: {
                    total: dlTotal || 0,
                    today: dlToday || 0,
                    week: dlWeek || 0,
                    byTemplate: dlByTemplate,
                },
            });
        } catch (error) {
            console.error('获取访问统计失败:', error);
        }
    };

    const fetchRecentUsers = async () => {
        try {
            const { data } = await supabase
                .from('profiles')
                .select('id, email, full_name, subscription_status, created_at')
                .order('created_at', { ascending: false })
                .limit(20);

            if (data) {
                setRecentUsers(data);
            }
        } catch (error) {
            console.error('获取最近用户失败:', error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const templateNames: Record<string, string> = {
        standard: '标准',
        minimal: '极简',
        modern: '现代',
        executive: '行政',
        bold: '醒目',
        rio: 'RIO',
        tokyo: 'TOKYO',
        oslo: 'OSLO',
        milan: 'MILAN',
        nyc: 'NYC',
        aurora: 'Aurora',
        midnight: 'Midnight',
        sunrise: 'Sunrise',
        azure: 'Azure',
        bloom: 'Bloom',
    };

    if (loading) {
        return (
            <div className="p-8 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <RefreshCw size={32} className="animate-spin text-accent" />
                    <p className="text-ink-light">加载中...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-display font-bold text-ink">管理后台</h1>
                <button
                    onClick={fetchAllData}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-ink/10 rounded-xl text-sm font-medium hover:bg-paper transition-colors disabled:opacity-50"
                >
                    <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                    刷新数据
                </button>
            </div>

            {/* Analytics Stats Section - NEW */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                    <MousePointer size={20} className="text-orange-600" />
                    访问统计（含匿名用户）
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Page Views */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink/5">
                        <h3 className="text-sm font-bold text-ink mb-4 flex items-center gap-2">
                            <Eye size={16} className="text-blue-500" />
                            页面访问
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-ink-light">总访问量</span>
                                <span className="text-xl font-bold text-ink">{analyticsStats.pageViews.total}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-ink-light">今日</span>
                                <span className="text-lg font-bold text-green-600">+{analyticsStats.pageViews.today}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-ink-light">本周</span>
                                <span className="text-lg font-bold text-blue-600">+{analyticsStats.pageViews.week}</span>
                            </div>
                            <hr className="border-ink/5" />
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-ink-light">已登录</span>
                                <span className="font-mono text-ink">{analyticsStats.pageViews.loggedIn}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-ink-light">匿名访客</span>
                                <span className="font-mono text-ink">{analyticsStats.pageViews.anonymous}</span>
                            </div>
                        </div>
                    </div>

                    {/* Resume Generations */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink/5">
                        <h3 className="text-sm font-bold text-ink mb-4 flex items-center gap-2">
                            <FileText size={16} className="text-purple-500" />
                            简历生成
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-ink-light">总生成数</span>
                                <span className="text-xl font-bold text-ink">{analyticsStats.resumeGenerations.total}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-ink-light">今日</span>
                                <span className="text-lg font-bold text-green-600">+{analyticsStats.resumeGenerations.today}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-ink-light">本周</span>
                                <span className="text-lg font-bold text-blue-600">+{analyticsStats.resumeGenerations.week}</span>
                            </div>
                            <hr className="border-ink/5" />
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-ink-light">登录用户生成</span>
                                <span className="font-mono text-ink">{analyticsStats.resumeGenerations.loggedIn}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-ink-light">匿名用户生成</span>
                                <span className="font-mono text-ink">{analyticsStats.resumeGenerations.anonymous}</span>
                            </div>
                        </div>
                    </div>

                    {/* PDF Downloads */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink/5">
                        <h3 className="text-sm font-bold text-ink mb-4 flex items-center gap-2">
                            <Download size={16} className="text-green-500" />
                            PDF 下载
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-ink-light">总下载数</span>
                                <span className="text-xl font-bold text-ink">{analyticsStats.pdfDownloads.total}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-ink-light">今日</span>
                                <span className="text-lg font-bold text-green-600">+{analyticsStats.pdfDownloads.today}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-ink-light">本周</span>
                                <span className="text-lg font-bold text-blue-600">+{analyticsStats.pdfDownloads.week}</span>
                            </div>
                            {Object.keys(analyticsStats.pdfDownloads.byTemplate).length > 0 && (
                                <>
                                    <hr className="border-ink/5" />
                                    <div className="text-xs text-ink-light mb-2">按模板分布</div>
                                    <div className="space-y-1 max-h-[100px] overflow-y-auto">
                                        {Object.entries(analyticsStats.pdfDownloads.byTemplate)
                                            .sort((a, b) => b[1] - a[1])
                                            .slice(0, 5)
                                            .map(([template, count]) => (
                                                <div key={template} className="flex justify-between items-center text-xs">
                                                    <span className="text-ink-light">{templateNames[template] || template}</span>
                                                    <span className="font-mono text-ink">{count}</span>
                                                </div>
                                            ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* User Stats Section */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                    <Users size={20} className="text-blue-600" />
                    注册用户统计
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-ink/5">
                        <p className="text-xs text-ink-light mb-1">总用户数</p>
                        <p className="text-2xl font-bold text-ink">{userStats.total}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-ink/5">
                        <p className="text-xs text-ink-light mb-1">免费用户</p>
                        <p className="text-2xl font-bold text-gray-600">{userStats.free}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-ink/5">
                        <div className="flex items-center gap-1 mb-1">
                            <Crown size={12} className="text-yellow-500" />
                            <p className="text-xs text-ink-light">付费会员</p>
                        </div>
                        <p className="text-2xl font-bold text-yellow-600">{userStats.pro}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-ink/5">
                        <p className="text-xs text-ink-light mb-1">今日新增</p>
                        <p className="text-2xl font-bold text-green-600">+{userStats.todayNew}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-ink/5">
                        <p className="text-xs text-ink-light mb-1">本周新增</p>
                        <p className="text-2xl font-bold text-blue-600">+{userStats.weekNew}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-ink/5">
                        <p className="text-xs text-ink-light mb-1">本月新增</p>
                        <p className="text-2xl font-bold text-purple-600">+{userStats.monthNew}</p>
                    </div>
                </div>
            </div>

            {/* Resume Stats Section (Registered Users) */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                    <FileText size={20} className="text-purple-600" />
                    简历存储统计（仅登录用户）
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink/5">
                        <h3 className="text-sm font-bold text-ink mb-4 flex items-center gap-2">
                            <TrendingUp size={16} />
                            保存数量
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-paper rounded-xl">
                                <p className="text-xs text-ink-light mb-1">总计</p>
                                <p className="text-xl font-bold text-ink">{resumeStats.total}</p>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-xl">
                                <p className="text-xs text-ink-light mb-1">今日</p>
                                <p className="text-xl font-bold text-green-600">+{resumeStats.todayNew}</p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-xl">
                                <p className="text-xs text-ink-light mb-1">本周</p>
                                <p className="text-xl font-bold text-blue-600">+{resumeStats.weekNew}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink/5">
                        <h3 className="text-sm font-bold text-ink mb-4 flex items-center gap-2">
                            <Layout size={16} />
                            模板使用分布
                        </h3>
                        {Object.keys(resumeStats.byTemplate).length > 0 ? (
                            <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                {Object.entries(resumeStats.byTemplate)
                                    .sort((a, b) => b[1] - a[1])
                                    .map(([template, count]) => (
                                        <div key={template} className="flex items-center justify-between py-2 px-3 bg-paper rounded-lg">
                                            <span className="text-sm text-ink">
                                                {templateNames[template] || template}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-accent rounded-full"
                                                        style={{
                                                            width: `${Math.min(100, (count / resumeStats.total) * 100)}%`
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-sm font-mono text-ink-light w-12 text-right">
                                                    {count}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <p className="text-sm text-ink-light text-center py-8">暂无数据</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Users Section */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-green-600" />
                    最近注册用户
                </h2>
                <div className="bg-white rounded-2xl shadow-sm border border-ink/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-paper border-b border-ink/5">
                                <tr>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-ink-light uppercase tracking-wider">邮箱</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-ink-light uppercase tracking-wider">姓名</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-ink-light uppercase tracking-wider">状态</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-ink-light uppercase tracking-wider">注册时间</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-ink/5">
                                {recentUsers.slice(0, showAllUsers ? 20 : 5).map((user) => (
                                    <tr key={user.id} className="hover:bg-paper/50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-ink font-mono">{user.email}</td>
                                        <td className="px-6 py-4 text-sm text-ink">{user.full_name || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                                                user.subscription_status === 'pro'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {user.subscription_status === 'pro' && <Crown size={10} />}
                                                {user.subscription_status === 'pro' ? '付费会员' : '免费用户'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-ink-light">{formatDate(user.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {recentUsers.length > 5 && (
                        <div className="px-6 py-3 border-t border-ink/5 bg-paper">
                            <button
                                onClick={() => setShowAllUsers(!showAllUsers)}
                                className="text-sm text-accent hover:underline flex items-center gap-1"
                            >
                                {showAllUsers ? (
                                    <>收起 <ChevronUp size={14} /></>
                                ) : (
                                    <>查看更多 ({recentUsers.length - 5}) <ChevronDown size={14} /></>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
