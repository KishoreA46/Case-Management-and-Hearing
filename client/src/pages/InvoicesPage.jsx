import React, { useState, useEffect } from 'react';
import {
    Plus,
    FileText,
    Download,
    CheckCircle2,
    Clock,
    AlertCircle,
    X
} from 'lucide-react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { cn } from '../utils/cn';
import CustomSelect from '../components/CustomSelect';

const InvoicesPage = () => {
    const [invoices, setInvoices] = useState([]);
    const [cases, setCases] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        invoice_number: `INV-${Date.now().toString().slice(-6)}`,
        case_id: '',
        client_id: '',
        amount: '',
        status: 'pending',
        due_date: ''
    });

    useEffect(() => {
        fetchInvoices();
        fetchMetadata();
    }, []);

    const fetchInvoices = async () => {
        try {
            const { data } = await api.get('/invoices');
            setInvoices(data);
        } catch (error) {
            toast.error('Failed to fetch invoices');
        } finally {
            setLoading(false);
        }
    };

    const fetchMetadata = async () => {
        try {
            const [cRes, clRes] = await Promise.all([
                api.get('/cases'),
                api.get('/clients')
            ]);
            setCases(cRes.data);
            setClients(clRes.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/invoices', formData);
            toast.success('Invoice created');
            setIsModalOpen(false);
            fetchInvoices();
        } catch (error) {
            toast.error('Failed to create invoice');
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'paid': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case 'pending': return <Clock className="w-4 h-4 text-orange-500" />;
            case 'overdue': return <AlertCircle className="w-4 h-4 text-red-500" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
                    <p className="text-muted-foreground">Manage billing and payments for your cases.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium shadow hover:bg-primary/90 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Create Invoice
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card border border-border rounded-xl">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Outstanding</h4>
                    <p className="text-2xl font-bold font-mono">$45,280.00</p>
                </div>
                <div className="p-6 bg-card border border-border rounded-xl">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Paid this month</h4>
                    <p className="text-2xl font-bold font-mono text-green-600">$12,400.00</p>
                </div>
                <div className="p-6 bg-card border border-border rounded-xl">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Overdue</h4>
                    <p className="text-2xl font-bold font-mono text-red-600">$2,150.00</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-accent/50 text-muted-foreground text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">Invoice #</th>
                                <th className="px-6 py-4 font-semibold">Case & Client</th>
                                <th className="px-6 py-4 font-semibold">Amount</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Due Date</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-sm">
                            {loading ? (
                                <tr><td colSpan="6" className="px-6 py-10 text-center text-muted-foreground">Loading invoices...</td></tr>
                            ) : invoices.length === 0 ? (
                                <tr><td colSpan="6" className="px-6 py-10 text-center text-muted-foreground">No invoices found.</td></tr>
                            ) : invoices.map((inv) => (
                                <tr key={inv._id} className="hover:bg-accent/30 transition-colors">
                                    <td className="px-6 py-4 font-mono font-medium">{inv.invoice_number}</td>
                                    <td className="px-6 py-4">
                                        <p className="font-semibold">{inv.case?.case_title}</p>
                                        <p className="text-xs text-muted-foreground">{inv.client?.name}</p>
                                    </td>
                                    <td className="px-6 py-4 font-mono font-bold">${parseFloat(inv.amount).toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(inv.status)}
                                            <span className="capitalize">{inv.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-accent rounded-lg transition-colors text-primary" title="Download PDF">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="bg-card w-full max-w-xl border border-border rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <h2 className="text-xl font-bold">Create Invoice</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-accent rounded-full transition-colors"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleCreate} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Invoice Number</label>
                                    <input
                                        className="w-full bg-accent/30 border border-border rounded-lg px-4 py-2 text-sm font-mono"
                                        readOnly
                                        value={formData.invoice_number}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Due Date</label>
                                    <input
                                        type="date"
                                        className="w-full bg-accent/30 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none"
                                        required
                                        value={formData.due_date}
                                        onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <CustomSelect
                                label="Select Case"
                                required
                                placeholder="Search Case"
                                options={cases.map(c => ({ value: c._id, label: c.case_title, sublabel: c.case_number }))}
                                value={formData.case_id}
                                onChange={(val) => setFormData({ ...formData, case_id: val })}
                            />
                            <CustomSelect
                                label="Select Client"
                                required
                                placeholder="Search Client"
                                options={clients.map(c => ({ value: c._id, label: c.name, sublabel: c.email || 'Client' }))}
                                value={formData.client_id}
                                onChange={(val) => setFormData({ ...formData, client_id: val })}
                            />
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Amount ($)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="w-full bg-accent/30 border border-border rounded-lg pl-8 pr-4 py-2 text-sm focus:outline-none"
                                        placeholder="0.00"
                                        required
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-border">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg border border-border hover:bg-accent text-sm font-medium">Cancel</button>
                                <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-bold shadow-lg">Generate Invoice</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoicesPage;
