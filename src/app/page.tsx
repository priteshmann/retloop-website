'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SignupModal, ContactForm, AnalyticsTracker, NewsletterSignup } from './FunctionalComponents';

export default function Home() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const statBoxes = [
    { number: '73%', text: 'of shoppers complete purchase after viewing AI videos.' },
    { number: '47%', text: 'increase in cart recovery rates using personalized videos.' },
    { number: '340%', text: 'improvement in customer engagement with AI-generated content.' },
  ];

  const projectStats = [
    { percent: '3x', text: 'higher conversion rates with AI video cart recovery' },
  ];
  
  const toolStats = [
    { percent: '85%', text: 'reduction in abandoned carts with automated video follow-ups' },
  ];

  const loveStats = [
    { number: '2.1K+', text: 'Shopify stores use Retloop daily to recover abandoned carts.' },
    { number: '47K+', text: 'personalized cart recovery videos generated monthly.' },
    { number: '890K+', text: 'recovered customers brought back with AI videos.' },
  ];

  const aiAgentFeatures = [
    { text: 'AI Video Generation', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M8 5v14l11-7z"/>
      </svg>
    )},
    { text: 'Personalized Scripts', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.25a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z" clipRule="evenodd" />
      </svg>
    )},
    { text: 'Shopify Integration', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M12 21a9 9 0 100-18 9 9 0 000 18zM10.5 8.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V8.25zM12 15a3 3 0 100-6 3 3 0 000 6zm-3.75-2.25a.75.75 0 010-1.5h7.5a.75.75 0 010 1.5h-7.5z" clipRule="evenodd" />
      </svg>
    )},
    { text: 'Email Automation', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
      </svg>
    )},
  ];

  const customerLogos = [
    { title: 'TechHub Store', url: 'https://placehold.co/120x40/4A154B/FFFFFF?text=TechHub+Store' },
    { title: 'Luxury Lifestyle', url: 'https://placehold.co/120x40/4A154B/FFFFFF?text=Luxury+Lifestyle' },
    { title: 'FitGear Pro', url: 'https://placehold.co/120x40/4A154B/FFFFFF?text=FitGear+Pro' },
    { title: 'Home Essentials', url: 'https://placehold.co/120x40/4A154B/FFFFFF?text=Home+Essentials' },
    { title: 'Fashion Forward', url: 'https://placehold.co/120x40/4A154B/FFFFFF?text=Fashion+Forward' },
    { title: 'Gadget Galaxy', url: 'https://placehold.co/120x40/4A154B/FFFFFF?text=Gadget+Galaxy' },
  ];

  const testimonials = [
    {
      quote: "Retloop increased our cart recovery rate by 47% in the first month. The AI videos are incredibly engaging and feel personal to each customer.",
      author: "Sarah Chen",
      role: "E-commerce Director",
      company: "TechHub Store",
      avatar: "https://placehold.co/60x60/4A154B/FFFFFF?text=SC"
    },
    {
      quote: "The setup was incredibly easy and the results were immediate. We've recovered over $50,000 in abandoned cart revenue since implementing Retloop.",
      author: "Michael Rodriguez",
      role: "Founder",
      company: "FitGear Pro",
      avatar: "https://placehold.co/60x60/4A154B/FFFFFF?text=MR"
    },
    {
      quote: "The personalized AI videos create an emotional connection that generic emails just can't match. Our customers actually want to watch them!",
      author: "Emma Thompson",
      role: "Marketing Manager",
      company: "Luxury Lifestyle",
      avatar: "https://placehold.co/60x60/4A154B/FFFFFF?text=ET"
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "$49",
      period: "/month",
      description: "Perfect for growing stores",
      features: [
        "Up to 50 cart recoveries/month",
        "AI-generated personalized videos",
        "Basic email automation",
        "Shopify integration",
        "Analytics dashboard",
        "Email support"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Premium",
      price: "$299",
      period: "/month",
      description: "Best for established businesses",
      features: [
        "Up to 120 cart recoveries/month",
        "Advanced AI video personalization",
        "Multi-channel automation",
        "Custom branding",
        "Priority support",
        "Advanced analytics",
        "A/B testing",
        "Custom integrations"
      ],
      cta: "Start Free Trial",
      popular: true
    }
  ];

  // Handle button clicks - Use animated modals instead of redirects
  const handleTrialClick = (source: string) => {
    console.log('Trial clicked from:', source);
    setIsSignupModalOpen(true);
  };

  const handleSignInClick = () => {
    console.log('Sign in clicked');
    setIsSignupModalOpen(true);
  };

  const handleDemoClick = () => {
    console.log('Demo clicked');
    window.open('https://calendly.com/your-retloop-demo', '_blank');
  };

  const handlePricingClick = (plan: string) => {
    console.log('Free trial clicked from pricing:', plan);
    setIsSignupModalOpen(true);
  };
  
  return (
    <div className="bg-white font-sans text-gray-900 leading-normal tracking-wide">
      <AnalyticsTracker />
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)} 
      />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md rounded-b-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <a href="#" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4A154B" className="w-6 h-6">
                <path d="M12 2L13.09 8.26L22 9L13.09 15.74L12 2ZM12 2L10.91 8.26L2 9L10.91 15.74L12 2Z" />
              </svg>
              <span className="font-bold text-lg ml-2">Retloop</span>
            </a>

            {/* Primary nav links (kept hidden on small screens like before) */}
            <nav className="hidden lg:flex space-x-4 text-sm">
              <a href="#features" className="text-gray-700 hover:text-gray-900">Why Retloop?</a>
              <a href="#product" className="text-gray-700 hover:text-gray-900">Product</a>
              <a href="#testimonials" className="text-gray-700 hover:text-gray-900">Customers</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900">Resources</a>
              <a href="#pricing" className="text-gray-700 hover:text-gray-900">Pricing</a>
            </nav>
          </div>

          {/* Updated navigation per your snippet */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/auth/signin" 
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Sign In
            </Link>
            <button 
              onClick={() => setIsSignupModalOpen(true)}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700"
            >
              START FREE TRIAL
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#4A154B] to-purple-800 text-white pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Where cart recovery happens
            </h1>
            <p className="mt-4 sm:mt-6 text-xl sm:text-2xl font-light opacity-80">
              Turn abandoned carts into customers with AI videos.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => handleTrialClick('hero')}
                className="bg-white text-[#4A154B] font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors text-lg"
              >
                START 14-DAY FREE TRIAL
              </button>
              <button 
                onClick={handleDemoClick}
                className="text-white font-semibold underline text-lg hover:text-gray-200 transition-colors"
              >
                WATCH DEMO
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center hero-right">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="demo-video"
              style={{
                width: '100%',
                maxWidth: '600px',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
              }}
            >
              <source src="/retloop-demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
            {statBoxes.map((box, index) => (
              <div key={index} className="text-center md:w-1/3">
                <h3 className="text-5xl font-extrabold text-[#4A154B]">{box.number}</h3>
                <p className="mt-2 text-lg font-medium text-gray-600">{box.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative overflow-hidden bg-white py-24">
        <div className="absolute top-0 left-1/2 w-[100vw] h-[600px] bg-[#4A154B] transform -translate-x-1/2 rotate-6 -z-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4A154B] text-center mb-8">
              Bring your products, customers, and AI videos together
            </h2>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 mb-8">
              {aiAgentFeatures.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm sm:text-base font-semibold text-gray-700">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <img src="https://placehold.co/1000x600/F2EEFB/4A154B?text=AI+VIDEO+GENERATION" alt="AI Video Generation Interface" className="rounded-xl w-full shadow-lg" />
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="py-20 px-4">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4A154B] mb-4">
              Recover abandoned carts and boost revenue faster
            </h2>
            <p className="text-lg text-gray-600">
              Connect your Shopify store to Retloop and automatically generate personalized AI videos for every abandoned cart.
            </p>
            <div className="mt-8">
              {projectStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-center lg:justify-start space-x-4">
                  <span className="text-6xl font-extrabold text-orange-500">{stat.percent}</span>
                  <p className="text-xl font-semibold text-gray-700 max-w-xs">{stat.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <img src="https://placehold.co/1000x600/FEE6B0/4A154B?text=CART+RECOVERY+DASHBOARD" alt="Cart Recovery Dashboard" className="rounded-xl w-full shadow-lg" />
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <img src="https://placehold.co/1000x600/C5E8CF/4A154B?text=SHOPIFY+INTEGRATION" alt="Shopify Integration" className="rounded-xl w-full shadow-lg" />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4A154B] mb-4">
              Seamless integration with your existing Shopify store
            </h2>
            <p className="text-lg text-gray-600">
              Install Retloop in minutes and let AI handle personalized cart recovery videos while you focus on growing your business.
            </p>
            <div className="mt-8">
              {toolStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-center lg:justify-start space-x-4">
                  <span className="text-6xl font-extrabold text-green-600">{stat.percent}</span>
                  <p className="text-xl font-semibold text-gray-700 max-w-xs">{stat.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-50 py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4A154B] text-center mb-16">
            What our customers are saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4A154B] mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your business. All plans include a 14-day free trial.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-lg p-8 relative ${plan.popular ? 'ring-2 ring-[#4A154B]' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-[#4A154B] text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[#4A154B] mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-extrabold text-[#4A154B]">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handlePricingClick(plan.name)}
                  className={`w-full py-4 px-6 rounded-full font-bold text-lg transition-colors ${
                    plan.popular 
                      ? 'bg-[#4A154B] text-white hover:bg-purple-900' 
                      : 'border-2 border-[#4A154B] text-[#4A154B] hover:bg-[#4A154B] hover:text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4A154B] mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-gray-600">
              Have questions? Our team is here to help you succeed.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ContactForm />
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#4A154B] mb-4">Why choose Retloop?</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Setup in under 5 minutes
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    No technical knowledge required
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    24/7 customer support
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    30-day money-back guarantee
                  </li>
                </ul>
              </div>
              <NewsletterSignup />
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Need immediate help?</h4>
                <p className="text-sm text-gray-600 mb-4">Our support team responds within 2 hours</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-[#4A154B] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    support@retloop.com
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-[#4A154B] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Live chat available 9-5 EST
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* We're in the business section */}
      <section className="bg-[#4A154B] text-white py-24 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8">
            We're in the business of recovering revenue.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {statBoxes.map((box, index) => (
              <div key={index} className="bg-white/10 p-6 rounded-lg shadow-lg">
                <h3 className="text-5xl font-extrabold">{box.number}</h3>
                <p className="mt-2 text-lg font-light opacity-80">{box.text}</p>
              </div>
            ))}
          </div>
          <p className="text-lg font-light max-w-4xl mx-auto mb-12">
            Thousands of Shopify merchants trust Retloop to automatically recover their abandoned carts with personalized AI videos.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            {customerLogos.map((logo, index) => (
              <img key={index} src={logo.url} alt={logo.title} className="h-10 opacity-70" />
            ))}
          </div>
          <button 
            onClick={() => handleTrialClick('cta')}
            className="bg-white text-[#4A154B] font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors text-lg"
          >
            START YOUR FREE TRIAL TODAY
          </button>
        </div>
      </section>

      {/* Love Retloop Section */}
      <section className="bg-white py-24 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4A154B] mb-8">
            Thousands of merchants love using Retloop.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {loveStats.map((stat, index) => (
              <div key={index} className="p-6">
                <h3 className="text-5xl font-extrabold text-orange-500">{stat.number}</h3>
                <p className="mt-2 text-lg font-medium text-gray-600">{stat.text}</p>
              </div>
            ))}
          </div>
          <p className="text-lg font-semibold text-gray-700">
            Don't just take our word for it. <a href="#testimonials" className="underline text-[#4A154B]">Read our case studies.</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4A154B] text-white py-16 px-4">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M12 2L13.09 8.26L22 9L13.09 15.74L12 2ZM12 2L10.91 8.26L2 9L10.91 15.74L12 2Z" />
              </svg>
              <span className="font-bold text-lg ml-2">Retloop</span>
            </a>
            <p className="text-sm">© 2024 Retloop Technologies, LLC. All rights reserved. Various trademarks held by their respective owners.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">PRODUCT</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="#features" className="hover:text-gray-300">Features</a></li>
              <li><a href="#pricing" className="hover:text-gray-300">Pricing</a></li>
              <li><a href="#" className="hover:text-gray-300">Enterprise</a></li>
              <li><a href="#" className="hover:text-gray-300">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">RESOURCES</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/help" className="hover:text-gray-300">Help Center</Link></li>
              <li><a href="#" className="hover:text-gray-300">API Docs</a></li>
              <li><a href="#" className="hover:text-gray-300">Blog</a></li>
              <li><a href="#" className="hover:text-gray-300">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">COMPANY</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-gray-300">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-gray-300">Terms</Link></li>
              <li><Link href="/refunds" className="hover:text-gray-300">Refunds</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
