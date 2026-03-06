import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Plus,
    Tag as TagIcon,
    AlertTriangle,
    FolderOpen,
    Download,
    Trash2,
    ArrowLeft,
    FileText,
    Calendar,
    Scale,
    Clock,
    MapPin,
    User,
    History
} from 'lucide-react';
import Dropdown, { DropdownItem, DropdownDivider } from '../components/Dropdown';
import CaseTimeline from '../components/CaseTimeline';
import CaseProgressTracker from '../components/CaseProgressTracker';
import DocumentManager from '../components/DocumentManager';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { cn } from '../utils/cn';

const CaseDetailsPage = () => {
    const { id } = useParams();
    const [caseData, setCaseData] = useState(null);
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchCaseDetails();
    }, [id]);

    const fetchCaseDetails = async () => {
        try {
            const [caseRes, timelineRes] = await Promise.all([
                api.get(`/cases/${id}`),
                api.get(`/timeline/${id}`)
            ]);
            setCaseData(caseRes.data);
            setTimeline(timelineRes.data);
        } catch (error) {
            toast.error('Failed to fetch case details');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (status) => {
        try {
            await api.put(`/cases/${id}`, { status });
            toast.success(`Case status updated to ${status}`);
            fetchCaseDetails();
        } catch (error) {
            toast.error('Failed to update case status');
        }
    };

    if (loading) return <div className="p-8 text-center text-muted-foreground">Loading case details...</div>;
    if (!caseData) return <div className="p-8 text-center text-destructive">Case not found.</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/cases" className="p-2 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight">{caseData.case_title}</h1>
                            <span className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider",
                                caseData.status === 'active' ? "bg-green-500/10 text-green-600" : "bg-gray-500/10 text-gray-600"
                            )}>
                                {caseData.status}
                            </span>
                        </div>
                        <p className="text-muted-foreground">
                            Case #{caseData.case_number} • {caseData.case_type_id?.name || 'General'}
                            {caseData.court_id && ` • ${caseData.court_id.court_name} (${caseData.court_id.court_number})`}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    {user?.role !== 'client' && (
                        <>
                            <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors">Edit Case</button>
                            <Dropdown
                                trigger={
                                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow-lg hover:bg-primary/90 transition-all">Update Status</button>
                                }
                            >
                                <div className="px-3 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Workflow State</div>
                                <DropdownItem onClick={() => updateStatus('Filed')}>Mark as Filed</DropdownItem>
                                <DropdownItem onClick={() => updateStatus('Under Investigation')}>Investigation</DropdownItem>
                                <DropdownItem onClick={() => updateStatus('Trial Ongoing')}>Trial Ongoing</DropdownItem>
                                <DropdownItem onClick={() => updateStatus('Judgment Pending')}>Judgment Pending</DropdownItem>
                                <DropdownDivider />
                                <DropdownItem icon={<Trash2 className="w-4 h-4" />} danger onClick={() => updateStatus('Closed')}>Close Case</DropdownItem>
                            </Dropdown>
                        </>
                    )}
                </div>
            </div>

            {/* Progress Tracker for Clients (or all for context) */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8 text-center">Current Case Progress</h3>
                <CaseProgressTracker status={caseData.status} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Details & Description */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4">
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                caseData.priority === 'Urgent' ? "bg-red-500/10 text-red-600" :
                                    caseData.priority === 'High' ? "bg-orange-500/10 text-orange-600" :
                                        "bg-blue-500/10 text-blue-600"
                            )}>
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Priority</p>
                                <p className="font-bold text-lg">{caseData.priority || 'Medium'}</p>
                            </div>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4">
                            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-muted-foreground">
                                <TagIcon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Tags</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {caseData.tags?.map(tag => (
                                        <span key={tag._id} className="px-2 py-0.5 bg-accent text-accent-foreground rounded text-[10px] font-bold">{tag.name}</span>
                                    )) || <span className="text-sm italic opacity-50">No tags</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2 italic"><FileText className="w-4 h-4" /> Description</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {caseData.description || 'No description provided for this case.'}
                        </p>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold flex items-center gap-2"><Calendar className="w-4 h-4" /> Hearings History</h3>
                            <button className="text-xs text-primary hover:underline flex items-center gap-1 font-bold">
                                <Plus className="w-3 h-3" /> Schedule New
                            </button>
                        </div>
                        <div className="space-y-4">
                            {caseData.hearings?.map((h, i) => (
                                <div key={h._id || i} className="flex items-start gap-4 p-4 bg-accent/30 rounded-lg border border-transparent hover:border-border transition-all">
                                    <div className="mt-1 p-2 bg-background rounded-full">
                                        <Scale className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <p className="font-bold text-sm">Status Conference</p>
                                            <span className="text-xs font-medium capitalize opacity-60">{h.status}</span>
                                        </div>
                                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(h.hearing_date).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {h.hearing_time}</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {h.courtroom || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {!caseData.hearings?.length && <p className="text-sm text-muted-foreground italic">No hearings recorded for this case.</p>}
                        </div>
                    </div>

                    <DocumentManager caseId={id} />
                </div>

                {/* Right Column: Roles & Meta */}
                <div className="space-y-8">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="font-bold mb-6">Parties Involved</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <Scale className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Lawyer</p>
                                    <p className="font-bold">{caseData.lawyer?.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Petitioner (Client)</p>
                                    <p className="font-bold">{caseData.petitioner}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Defender</p>
                                    <p className="font-bold">{caseData.defender}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="font-bold mb-6 flex items-center justify-between">
                            <span>Case Timeline</span>
                            <History className="w-4 h-4 text-muted-foreground" />
                        </h3>
                        <CaseTimeline timeline={timeline} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseDetailsPage;
