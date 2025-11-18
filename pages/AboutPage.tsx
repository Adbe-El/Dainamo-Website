
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Section: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.section
            ref={ref}
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

const AboutPage: React.FC = () => {
    const team = [
        { name: 'Dr. Evelyn Reed', title: 'Founder & CEO', bio: 'With 15 years of experience growing small businesses, Evelyn founded Dainamo to bridge the gap between AI potential and practical business application.', photoUrl: 'https://picsum.photos/seed/team1/400/400', linkedin: '#' },
        { name: 'Ben Carter', title: 'CTO', bio: 'A systems architect with a passion for elegant solutions, Ben leads our technical team in building robust and scalable AI integrations.', photoUrl: 'https://picsum.photos/seed/team2/400/400', linkedin: '#' },
        { name: 'Maria Garcia', title: 'Lead AI Consultant', bio: 'Maria excels at translating complex business challenges into actionable AI strategies, ensuring every project delivers measurable ROI.', photoUrl: 'https://picsum.photos/seed/team3/400/400', linkedin: '#' },
        { name: 'Tom Chen', title: 'Client Success Manager', bio: 'Tom is dedicated to our clients\' long-term success, providing ongoing support and training to maximize their AI investments.', photoUrl: 'https://picsum.photos/seed/team4/400/400', linkedin: '#' },
    ];
    
    const values = [
        { title: 'Transparency', text: 'No hidden fees or surprises. We believe in clear communication and honest partnership from day one.' },
        { title: 'Results-First', text: 'We measure our success by your ROI. If a solution doesn’t positively impact your bottom line, we don’t recommend it.' },
        { title: 'Education', text: 'We empower your team with the knowledge to succeed. Our goal is to make you self-sufficient, not dependent.' },
        { title: 'Partnership', text: 'Your success is our success. We treat your business as our own, investing ourselves fully in your growth.' },
    ];

    const stats = [
        { value: '150+', label: 'Clients Served' },
        { value: '94%', label: 'Client Satisfaction' },
        { value: '$2.5M+', label: 'Cost Savings Generated' },
        { value: '50+', label: 'Industries Served' },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-deep-blue text-white py-24 md:py-32 text-center" style={{backgroundImage: 'url(https://picsum.photos/seed/about-hero/1920/1080)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay'}}>
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-deep-blue/50 py-10 rounded-lg">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">We're Business People Who Happen to Love AI</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">Our mission is to make AI accessible, practical, and profitable for small businesses everywhere.</p>
                </div>
            </div>

            <Section>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-deep-blue mb-8">Our Story</h2>
                    <div className="prose lg:prose-xl mx-auto text-dark-gray space-y-6">
                        <p>Dainamo was founded in 2021 by a group of former small business owners who saw a growing divide. On one side, massive corporations were leveraging AI to become faster, smarter, and more efficient. On the other, small businesses—the backbone of our economy—were being left behind, intimidated by the cost, complexity, and jargon of the AI world.</p>
                        <p>We knew there had to be a better way. We believed that AI wasn't just for tech giants; it was for the local retailer, the regional logistics company, the neighborhood service provider. The key was to focus not on the hype, but on the practical application: How can this technology save you time? How can it reduce your overhead? How can it help you delight your customers?</p>
                        <p>With that mission, Dainamo was born. We built a consultancy focused exclusively on the needs of small and medium-sized businesses. We threw out the tech-speak and focused on clear, measurable business outcomes. Today, we're proud to have helped over 150 businesses demystify AI and turn it into their competitive advantage.</p>
                    </div>
                </div>
            </Section>

            <Section className="bg-light-gray">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-deep-blue mb-12">Meet the Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map(member => (
                        <div key={member.name} className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src={member.photoUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-deep-blue">{member.name}</h3>
                            <p className="text-electric-blue font-semibold mb-2">{member.title}</p>
                            <p className="text-dark-gray text-sm mb-4">{member.bio}</p>
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block text-deep-blue hover:text-electric-blue">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>
                            </a>
                        </div>
                    ))}
                </div>
            </Section>
            
            <Section>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-deep-blue mb-12">Our Values</h2>
                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map(value => (
                        <div key={value.title} className="p-6">
                            <h3 className="text-2xl font-bold text-deep-blue mb-2">{value.title}</h3>
                            <p className="text-dark-gray">{value.text}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <div className="bg-light-teal py-16">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map(stat => (
                            <div key={stat.label}>
                                <p className="text-4xl font-bold text-deep-blue">{stat.value}</p>
                                <p className="text-lg text-dark-gray">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        </motion.div>
    );
};

export default AboutPage;
