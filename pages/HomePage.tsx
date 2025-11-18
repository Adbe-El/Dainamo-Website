
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../App';
import { motion, useInView } from 'framer-motion';
import { Testimonial } from '../types';

const Section: React.FC<{ children: React.ReactNode, className?: string, id?: string }> = ({ children, className = '', id }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.section
            ref={ref}
            id={id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`py-16 md:py-24 ${className}`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </motion.section>
    );
};

const HeroSection: React.FC = () => {
    const { siteSettings } = useSite();
    const [variant, setVariant] = useState('A');

    useEffect(() => {
        // A/B Test Logic
        let userVariant = localStorage.getItem('ab-variant');
        if (!userVariant) {
            userVariant = Math.random() < 0.5 ? 'A' : 'B';
            localStorage.setItem('ab-variant', userVariant);
        }
        setVariant(userVariant);
    }, []);

    const headline = variant === 'A' ? siteSettings.abTest.heroHeadlineA : siteSettings.abTest.heroHeadlineB;
    const ctaText = variant === 'A' ? siteSettings.abTest.ctaTextA : siteSettings.abTest.ctaTextB;

    const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const element = document.getElementById('services');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative bg-deep-blue text-white min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 animated-gradient opacity-80"></div>
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">{headline}</h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-8">We help small businesses implement practical AI solutions that save time, reduce costs, and drive growth—without the complexity.</p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link to="/contact" className="text-center px-8 py-4 text-lg font-semibold text-white bg-electric-blue rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
                                {ctaText}
                            </Link>
                             <a href="#services" onClick={scrollToServices} className="text-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-deep-blue transition-colors">
                                See How We Help
                            </a>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden md:block">
                        <img src="https://picsum.photos/seed/hero/600/500" alt="Business owners collaborating" className="rounded-lg shadow-2xl" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const AboutPreview: React.FC = () => {
    const features = [
        { icon: '💬', title: 'No Jargon', text: 'We speak your language, not tech-speak.' },
        { icon: '🚀', title: 'Quick Wins', text: 'See results in weeks, not years.' },
        { icon: '💰', title: 'Affordable', text: 'Solutions that fit your budget.' },
    ];
    return (
        <Section className="bg-light-gray">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-deep-blue mb-12">AI Consulting Built for Small Business Reality</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                {features.map(f => (
                    <div key={f.title}>
                        <div className="text-5xl mb-4">{f.icon}</div>
                        <h3 className="text-2xl font-bold text-deep-blue mb-2">{f.title}</h3>
                        <p className="text-dark-gray">{f.text}</p>
                    </div>
                ))}
            </div>
             <div className="mt-16 text-center max-w-3xl mx-auto">
                <p className="text-lg text-dark-gray">We're a team of AI experts who've worked with businesses just like yours. We know you don't need the latest hype—you need solutions that work today and scale tomorrow.</p>
            </div>
        </Section>
    );
};

const ServicesPreview: React.FC = () => {
    const services = [
        { title: 'AI Strategy & Roadmap', desc: 'Discover where AI can make the biggest impact in your business. We create a clear, actionable plan.', link: '/services' },
        { title: 'AI Implementation', desc: 'We handle the technical heavy lifting, building and deploying AI solutions that integrate seamlessly.', link: '/services' },
        { title: 'Training & Support', desc: 'We provide hands-on training and ongoing support to ensure your AI investments deliver long-term value.', link: '/services' },
    ];
    return (
        <Section className="bg-white" id="services">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-deep-blue mb-12">How We Help You Succeed</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {services.map(s => (
                    <div key={s.title} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                        <h3 className="text-2xl font-bold text-deep-blue mb-4">{s.title}</h3>
                        <p className="text-dark-gray mb-6">{s.desc}</p>
                        <Link to={s.link} className="font-semibold text-electric-blue hover:underline">Learn More →</Link>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const Testimonials: React.FC = () => {
    const { testimonials } = useSite();
    const activeTestimonials = testimonials.filter(t => t.active);

    return (
        <Section className="bg-light-gray">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-deep-blue mb-12">Results That Speak for Themselves</h2>
            <div className="grid lg:grid-cols-3 gap-8">
                {activeTestimonials.map((t: Testimonial) => (
                    <div key={t.id} className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
                        <p className="text-dark-gray italic mb-6 flex-grow">"{t.quote}"</p>
                        <div className="flex items-center">
                            <img src={t.photoUrl} alt={t.name} className="w-16 h-16 rounded-full mr-4" />
                            <div>
                                <p className="font-bold text-deep-blue">{t.name}</p>
                                <p className="text-gray-600">{t.title}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <span className="inline-block bg-light-teal/20 text-light-teal-800 text-sm font-semibold px-4 py-2 rounded-full">{t.resultBadge}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const CTAForm: React.FC = () => {
    // This is a simplified form for the homepage. Full form on contact page.
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const { siteSettings } = useSite();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        if (!siteSettings.formSettings.googleSheetsUrl) {
            console.error("Google Sheets URL not configured in admin settings.");
            setStatus('error');
            return;
        }

        try {
            const response = await fetch(siteSettings.formSettings.googleSheetsUrl, {
                method: 'POST',
                mode: 'no-cors', // Google Scripts require this for simple POSTs
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            // no-cors means we can't read the response, so we assume success
            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('error');
        }
    };

    return (
        <Section className="bg-light-teal">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-deep-blue mb-4">Ready to Transform Your Business?</h2>
                <p className="text-lg text-dark-gray mb-8">Book a free 30-minute consultation. No sales pressure, just honest advice about whether AI is right for you.</p>

                {status === 'success' ? (
                    <p className="text-xl font-semibold text-white bg-success p-4 rounded-lg">Thank you! We'll contact you within 24 hours.</p>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto text-left">
                        <div className="grid sm:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="name" className="block font-semibold text-dark-gray mb-1">Name</label>
                                <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric-blue focus:outline-none bg-deep-blue text-white placeholder-gray-300"/>
                            </div>
                             <div>
                                <label htmlFor="email" className="block font-semibold text-dark-gray mb-1">Email</label>
                                <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric-blue focus:outline-none bg-deep-blue text-white placeholder-gray-300"/>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block font-semibold text-dark-gray mb-1">What's your biggest business challenge?</label>
                            <textarea id="message" name="message" rows={4} required className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric-blue focus:outline-none bg-deep-blue text-white placeholder-gray-300"></textarea>
                        </div>
                        <button type="submit" disabled={status === 'loading'} className="w-full px-8 py-4 text-lg font-semibold text-white bg-electric-blue rounded-lg shadow-lg hover:bg-deep-blue transition-colors disabled:bg-gray-400">
                            {status === 'loading' ? 'Sending...' : 'Book My Free Consultation'}
                        </button>
                        {status === 'error' && <p className="text-error mt-4 text-center">Something went wrong. Please try again.</p>}
                    </form>
                )}
            </div>
        </Section>
    )
}

const HomePage: React.FC = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HeroSection />
            <AboutPreview />
            <ServicesPreview />
            <Testimonials />
            <CTAForm />
        </motion.div>
    );
};

export default HomePage;
