import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gavel, Mail, Lock, User, Phone, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import CustomSelect from '../components/CustomSelect';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'lawyer', // Default role for signup, admin usually created via seed/internal
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const user = await register(formData);
            toast.success('Account created successfully!');
            navigate(`/${user.role}-dashboard`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create account.');
            toast.error('Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="hidden lg:flex flex-col justify-between p-12 bg-card border-r border-border relative overflow-hidden">
                <Link to="/" className="flex items-center gap-2 relative z-10">
                    <Gavel className="w-8 h-8 text-primary" />
                    <span className="text-2xl font-bold tracking-tight">CMH</span>
                </Link>

                <div className="relative z-10">
                    <div className="p-8 rounded-2xl bg-primary/5 border border-primary/10 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Start your trial today</h2>
                        <p className="text-muted-foreground">Join thousands of attorneys who trust CMH to manage their practice.</p>
                    </div>
                    <div className="space-y-4">
                        {["30-day free trial", "No credit card required", "Instant access"].map((text, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                </div>
                                <span className="text-sm font-medium">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 text-xs text-muted-foreground">
                    © 2026 CMH. All rights reserved.
                </div>
            </div>

            <div className="flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
                        <p className="text-muted-foreground mt-2">Get started with CMH in seconds</p>
                    </div>

                    {error && (
                        <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg flex items-center gap-3">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="name">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    className="flex h-11 w-full rounded-lg border border-input bg-transparent px-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="email">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="flex h-11 w-full rounded-lg border border-input bg-transparent px-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-end">
                            <CustomSelect
                                label="Role"
                                options={[
                                    { value: 'lawyer', label: 'Lawyer' },
                                    { value: 'client', label: 'Client' }
                                ]}
                                value={formData.role}
                                onChange={(val) => setFormData({ ...formData, role: val })}
                            />
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="phone">Phone (Optional)</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        id="phone"
                                        type="tel"
                                        className="flex h-11 w-full rounded-lg border border-input bg-transparent px-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="password">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="flex h-11 w-full rounded-lg border border-input bg-transparent px-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow transition-all hover:bg-primary/90 disabled:opacity-50 mt-4"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
