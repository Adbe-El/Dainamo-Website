
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '../App';

const ContactPage: React.FC = () => {
    const { siteSettings } = useSite();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        const formData = new FormData(e.currentTarget);
        const data: { [key: string]: any } = {};
        formData.forEach((value, key) => {
            if (key === 'projectType') {
                if (!data[key]) {
                    data[key] = [];
                }
                data[key].push(value);
            } else {
                data[key] = value;
            }
        });
        
        if (data.projectType) {
            data.projectType = (data.projectType as string[]).join(', ');
        }

        if (!siteSettings.formSettings.googleSheetsUrl) {
            console.error("Google Sheets URL not configured in admin settings.");
            setStatus('error');
            return;
        }

        try {
            const response = await fetch(siteSettings.formSettings.googleSheetsUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('error');
        }
    };


    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <div className="bg-light-gray text-center py-24">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-deep-blue mb-4">Let's Talk About Your Business</h1>
                    <p className="text-lg text-dark-gray max-w-2xl mx-auto">Book your free consultation or reach out with questions. We typically respond within 2 hours during business hours.</p>
                </div>
            </div>

            <div className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-5 gap-16">
                        <div className="lg:col-span-3 bg-white p-8 rounded-lg shadow-2xl border border-gray-100">
                             {status === 'success' ? (
                                <div className="text-center py-20">
                                    <h2 className="text-3xl font-bold text-success mb-4">Thank You!</h2>
                                    <p className="text-lg text-dark-gray">Your message has been sent. We'll be in touch within 24 business hours.</p>
                                </div>
                            ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <input type="text" name="name" placeholder="Name *" required className="w-full p-3 border border-gray-600 rounded-lg bg-deep-blue text-white placeholder-gray-300 focus:ring-2 focus:ring-electric-blue focus:outline-none"/>
                                    <input type="email" name="email" placeholder="Email *" required className="w-full p-3 border border-gray-600 rounded-lg bg-deep-blue text-white placeholder-gray-300 focus:ring-2 focus:ring-electric-blue focus:outline-none"/>
                                    <input type="tel" name="phone" placeholder="Phone" className="w-full p-3 border border-gray-600 rounded-lg bg-deep-blue text-white placeholder-gray-300 focus:ring-2 focus:ring-electric-blue focus:outline-none"/>
                                    <input type="text" name="company" placeholder="Company Name *" required className="w-full p-3 border border-gray-600 rounded-lg bg-deep-blue text-white placeholder-gray-300 focus:ring-2 focus:ring-electric-blue focus:outline-none"/>
                                </div>
                                <select name="industry" required className="w-full p-3 border border-gray-600 rounded-lg bg-deep-blue text-white focus:ring-2 focus:ring-electric-blue focus:outline-none">
                                    <option value="">Select Industry *</option>
                                    <option>Retail & E-commerce</option>
                                    <option>Professional Services</option>
                                    <option>Healthcare</option>
                                    <option>Manufacturing</option>
                                </select>
                                <div>
                                    <label className="font-semibold text-dark-gray">Project Type</label>
                                    <div className="mt-2 grid sm:grid-cols-2 gap-4">
                                        <label className="flex items-center"><input type="checkbox" name="projectType" value="AI Strategy" className="h-5 w-5 text-electric-blue border-gray-300 rounded focus:ring-electric-blue" /> <span className="ml-2">AI Strategy</span></label>
                                        <label className="flex items-center"><input type="checkbox" name="projectType" value="Implementation" className="h-5 w-5 text-electric-blue border-gray-300 rounded focus:ring-electric-blue" /> <span className="ml-2">Implementation</span></label>
                                        <label className="flex items-center"><input type="checkbox" name="projectType" value="Training" className="h-5 w-5 text-electric-blue border-gray-300 rounded focus:ring-electric-blue" /> <span className="ml-2">Training</span></label>
                                        <label className="flex items-center"><input type="checkbox" name="projectType" value="Exploring" className="h-5 w-5 text-electric-blue border-gray-300 rounded focus:ring-electric-blue" /> <span className="ml-2">Exploring options</span></label>
                                    </div>
                                </div>
                                <textarea name="message" placeholder="Tell us about your project *" required rows={5} className="w-full p-3 border border-gray-600 rounded-lg bg-deep-blue text-white placeholder-gray-300 focus:ring-2 focus:ring-electric-blue focus:outline-none"></textarea>
                                <div>
                                    <button type="submit" disabled={status === 'loading'} className="w-full px-8 py-4 text-lg font-semibold text-white bg-electric-blue rounded-lg shadow-lg hover:bg-deep-blue transition-colors disabled:bg-gray-400">
                                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                                    </button>
                                    {status === 'error' && <p className="text-error mt-4 text-center">Something went wrong. Please check your connection and try again.</p>}
                                </div>
                            </form>
                            )}
                        </div>
                        <div className="lg:col-span-2">
                            <h3 className="text-2xl font-bold text-deep-blue mb-6">Contact Information</h3>
                            <div className="space-y-4 text-lg text-dark-gray">
                                <p><strong>Address:</strong><br/>{siteSettings.officeAddress}</p>
                                <p><strong>Phone:</strong><br/><a href={`tel:${siteSettings.contactPhone}`} className="text-electric-blue hover:underline">{siteSettings.contactPhone}</a></p>
                                <p><strong>Email:</strong><br/><a href={`mailto:${siteSettings.contactEmail}`} className="text-electric-blue hover:underline">{siteSettings.contactEmail}</a></p>
                                <p><strong>Hours:</strong><br/>{siteSettings.businessHours}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ContactPage;
