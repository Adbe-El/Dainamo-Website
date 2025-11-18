
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { SiteSettings, Testimonial, BlogPost } from './types';
import { getInitialData, useLocalStorage } from './services/dataService';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

// --- SITE CONTEXT ---
interface SiteContextType {
    siteSettings: SiteSettings;
    setSiteSettings: (settings: SiteSettings) => void;
    testimonials: Testimonial[];
    setTestimonials: (testimonials: Testimonial[]) => void;
    blogPosts: BlogPost[];
    setBlogPosts: (posts: BlogPost[]) => void;
}

const SiteContext = createContext<SiteContextType | null>(null);

export const useSite = () => {
    const context = useContext(SiteContext);
    if (!context) {
        throw new Error('useSite must be used within a SiteProvider');
    }
    return context;
};


// --- SCROLL TO TOP ---
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};


// --- APP COMPONENT ---
const App: React.FC = () => {
    const [siteSettings, setSiteSettings] = useLocalStorage<SiteSettings>('siteSettings', getInitialData().siteSettings);
    const [testimonials, setTestimonials] = useLocalStorage<Testimonial[]>('testimonials', getInitialData().testimonials);
    const [blogPosts, setBlogPosts] = useLocalStorage<BlogPost[]>('blogPosts', getInitialData().blogPosts);
    const location = useLocation();

    return (
        <SiteContext.Provider value={{ siteSettings, setSiteSettings, testimonials, setTestimonials, blogPosts, setBlogPosts }}>
            <ScrollToTop />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/" element={<Layout><HomePage /></Layout>} />
                    <Route path="/about" element={<Layout><AboutPage /></Layout>} />
                    <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
                    <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
                    <Route path="/blog/:slug" element={<Layout><BlogPage /></Layout>} />
                    <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
                </Routes>
            </AnimatePresence>
        </SiteContext.Provider>
    );
};

const AppWrapper: React.FC = () => (
    <HashRouter>
        <App />
    </HashRouter>
);

export default AppWrapper;
