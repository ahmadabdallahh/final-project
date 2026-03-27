import { Building2, Users, Target, Heart, Shield, Truck, Award, Clock } from 'lucide-react';

function AboutUs() {
    const values = [
        {
            icon: Target,
            title: 'Our Mission',
            description: 'To provide high-quality products at affordable prices while delivering exceptional customer service and a seamless shopping experience.'
        },
        {
            icon: Heart,
            title: 'Customer First',
            description: 'We put our customers at the heart of everything we do, ensuring satisfaction through quality products and dedicated support.'
        },
        {
            icon: Shield,
            title: 'Trust & Quality',
            description: 'Every product in our catalog is carefully vetted to meet our high standards of quality and reliability.'
        },
        {
            icon: Truck,
            title: 'Fast Delivery',
            description: 'We partner with reliable logistics providers to ensure your orders reach you quickly and safely.'
        }
    ];

    const stats = [
        { number: '10K+', label: 'Happy Customers' },
        { number: '500+', label: 'Products' },
        { number: '50+', label: 'Categories' },
        { number: '24/7', label: 'Support' }
    ];

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center py-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl text-white px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About ShopApp</h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                    Your trusted destination for quality products and exceptional shopping experiences
                </p>
            </div>

            {/* Our Story */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center mb-6">
                    <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Story</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-slate-300 space-y-4">
                    <p>
                        Founded in 2024, ShopApp began with a simple mission: to make quality products accessible to everyone. 
                        What started as a small online store has grown into a trusted e-commerce platform serving thousands 
                        of customers worldwide.
                    </p>
                    <p>
                        We believe that shopping should be easy, enjoyable, and trustworthy. That&apos;s why we&apos;ve built our platform 
                        with user experience at its core, ensuring that every interaction - from browsing to checkout - is 
                        smooth and hassle-free.
                    </p>
                    <p>
                        Our team consists of passionate individuals who are dedicated to curating the best products and 
                        providing exceptional customer service. We work tirelessly to expand our catalog while maintaining 
                        the quality standards that our customers have come to expect.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 text-center border border-gray-200 dark:border-slate-700">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.number}</div>
                        <div className="text-gray-600 dark:text-slate-400">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Our Values */}
            <div>
                <div className="flex items-center mb-8">
                    <Award className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Values</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {values.map((value, index) => (
                        <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <value.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                                    <p className="text-gray-600 dark:text-slate-400">{value.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center mb-6">
                    <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Team</h2>
                </div>
                <p className="text-gray-600 dark:text-slate-300 mb-6">
                    Behind ShopApp is a dedicated team of professionals committed to delivering the best shopping experience. 
                    From our customer support specialists available around the clock to our product curators who handpick 
                    every item in our catalog, each team member plays a vital role in our success.
                </p>
                <div className="flex items-center text-gray-600 dark:text-slate-400">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Available 24/7 to assist you with any questions or concerns</span>
                </div>
            </div>

            {/* Commitment */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Our Commitment to You</h2>
                <p className="text-slate-300 mb-6">
                    We are committed to continuously improving our platform and services. Your feedback drives our innovation, 
                    and we&apos;re always looking for ways to enhance your shopping experience. Thank you for choosing ShopApp - 
                    we look forward to serving you!
                </p>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                        <Shield className="h-5 w-5 text-green-400 mr-2" />
                        <span className="text-sm">Secure Shopping</span>
                    </div>
                    <div className="flex items-center">
                        <Award className="h-5 w-5 text-yellow-400 mr-2" />
                        <span className="text-sm">Quality Guaranteed</span>
                    </div>
                    <div className="flex items-center">
                        <Heart className="h-5 w-5 text-red-400 mr-2" />
                        <span className="text-sm">Customer Loved</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
