
import React, { useState } from 'react';
import { useSite } from '../App';
import { useLocalStorage } from '../services/dataService';
import { SiteSettings, Testimonial, BlogPost } from '../types';

type AdminView = 'dashboard' | 'testimonials' | 'blog' | 'settings';

// Common input styles
const inputClass = "w-full p-2 border border-gray-600 rounded bg-deep-blue text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue";

const AdminLoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'changeme123') { // Simple hardcoded password
            sessionStorage.setItem('isAdmin', 'true');
            onLogin();
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-1">Username</label>
                        <input type="text" value="admin" readOnly className={`${inputClass} opacity-70 cursor-not-allowed`} />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-1">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
                    </div>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
                </form>
            </div>
        </div>
    );
};

const TestimonialsManager: React.FC = () => {
    const { testimonials, setTestimonials } = useSite();
    const [editing, setEditing] = useState<Testimonial | null>(null);

    const handleSave = (testimonial: Testimonial) => {
        const index = testimonials.findIndex(t => t.id === testimonial.id);
        const newTestimonials = [...testimonials];
        if (index > -1) {
            newTestimonials[index] = testimonial;
        } else {
            newTestimonials.push({ ...testimonial, id: Date.now().toString() });
        }
        setTestimonials(newTestimonials);
        setEditing(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            setTestimonials(testimonials.filter(t => t.id !== id));
        }
    };
    
    // Form component
    const TestimonialForm: React.FC<{ testimonial: Testimonial, onSave: (t: Testimonial) => void, onCancel: () => void }> = ({ testimonial, onSave, onCancel }) => {
        const [formData, setFormData] = useState(testimonial);
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
        return (
             <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <h3 className="text-xl font-bold mb-4">{formData.id ? 'Edit' : 'Add'} Testimonial</h3>
                <div className="grid grid-cols-2 gap-4">
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className={inputClass} />
                    <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className={inputClass} />
                    <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" className={inputClass} />
                    <input name="resultBadge" value={formData.resultBadge} onChange={handleChange} placeholder="Result Badge" className={inputClass} />
                    <div className="col-span-2">
                        <input name="photoUrl" value={formData.photoUrl} onChange={handleChange} placeholder="Photo URL" className={inputClass} />
                    </div>
                    <textarea name="quote" value={formData.quote} onChange={handleChange} placeholder="Quote" rows={3} className={`${inputClass} col-span-2`} />
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                    <button onClick={() => onSave(formData)} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
            <button onClick={() => setEditing({id: '', name: '', title: '', company: '', quote: '', resultBadge: '', photoUrl: 'https://picsum.photos/200', active: true})} className="bg-green-500 text-white px-4 py-2 rounded mb-4">Add New</button>
            {editing && <TestimonialForm testimonial={editing} onSave={handleSave} onCancel={() => setEditing(null)} />}
            <div className="space-y-4 mt-4">
                {testimonials.map(t => (
                    <div key={t.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                        <div>
                            <p className="font-bold">{t.name}, {t.company}</p>
                            <p className="text-sm text-gray-600">"{t.quote.substring(0, 50)}..."</p>
                        </div>
                        <div className="space-x-2">
                             <button onClick={() => setEditing(t)} className="bg-yellow-400 px-3 py-1 rounded text-sm">Edit</button>
                             <button onClick={() => handleDelete(t.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BlogManager: React.FC = () => {
    const { blogPosts, setBlogPosts } = useSite();
    const [editing, setEditing] = useState<BlogPost | null>(null);

    const handleSave = (post: BlogPost) => {
        const index = blogPosts.findIndex(p => p.id === post.id);
        const newPosts = [...blogPosts];
        if (index > -1) {
            newPosts[index] = post;
        } else {
            const newPost = { ...post, id: Date.now().toString(), slug: post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') };
            newPosts.push(newPost);
        }
        setBlogPosts(newPosts);
        setEditing(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setBlogPosts(blogPosts.filter(p => p.id !== id));
        }
    };
    
    const BlogPostForm: React.FC<{ post: BlogPost, onSave: (p: BlogPost) => void, onCancel: () => void }> = ({ post, onSave, onCancel }) => {
        const [formData, setFormData] = useState(post);
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
        const handleContentChange = (content: string) => {
            setFormData({...formData, content});
        }

        return (
             <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <h3 className="text-xl font-bold mb-4">{formData.id ? 'Edit' : 'Add'} Post</h3>
                <div className="space-y-4">
                    <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className={inputClass} />
                    <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" className={inputClass} />
                    <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className={inputClass} />
                    <input name="featuredImageUrl" value={formData.featuredImageUrl} onChange={handleChange} placeholder="Image URL" className={inputClass} />
                    <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="Excerpt" rows={3} className={inputClass} />
                    {/* Simplified Content Editor */}
                    <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content (HTML)" rows={10} className={inputClass} />
                    <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                        <option value="Published" className="bg-deep-blue text-white">Published</option>
                        <option value="Draft" className="bg-deep-blue text-white">Draft</option>
                    </select>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                    <button onClick={() => onSave(formData)} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
             <button onClick={() => setEditing({id: '', title: '', slug: '', category: '', featuredImageUrl: 'https://picsum.photos/1200/630', excerpt: '', content: '', author: 'Admin', publishedDate: new Date().toISOString(), status: 'Draft', readTime: 5})} className="bg-green-500 text-white px-4 py-2 rounded mb-4">Create New Post</button>
            {editing && <BlogPostForm post={editing} onSave={handleSave} onCancel={() => setEditing(null)} />}
             <div className="space-y-4 mt-4">
                {blogPosts.map(p => (
                    <div key={p.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                        <div>
                            <p className="font-bold">{p.title}</p>
                            <p className="text-sm text-gray-600">{p.status} - {p.author}</p>
                        </div>
                        <div className="space-x-2">
                             <button onClick={() => setEditing(p)} className="bg-yellow-400 px-3 py-1 rounded text-sm">Edit</button>
                             <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SettingsManager: React.FC = () => {
    const { siteSettings, setSiteSettings } = useSite();
    const [settings, setSettings] = useState(siteSettings);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        if (keys.length > 1) {
            setSettings(prev => ({
                ...prev,
                [keys[0]]: {
                    ...(prev as any)[keys[0]],
                    [keys[1]]: value
                }
            }));
        } else {
            setSettings(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSave = () => {
        setSiteSettings(settings);
        alert('Settings saved!');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Site Settings</h2>
            <div className="space-y-4 bg-white p-4 rounded-lg shadow">
                 <input name="siteTitle" value={settings.siteTitle} onChange={handleChange} placeholder="Site Title" className={inputClass} />
                 <textarea name="seo.metaDescription" value={settings.seo.metaDescription} onChange={handleChange} placeholder="Meta Description" className={inputClass} />
                 <input name="contactEmail" value={settings.contactEmail} onChange={handleChange} placeholder="Contact Email" className={inputClass} />
                 <input name="contactPhone" value={settings.contactPhone} onChange={handleChange} placeholder="Contact Phone" className={inputClass} />
                 <input name="formSettings.googleSheetsUrl" value={settings.formSettings.googleSheetsUrl} onChange={handleChange} placeholder="Google Sheets URL" className={inputClass} />
                 <hr/>
                 <h3 className="font-bold">A/B Testing</h3>
                 <input name="abTest.heroHeadlineA" value={settings.abTest.heroHeadlineA} onChange={handleChange} placeholder="Headline A" className={inputClass} />
                 <input name="abTest.heroHeadlineB" value={settings.abTest.heroHeadlineB} onChange={handleChange} placeholder="Headline B" className={inputClass} />
            </div>
            <button onClick={handleSave} className="bg-blue-500 text-white px-6 py-2 rounded mt-4">Save Settings</button>
        </div>
    );
}

const AdminDashboard: React.FC = () => {
    const [view, setView] = useState<AdminView>('dashboard');

    const renderView = () => {
        switch(view) {
            case 'testimonials': return <TestimonialsManager />;
            case 'blog': return <BlogManager />;
            case 'settings': return <SettingsManager />;
            default: return <p>Welcome to the dashboard. Select a section to manage.</p>;
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <nav className="w-64 bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold mb-8">Dainamo Admin</h1>
                <ul>
                    <li className="mb-2"><button onClick={() => setView('dashboard')} className="w-full text-left p-2 rounded hover:bg-gray-700">Dashboard</button></li>
                    <li className="mb-2"><button onClick={() => setView('testimonials')} className="w-full text-left p-2 rounded hover:bg-gray-700">Testimonials</button></li>
                    <li className="mb-2"><button onClick={() => setView('blog')} className="w-full text-left p-2 rounded hover:bg-gray-700">Blog</button></li>
                    <li className="mb-2"><button onClick={() => setView('settings')} className="w-full text-left p-2 rounded hover:bg-gray-700">Settings</button></li>
                </ul>
            </nav>
            <main className="flex-1 p-8">
                {renderView()}
            </main>
        </div>
    );
};


const AdminPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isAdmin') === 'true');

    if (!isLoggedIn) {
        return <AdminLoginPage onLogin={() => setIsLoggedIn(true)} />;
    }

    return <AdminDashboard />;
};

export default AdminPage;
