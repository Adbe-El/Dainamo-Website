
export interface SiteSettings {
    siteTitle: string;
    tagline: string;
    contactPhone: string;
    contactEmail: string;
    officeAddress: string;
    businessHours: string;
    social: {
        linkedin: string;
        twitter: string;
        facebook: string;
    };
    seo: {
        metaDescription: string;
        keywords: string;
    };
    formSettings: {
        googleSheetsUrl: string;
    };
    abTest: {
        heroHeadlineA: string;
        heroHeadlineB: string;
        ctaTextA: string;
        ctaTextB: string;
    }
}

export interface Testimonial {
    id: string;
    name: string;
    title: string;
    company: string;
    quote: string;
    resultBadge: string;
    photoUrl: string;
    active: boolean;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    category: string;
    featuredImageUrl: string;
    excerpt: string;
    content: string; // HTML content from rich text editor
    author: string;
    publishedDate: string; // ISO string
    status: 'Published' | 'Draft';
    readTime: number; // in minutes
}
