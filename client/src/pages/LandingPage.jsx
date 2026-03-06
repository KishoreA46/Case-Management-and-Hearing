import React from 'react';
import { Link } from 'react-router-dom';
import {
    Gavel,
    Shield,
    Clock,
    Users,
    CheckCircle2,
    ChevronRight,
    BarChart3,
    Calendar,
    Briefcase
} from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
                <Link className="flex items-center justify-center gap-2" to="/">
                    <Gavel className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl tracking-tight">CMH</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:text-primary transition-colors" to="#features">Features</Link>
                    <Link className="text-sm font-medium hover:text-primary transition-colors" to="#pricing">Pricing</Link>
                    <Link className="text-sm font-medium hover:text-primary transition-colors" to="/login">Login</Link>
                    <Link className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" to="/signup">
                        Get Started
                    </Link>
                </nav>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Modern Case Management for <span className="text-primary">Next-Gen Law Firms</span>
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Streamline your legal practice with CMH. Manage cases, schedule hearings, and collaborate with clients in one beautiful dashboard.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-semibold text-primary-foreground shadow transition-all hover:bg-primary/90 hover:scale-105" to="/signup">
                                        Start Free Trial
                                    </Link>
                                    <Link className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-background px-8 text-base font-semibold shadow-sm transition-all hover:bg-accent hover:text-accent-foreground" to="/login">
                                        Book a Demo
                                    </Link>
                                </div>
                            </div>
                            <div className="mx-auto flex w-full items-center justify-center">
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-border bg-accent/20 flex items-center justify-center">
                                    <div className="grid grid-cols-2 gap-4 p-8 w-full h-full opacity-50">
                                        <div className="bg-card rounded-lg p-4 shadow-sm border border-border/50"></div>
                                        <div className="bg-card rounded-lg p-4 shadow-sm border border-border/50"></div>
                                        <div className="bg-card rounded-lg p-4 shadow-sm border border-border/50"></div>
                                        <div className="bg-card rounded-lg p-4 shadow-sm border border-border/50"></div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <BarChart3 className="w-24 h-24 text-primary mt-12 mb-12 opacity-80" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-accent/30">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-semibold">Features</div>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">Everything you need to <span className="text-primary">win</span></h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our platform is designed by legal professionals to automate your workflow and focus on what matters most—your clients.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                                <Briefcase className="w-10 h-10 text-primary mb-4" />
                                <h3 className="text-xl font-bold mb-2">Case Management</h3>
                                <p className="text-muted-foreground">Keep all case details, documents, and communications in one centralized location.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                                <Calendar className="w-10 h-10 text-primary mb-4" />
                                <h3 className="text-xl font-bold mb-2">Hearing Scheduler</h3>
                                <p className="text-muted-foreground">Automatically track hearing dates, set reminders, and sync with your team's calendar.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                                <Users className="w-10 h-10 text-primary mb-4" />
                                <h3 className="text-xl font-bold mb-2">Client Portal</h3>
                                <p className="text-muted-foreground">Give clients restricted access to view their case status and download invoices securely.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="grid gap-12 lg:grid-cols-2 items-center">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">Designed for <span className="text-primary">Reliability & Efficiency</span></h2>
                                <ul className="space-y-4">
                                    {[
                                        "Role-based access control for maximum security",
                                        "Automated billing and professional invoices",
                                        "Real-time notifications and activity logs",
                                        "Mobile-responsive design for on-the-go access"
                                    ].map((benefit, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                            <span className="text-lg text-muted-foreground">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative p-8 rounded-3xl bg-primary/5 border border-primary/10 overflow-hidden">
                                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                                <div className="relative flex flex-col gap-4">
                                    <div className="p-4 bg-card rounded-xl border border-border shadow-sm flex items-center gap-4">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Clock className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">Save 10+ hours/week</p>
                                            <p className="text-xs text-muted-foreground">on administrative tasks</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-card rounded-xl border border-border shadow-sm flex items-center gap-4 ml-12">
                                        <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                                            <Shield className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">Enterprise Security</p>
                                            <p className="text-xs text-muted-foreground">Your data is encrypted and safe</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
                    <div className="container px-4 md:px-6 mx-auto text-center space-y-6">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">Ready to transform your practice?</h2>
                        <p className="max-w-[600px] mx-auto text-primary-foreground/80 md:text-xl">
                            Join 500+ law firms already using CMH to scale their business.
                        </p>
                        <Link className="inline-flex h-12 items-center justify-center rounded-lg bg-background px-10 text-base font-bold text-primary shadow transition-all hover:bg-background/90 hover:scale-105" to="/signup">
                            Start Your Free Trial
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="w-full py-6 bg-card border-t border-border">
                <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © 2026 CMH Inc. All rights reserved.
                    </p>
                    <nav className="flex gap-4 sm:gap-6">
                        <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" to="#">Terms of Service</Link>
                        <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" to="#">Privacy</Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
