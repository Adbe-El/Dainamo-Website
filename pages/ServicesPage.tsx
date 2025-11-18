
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const Section: React.FC<{ children: React.ReactNode, className?: string, id?: string }> = ({ children, className = '', id }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

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

const FAQItem: React.FC<{ q: string, a: string }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 py-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
                <h3 className="text-lg font-semibold text-deep-blue">{q}</h3>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-electric-blue text-2xl font-light">{isOpen ? '-' : '+'}</motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pt-2 text-dark-gray">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


const ServicesPage: React.FC = () => {
    
    const faqs = [
        { q: "How long does implementation take?", a: "A typical implementation project ranges from 6 to 12 weeks, depending on the complexity and number of systems we need to integrate with. We establish a clear timeline during the AI Strategy & Roadmap phase." },
        { q: "Do I need technical staff to manage the AI solutions?", a: "No. We design our solutions to be managed by non-technical users. We also provide comprehensive training and ongoing support to ensure your team feels confident and empowered." },
        { q: "What if the AI solution doesn't work as expected?", a: "Our process includes rigorous testing and a pilot phase to ensure the solution meets your needs before full rollout. Our support plans also cover troubleshooting and performance optimization to address any issues that arise." },
        { q: "How do you ensure the security of my business data?", a: "Data security is our top priority. We adhere to industry best practices, use encrypted connections, and ensure all solutions comply with relevant data privacy regulations like GDPR and CCPA. We are happy to review our security protocols with you in detail." },
    ];
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-light-gray text-center py-24 md:py-32">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-deep-blue mb-4">AI Solutions Designed for Your Business</h1>
                    <p className="text-lg md:text-xl text-dark-gray max-w-3xl mx-auto">Practical, profitable AI implementations that start delivering value in weeks, not months.</p>
                </div>
            </div>

            <Section>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-deep-blue mb-4">1. AI Strategy & Roadmap</h2>
                        <p className="text-lg text-electric-blue font-semibold mb-4">$2,500 - $5,000 | 2-3 Week Timeline</p>
                        <p className="text-dark-gray mb-6">Before you invest in technology, you need a plan. Our Strategy & Roadmap service is the perfect starting point for any business exploring AI. We dive deep into your operations to identify the highest-impact opportunities and create a clear, actionable plan for implementation, complete with ROI projections and timelines.</p>
                        <h4 className="font-bold text-deep-blue mb-2">What's Included:</h4>
                        <ul className="list-disc list-inside text-dark-gray space-y-1 mb-6">
                            <li>Comprehensive business process analysis</li>
                            <li>AI opportunity identification workshop</li>
                            <li>Competitive landscape review</li>
                            <li>Custom 90-day implementation roadmap</li>
                            <li>Detailed ROI and cost-saving projections</li>
                            <li>Technology stack recommendations</li>
                        </ul>
                        <Link to="/contact" className="px-6 py-3 font-semibold text-white bg-electric-blue rounded-lg shadow-md hover:bg-deep-blue transition-colors">Schedule a Strategy Session</Link>
                    </div>
                    <div>
                         <img src="https://picsum.photos/seed/strategy/600/400" alt="Strategy session" className="rounded-lg shadow-xl" />
                    </div>
                </div>
            </Section>

            <Section className="bg-light-gray">
                 <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="lg:order-2">
                        <h2 className="text-3xl font-bold text-deep-blue mb-4">2. AI Implementation</h2>
                        <p className="text-lg text-electric-blue font-semibold mb-4">$10,000 - $50,000+ | 6-12 Week Timeline</p>
                        <p className="text-dark-gray mb-6">From automating tedious back-office tasks to deploying intelligent customer service chatbots, we handle the entire implementation process. Our team builds and integrates AI solutions that work seamlessly with your existing systems, minimizing disruption and maximizing impact.</p>
                        <h4 className="font-bold text-deep-blue mb-2">Service Tiers:</h4>
                        <ul className="list-disc list-inside text-dark-gray space-y-1 mb-6">
                            <li><strong>Starter:</strong> Basic process automation and chatbot setup.</li>
                            <li><strong>Professional:</strong> Multi-system integrations and data analytics.</li>
                            <li><strong>Enterprise:</strong> Custom AI model development and deployment.</li>
                        </ul>
                        <Link to="/contact" className="px-6 py-3 font-semibold text-white bg-electric-blue rounded-lg shadow-md hover:bg-deep-blue transition-colors">Get a Custom Quote</Link>
                    </div>
                    <div className="lg:order-1">
                         <img src="https://picsum.photos/seed/implementation/600/400" alt="AI Implementation" className="rounded-lg shadow-xl" />
                    </div>
                </div>
            </Section>

            <Section>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-deep-blue mb-4">3. Training & Support</h2>
                        <p className="text-lg text-electric-blue font-semibold mb-4">$500 - $2,500 / month</p>
                        <p className="text-dark-gray mb-6">Technology is only as good as the team using it. We provide hands-on training workshops and comprehensive documentation to empower your staff. Our ongoing support plans ensure you always have an expert to turn to, keeping your AI solutions running smoothly and delivering continuous value.</p>
                        <h4 className="font-bold text-deep-blue mb-2">Support Tiers:</h4>
                        <ul className="list-disc list-inside text-dark-gray space-y-1 mb-6">
                            <li><strong>Basic:</strong> Email support & access to our resource library.</li>
                            <li><strong>Professional:</strong> Adds monthly training sessions & performance reviews.</li>
                            <li><strong>Premium:</strong> Adds a dedicated account manager & 24/7 technical support.</li>
                        </ul>
                        <Link to="/contact" className="px-6 py-3 font-semibold text-white bg-electric-blue rounded-lg shadow-md hover:bg-deep-blue transition-colors">Choose Your Support Plan</Link>
                    </div>
                    <div>
                         <img src="https://picsum.photos/seed/support/600/400" alt="Team training" className="rounded-lg shadow-xl" />
                    </div>
                </div>
            </Section>

            <Section className="bg-light-gray" id="faq">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-deep-blue mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
                    </div>
                </div>
            </Section>
        </motion.div>
    );
};

export default ServicesPage;
