import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, Plus, Search, MoreVertical, Briefcase } from 'lucide-react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { cn } from '../utils/cn';

const ClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const { data } = await api.get('/clients');
            setClients(data);
        } catch (error) {
            toast.error('Failed to fetch clients');
        } finally {
            setLoading(false);
        }
    };

    const filteredClients = clients.filter(cl =>
        cl.name.toLowerCase().includes(search.toLowerCase()) ||
        cl.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
                    <p className="text-muted-foreground">Manage relationships and track client history.</p>
                </div>
            </div>

            <div className="flex items-center gap-4 bg-card p-4 border border-border rounded-xl">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search clients..."
                        className="w-full bg-accent/30 border-transparent focus:bg-background focus:border-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 text-center text-muted-foreground">Loading clients...</div>
                ) : filteredClients.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-muted-foreground">No clients found.</div>
                ) : filteredClients.map((client) => (
                    <div key={client._id} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                                {client.name.charAt(0)}
                            </div>
                            <button className="p-1 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>
                        <h3 className="font-bold text-lg mb-1">{client.name}</h3>
                        <div className="space-y-2 mt-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>{client.email || 'No email provided'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>{client.phone || 'No phone provided'}</span>
                            </div>
                            {client.case && (
                                <div className="flex items-center gap-2 pt-2 border-t border-border mt-4">
                                    <Briefcase className="w-4 h-4 text-primary" />
                                    <span className="font-medium text-foreground truncate">{client.case.case_title}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientsPage;
