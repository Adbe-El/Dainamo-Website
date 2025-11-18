
import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useSite } from '../App';
import { motion } from 'framer-motion';
import { BlogPost } from '../types';

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <Link to={`/blog/${post.slug}`} className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <img src={post.featuredImageUrl} alt={post.title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <p className="text-sm font-semibold text-electric-blue mb-2">{post.category}</p>
            <h3 className="text-xl font-bold text-deep-blue mb-2 group-hover:text-electric-blue transition-colors">{post.title}</h3>
            <p className="text-dark-gray text-sm mb-4">{post.excerpt}</p>
            <p className="text-xs text-gray-500">{new Date(post.publishedDate).toLocaleDateString()} · {post.readTime} min read</p>
        </div>
    </Link>
);


const BlogListPage: React.FC = () => {
    const { blogPosts } = useSite();
    const publishedPosts = blogPosts.filter(p => p.status === 'Published').sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    const featuredPost = publishedPosts[0];
    const otherPosts = publishedPosts.slice(1);

    if (!featuredPost) {
        return <div className="text-center py-24">No blog posts found.</div>
    }

    return (
        <>
            <div className="bg-light-gray text-center py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-deep-blue mb-4">AI Insights for Small Business Owners</h1>
                    <p className="text-lg text-dark-gray max-w-2xl mx-auto">Practical tips, case studies, and industry news—no technical jargon required.</p>
                </div>
            </div>

            <div className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Featured Post */}
                    <h2 className="text-3xl font-bold text-deep-blue mb-8">Featured Post</h2>
                    <Link to={`/blog/${featuredPost.slug}`} className="block group md:grid md:grid-cols-2 gap-8 items-center bg-white rounded-lg shadow-xl overflow-hidden mb-16">
                        <img src={featuredPost.featuredImageUrl} alt={featuredPost.title} className="w-full h-64 md:h-full object-cover" />
                        <div className="p-8">
                            <p className="text-sm font-semibold text-electric-blue mb-2">{featuredPost.category}</p>
                            <h3 className="text-3xl font-bold text-deep-blue mb-4 group-hover:text-electric-blue transition-colors">{featuredPost.title}</h3>
                            <p className="text-dark-gray mb-4">{featuredPost.excerpt}</p>
                            <p className="text-sm text-gray-500">By {featuredPost.author} · {new Date(featuredPost.publishedDate).toLocaleDateString()} · {featuredPost.readTime} min read</p>
                             <span className="mt-6 inline-block font-semibold text-white bg-electric-blue px-6 py-3 rounded-lg group-hover:bg-deep-blue transition-colors">Read More</span>
                        </div>
                    </Link>

                    {/* Blog Grid */}
                     <h2 className="text-3xl font-bold text-deep-blue mb-8">All Posts</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherPosts.map(post => <BlogCard key={post.id} post={post} />)}
                    </div>
                </div>
            </div>
        </>
    )
}

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { blogPosts } = useSite();
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return <Navigate to="/blog" />;
    }

    return (
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-8">
                        <Link to="/blog" className="text-electric-blue hover:underline mb-4 inline-block">&larr; Back to all posts</Link>
                        <p className="text-sm font-semibold text-electric-blue">{post.category}</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-deep-blue my-2">{post.title}</h1>
                        <div className="flex items-center text-sm text-gray-500">
                             <img src="https://picsum.photos/seed/author/40/40" alt={post.author} className="w-10 h-10 rounded-full mr-3"/>
                            <span>By {post.author} on {new Date(post.publishedDate).toLocaleDateString()} · {post.readTime} min read</span>
                        </div>
                    </header>
                    <img src={post.featuredImageUrl} alt={post.title} className="w-full rounded-lg shadow-lg mb-8" />

                    <article className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
                    
                    <div className="mt-16 p-8 bg-light-teal rounded-lg text-center">
                        <h3 className="text-2xl font-bold text-deep-blue mb-2">Need Help Implementing This?</h3>
                        <p className="text-dark-gray mb-6">Turn insights into action. Our team can help you apply these strategies to your business.</p>
                        <Link to="/contact" className="px-6 py-3 font-semibold text-white bg-electric-blue rounded-lg shadow-md hover:bg-deep-blue transition-colors">Book a Free Consultation</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


const BlogPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
           {slug ? <BlogPostPage /> : <BlogListPage />}
        </motion.div>
    );
};

export default BlogPage;
