import React, { useState, useEffect } from 'react';
import {
    Briefcase,
    Clock,
    FileText,
    Calendar,
    Download,
    CheckCircle2,
    Loader2
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { cn } from '../utils/cn';
import api from '../api/axios';

const ClientDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const { data } = await api.get('/dashboard');
                setData(data);
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const { stats, timeline, documents } = data || {};

    const iconMap = {
        'Active Cases': <Briefcase className="w-5 h-5" />,
        'Next Hearing': <Calendar className="w-5 h-5" />,
        'Case Status': <CheckCircle2 className="w-5 h-5" />,
        'Pending Invoices': <FileText className="w-5 h-5" />,
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Case Overview</h1>
                <p className="text-muted-foreground">Track your legal proceedings and access related documents.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats?.map((stat, i) => (
                    <StatCard
                        key={i}
                        {...stat}
                        icon={iconMap[stat.title] || <Briefcase className="w-5 h-5" />}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="font-bold mb-6">Case Timeline</h3>
                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-muted">
                            {timeline?.length > 0 ? timeline.map((step, i) => (
                                <div key={i} className="relative flex items-center justify-between pl-12">
                                    <div className={cn(
                                        "absolute left-0 w-10 h-10 rounded-full border-4 border-background flex items-center justify-center z-10",
                                        step.done ? "bg-primary text-primary-foreground" : step.active ? "bg-primary/20 text-primary border-primary/20" : "bg-muted text-muted-foreground"
                                    )}>
                                        {step.done ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current"></div>}
                                    </div>
                                    <div>
                                        <p className={cn("font-bold", step.active && "text-primary")}>{step.title}</p>
                                        <p className="text-sm text-muted-foreground">{step.date}</p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-sm text-muted-foreground italic pl-12">No timeline events recorded.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 h-fit">
                    <h3 className="font-bold mb-6">Recent Documents</h3>
                    <div className="space-y-4">
                        {documents?.length > 0 ? documents.map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg hover:bg-accent transition-colors group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    <div>
                                        <p className="text-sm font-medium">{doc.name}</p>
                                        <p className="text-xs text-muted-foreground">{doc.size}</p>
                                    </div>
                                </div>
                                <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                            </div>
                        )) : (
                            <div className="text-center py-6 text-muted-foreground text-sm italic">
                                No documents uploaded.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
