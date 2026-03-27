import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '../components/Toast';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { success, error } = useToast();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
            error('Please fill in all fields');
            return;
        }

        if (!formData.email.includes('@')) {
            error('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            success('Thank you! Your message has been sent successfully.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            value: 'support@shopapp.com',
            description: 'For general inquiries and support'
        },
        {
            icon: Phone,
            title: 'Phone',
            value: '+1 (555) 123-4567',
            description: 'Mon-Fri from 8am to 6pm EST'
        },
        {
            icon: MapPin,
            title: 'Address',
            value: '123 Commerce Street',
            description: 'New York, NY 10001, USA'
        },
        {
            icon: Clock,
            title: 'Working Hours',
            value: '24/7 Online Support',
            description: 'Always here to help you'
        }
    ];

    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-12 text-center border border-gray-200 dark:border-slate-700">
                    <div className="w-20 h-20 bg-green-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-10 w-10 text-green-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Message Sent!</h2>
                    <p className="text-gray-600 dark:text-slate-400 mb-8">
                        Thank you for reaching out. We&apos;ve received your message and will get back to you within 24 hours.
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Send Another Message
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
                <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Have a question or need assistance? We&apos;re here to help! Reach out to us through any of the channels below.
                </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactInfo.map((info, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                            <info.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{info.title}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{info.value}</p>
                        <p className="text-sm text-gray-500 dark:text-slate-400">{info.description}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 border border-gray-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                Your Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 transition-colors duration-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 transition-colors duration-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                Subject *
                            </label>
                            <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors duration-300"
                            >
                                <option value="">Select a subject</option>
                                <option value="general">General Inquiry</option>
                                <option value="order">Order Status</option>
                                <option value="product">Product Question</option>
                                <option value="support">Technical Support</option>
                                <option value="feedback">Feedback</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                Message *
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="How can we help you today?"
                                rows={5}
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 resize-none transition-colors duration-300"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center disabled:bg-gray-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="h-5 w-5 mr-2" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* FAQ Section */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 border border-gray-200 dark:border-slate-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <div className="border-b border-gray-200 dark:border-slate-700 pb-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How do I track my order?</h3>
                                <p className="text-gray-600 dark:text-slate-400 text-sm">
                                    Once your order ships, you&apos;ll receive an email with a tracking number. You can use this number on our website or the carrier&apos;s website to track your package.
                                </p>
                            </div>
                            <div className="border-b border-gray-200 dark:border-slate-700 pb-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What is your return policy?</h3>
                                <p className="text-gray-600 dark:text-slate-400 text-sm">
                                    We offer a 30-day return policy for most items. Products must be in original condition with all packaging and accessories.
                                </p>
                            </div>
                            <div className="border-b border-gray-200 dark:border-slate-700 pb-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How long does shipping take?</h3>
                                <p className="text-gray-600 dark:text-slate-400 text-sm">
                                    Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available at checkout for most locations.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Do you ship internationally?</h3>
                                <p className="text-gray-600 dark:text-slate-400 text-sm">
                                    Yes! We ship to over 100 countries worldwide. International shipping times and rates vary by destination.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Support */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white">
                        <h3 className="text-xl font-bold mb-3">Need Immediate Help?</h3>
                        <p className="text-blue-100 mb-4">
                            Our customer support team is available 24/7 to assist you with any urgent matters.
                        </p>
                        <div className="flex items-center">
                            <Phone className="h-5 w-5 mr-2" />
                            <span className="font-semibold">+1 (555) 123-4567</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
