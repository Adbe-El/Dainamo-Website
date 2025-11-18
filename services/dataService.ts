
import { useState, useEffect } from 'react';
import { SiteSettings, Testimonial, BlogPost } from '../types';

export function useLocalStorage<T,>(key: string, initialValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

export const getInitialData = () => {
    const slugify = (text: string) => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    // FIX: Removed redundant `slug` properties and used `as const` to ensure the `status` property is inferred as a literal type, not a general string. This resolves the type incompatibility with `BlogPost[]`.
    const initialBlogPosts: BlogPost[] = ([
        { id: '1', title: "5 Ways AI Can Save Your Business 10 Hours Per Week", category: "Efficiency", author: "Jane Doe", content: "<p>Here is the full content for the blog post...</p>", excerpt: "Discover practical AI tools that can automate repetitive tasks and free up valuable time for you and your team.", featuredImageUrl: "https://picsum.photos/seed/blog1/1200/630", publishedDate: new Date().toISOString(), readTime: 5, status: "Published"},
        { id: '2', title: "AI Chatbots vs. Human Support: Finding the Right Balance", category: "Customer Service", author: "John Smith", content: "<p>Full content...</p>", excerpt: "Learn how to blend AI efficiency with the human touch to create an exceptional customer service experience.", featuredImageUrl: "https://picsum.photos/seed/blog2/1200/630", publishedDate: new Date().toISOString(), readTime: 6, status: "Published"},
        { id: '3', title: "How Small Retailers Are Using AI to Compete with Amazon", category: "E-commerce", author: "Emily White", content: "<p>Full content...</p>", excerpt: "Explore affordable AI strategies in inventory management, marketing, and personalization that level the playing field.", featuredImageUrl: "https://picsum.photos/seed/blog3/1200/630", publishedDate: new Date().toISOString(), readTime: 7, status: "Published"},
        { id: '4', title: "The Real Cost of NOT Using AI in 2025", category: "Strategy", author: "Michael Brown", content: "<p>Full content...</p>", excerpt: "We break down the opportunity costs and competitive disadvantages of delaying AI adoption in your business.", featuredImageUrl: "https://picsum.photos/seed/blog4/1200/630", publishedDate: new Date().toISOString(), readTime: 5, status: "Published"},
        { id: '5', title: "AI Implementation Checklist: 10 Things to Prepare", category: "Implementation", author: "Jane Doe", content: "<p>Full content...</p>", excerpt: "Your guide to a smooth AI integration. Follow these 10 steps to ensure your project is a success from day one.", featuredImageUrl: "https://picsum.photos/seed/blog5/1200/630", publishedDate: new Date().toISOString(), readTime: 8, status: "Draft"},
    ] as const).map(post => ({...post, slug: slugify(post.title)}));


    const initialTestimonials: Testimonial[] = [
        { id: '1', name: "Sarah Martinez", title: "Owner, Martinez Retail Co.", company: "Martinez Retail Co.", quote: "Dainamo helped us automate our customer inquiry process. We're now handling 3x more inquiries with the same team size.", resultBadge: "200% Efficiency Increase", photoUrl: "https://picsum.photos/seed/person1/200/200", active: true },
        { id: '2', name: "James Chen", title: "Founder, Chen Logistics", company: "Chen Logistics", quote: "I was skeptical about AI, but their team made it simple. We cut our admin time by 15 hours per week.", resultBadge: "15 Hours Saved Weekly", photoUrl: "https://picsum.photos/seed/person2/200/200", active: true },
        { id: '3', name: "Aisha Okonkwo", title: "CEO, Okonkwo Services", company: "Okonkwo Services", quote: "The ROI was clear within 60 days. Our customer satisfaction scores went up while our costs went down.", resultBadge: "60-Day ROI", photoUrl: "https://picsum.photos/seed/person3/200/200", active: true },
    ];
    
    const initialSiteSettings: SiteSettings = {
        siteTitle: "Dainamo AI",
        tagline: "AI Consulting for Small Business",
        contactPhone: "+1-555-123-4567",
        contactEmail: "hello@dainamo.com",
        officeAddress: "123 Innovation Way, Austin, TX 78701",
        businessHours: "Monday - Friday, 9am - 5pm CT",
        social: {
            linkedin: "https://linkedin.com/company/dainamo",
            twitter: "https://twitter.com/dainamo",
            facebook: "https://facebook.com/dainamo"
        },
        seo: {
            metaDescription: "Dainamo helps small businesses implement practical AI solutions that save time, reduce costs, and drive growth—without the complexity.",
            keywords: "AI consulting, small business AI, AI automation, business AI strategy"
        },
        formSettings: {
            googleSheetsUrl: ""
        },
        abTest: {
            heroHeadlineA: "Transform Your Business with AI That Actually Works",
            heroHeadlineB: "Practical AI Solutions for Real Small Businesses",
            ctaTextA: "Book Your Free Consultation",
            ctaTextB: "Get Your Free AI Plan"
        }
    };

    return {
        siteSettings: initialSiteSettings,
        testimonials: initialTestimonials,
        blogPosts: initialBlogPosts
    };
};
