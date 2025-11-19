
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSite } from '../App';
import { motion, AnimatePresence } from 'framer-motion';

const Logo: React.FC = () => (
    <Link to="/" className="flex items-center space-x-2">
        <svg className="w-8 h-8 text-electric-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-2xl font-bold text-deep-blue">Dainamo</span>
    </Link>
);

const Header: React.FC = () => {
    const { siteSettings } = useSite();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Logo />
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <NavLink key={link.name} to={link.path} className={({isActive}) => `text-base font-semibold transition-colors hover:text-electric-blue ${isActive ? 'text-electric-blue' : 'text-dark-gray'}`}>
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="hidden md:block">
                        <Link to="/contact" className="px-6 py-3 text-base font-semibold text-white bg-electric-blue rounded-lg shadow-md hover:bg-deep-blue transition-colors">
                           Book Consultation
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-dark-gray focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-white shadow-lg absolute w-full"
                    >
                        <nav className="flex flex-col items-center py-4 space-y-4">
                            {navLinks.map(link => (
                                <NavLink key={link.name} to={link.path} onClick={() => setIsOpen(false)} className={({isActive}) => `text-lg font-semibold transition-colors hover:text-electric-blue ${isActive ? 'text-electric-blue' : 'text-dark-gray'}`}>
                                    {link.name}
                                </NavLink>
                            ))}
                            <Link to="/contact" onClick={() => setIsOpen(false)} className="mt-4 px-8 py-3 text-lg font-semibold text-white bg-electric-blue rounded-lg shadow-md hover:bg-deep-blue transition-colors">
                                Book Consultation
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

const Footer: React.FC = () => {
    const { siteSettings } = useSite();
    return (
        <footer className="bg-deep-blue text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <Logo />
                        <p className="mt-4 text-gray-300">{siteSettings.tagline}</p>
                        <div className="flex mt-4 space-x-4">
                            <a href={siteSettings.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-electric-blue"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg></a>
                            <a href={siteSettings.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-electric-blue"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.295 1.616 4.22 3.766 4.662-.69.188-1.432.23-2.164.083.606 1.922 2.364 3.235 4.458 3.27-1.724 1.35-3.89 2.067-6.23 1.72C.926 19.49 3.01 20.5 5.38 20.5c6.634 0 10.259-5.592 10.038-10.583 1.054-.76 1.968-1.712 2.682-2.828z"/></svg></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                            <li><Link to="/services" className="text-gray-300 hover:text-white">Services</Link></li>
                            <li><Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
                            <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold">Services</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/services" className="text-gray-300 hover:text-white">AI Strategy</Link></li>
                            <li><Link to="/services" className="text-gray-300 hover:text-white">AI Implementation</Link></li>
                            <li><Link to="/services" className="text-gray-300 hover:text-white">Training & Support</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Contact</h3>
                        <ul className="mt-4 space-y-2 text-gray-300">
                            <li>{siteSettings.officeAddress}</li>
                            <li>{siteSettings.contactPhone}</li>
                            <li>{siteSettings.contactEmail}</li>
                            <li>{siteSettings.businessHours}</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} {siteSettings.siteTitle}. All Rights Reserved.</p>
                     <div className="mt-4">
                        <Link to="/admin" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Admin Login</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
