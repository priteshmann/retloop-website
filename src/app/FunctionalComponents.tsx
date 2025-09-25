'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Simplified Free Trial Signup Modal (No Plan Selection)
const SignupModal = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean, 
  onClose: () => void
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [modalScale, setModalScale] = useState(false);

  // Enhanced animation effect
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setEmail('');
      setMessage('');
      
      // Trigger animation after modal is rendered
      setTimeout(() => setModalScale(true), 10);
    } else {
      document.body.style.overflow = 'unset';
      setModalScale(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!email) {
      setMessage('Please enter your email address');
      setIsLoading(false);
      return;
    }

    try {
      // Store email with trial info
      const trialStartDate = new Date().toISOString();
      const trialEndDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(); // 14 days from now
      
      const { error } = await supabase
        .from('email_signups')
        .insert([
          { 
            email, 
            source: 'landing_page_trial',
            plan_selected: 'trial',
            trial_start_date: trialStartDate,
            trial_end_date: trialEndDate
            // Removed videos_remaining since it's unlimited now
          }
        ]);

      if (error) throw error;

      // Track with Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'trial_signup', {
          'event_category': 'engagement',
          'event_label': 'unlimited_trial',
          'trial_duration': 14
        });
      }

      setMessage('Success! Check your email to get started with your 14-day free trial.');
      
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup for free trial');
    // TODO: Implement Google OAuth for trial
  };

  const handleAppleSignup = () => {
    console.log('Apple signup for free trial');
    // TODO: Implement Apple OAuth for trial
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 p-4">
      <div 
        className={`bg-white rounded-lg shadow-2xl w-full max-w-md mx-auto transform transition-all duration-500 ease-out ${
          modalScale ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
        style={{ 
          border: '1px solid #e1e5e9',
          maxHeight: '90vh',
          overflowY: 'auto',
          transformOrigin: 'center center'
        }}
      >
        {/* Header with Retloop logo */}
        <div className="text-center pt-8 pb-4 px-8">
          <div className="flex justify-center mb-6">
            {/* Retloop logo - using colorful squares like Slack */}
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">retloop</span>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light"
        >
          ×
        </button>

        {/* Main content */}
        <div className="px-8 pb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Start your 14-day free trial
          </h1>
          
          <p className="text-gray-600 text-center mb-8">
            We suggest using the email address that you use at work.
          </p>

          {/* Email form */}

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@work-email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white text-lg transition-all duration-200 ${
                isLoading || !email
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 transform hover:scale-105'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating your account...
                </span>
              ) : (
                'Start Free Trial'
              )}
            </button>
          </form>

          {/* Message */}
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm text-center transform transition-all duration-300 ${
              message.includes('Success') 
                ? 'bg-green-50 text-green-700 border border-green-200 scale-100 opacity-100' 
                : 'bg-red-50 text-red-700 border border-red-200 scale-100 opacity-100'
            }`}>
              {message}
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-4 text-gray-500 text-sm">OTHER OPTIONS</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social login buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>

            <button
              onClick={handleAppleSignup}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-gray-700 font-medium">Continue with Apple</span>
            </button>
          </div>

          {/* Legal text */}
          <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
            By entering your email address and continuing, you will create a new Retloop account with a 14-day free trial. 
            No credit card required. You can cancel anytime.<br/><br/>
            By creating an account, you're agreeing to our main services agreement, user terms of service and 
            Retloop supplemental terms. Additional disclosures are available in our privacy policy and cookie policy.
          </p>

          {/* Sign in link */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">Already using Retloop?</p>
            <button
              onClick={() => {
                console.log('Sign in to existing account');
                // TODO: Handle sign in flow
              }}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm mt-1 transition-colors"
            >
              Sign in to an existing account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Keep all other components the same
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-purple-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const TestimonialCard = ({ name, company, content, rating }: { name: string, company: string, content: string, rating: number }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-600 mb-4">"{content}"</p>
      <div className="font-semibold">{name}</div>
      <div className="text-sm text-gray-500">{company}</div>
    </div>
  );
};

const PricingCard = ({ 
  plan, 
  price, 
  features, 
  isPopular, 
  onSelect 
}: { 
  plan: string, 
  price: string, 
  features: string[], 
  isPopular?: boolean,
  onSelect: () => void 
}) => {
  return (
    <div className={`bg-white p-8 rounded-lg shadow-md relative ${isPopular ? 'ring-2 ring-purple-600' : ''}`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{plan}</h3>
      <div className="text-4xl font-bold mb-6">{price}<span className="text-lg text-gray-500">/month</span></div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
          isPopular
            ? 'bg-purple-600 text-white hover:bg-purple-700'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Start Free Trial
      </button>
    </div>
  );
};

// Minimal Contact Form expected by page.tsx
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setSubmitted(false), 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-[#4A154B] mb-6">Get in Touch</h3>
      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-sm text-green-700">Thanks! We'll get back to you within 24 hours.</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B]" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B]" required />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company/Store Name</label>
          <input id="company" name="company" value={formData.company} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B]" />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B]" />
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-[#4A154B] text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-900 transition-colors disabled:opacity-50">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

// Simple Analytics tracker hook component
const AnalyticsTracker = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Placeholder analytics - actual GA is wired in page handlers
      // console.log('Page viewed:', window.location.pathname);
    }
  }, []);
  return null;
};

// Newsletter signup inline component
const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 400));
    setDone(true);
    setEmail('');
    setTimeout(() => setDone(false), 2000);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h4 className="font-semibold text-gray-900 mb-2">Stay updated</h4>
      <p className="text-sm text-gray-600 mb-4">Get cart recovery tips and Retloop updates</p>
      {done ? (
        <p className="text-green-600 text-sm">Thanks for subscribing!</p>
      ) : (
        <form onSubmit={onSubmit} className="flex gap-2">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#4A154B]" required />
          <button type="submit" className="bg-[#4A154B] text-white px-4 py-2 rounded text-sm hover:bg-purple-900 transition-colors">Subscribe</button>
        </form>
      )}
    </div>
  );
};

export { SignupModal, FeatureCard, TestimonialCard, PricingCard, ContactForm, AnalyticsTracker, NewsletterSignup };