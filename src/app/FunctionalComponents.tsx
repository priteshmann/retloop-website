'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== FORM SUBMIT STARTED ===');
    
    if (!validateForm()) {
      console.log('Validation failed, stopping submission');
      return;
    }

    console.log('Form data before submission:', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      passwordLength: formData.password.length
    });

    setIsLoading(true);

    try {
      const requestBody = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password
      };
      
      console.log('Request body to send:', requestBody);
      
      // Create the account
      console.log('Making fetch request to /api/auth/signup...');
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        console.log('Account creation successful, attempting sign-in...');
        
        // Automatically sign in the user
        const signInResult = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        console.log('Sign-in result:', signInResult);

        if (signInResult?.error) {
          console.log('Sign-in failed:', signInResult.error);
          setErrors({ general: 'Account created but sign-in failed. Please try signing in manually.' });
        } else {
          console.log('Sign-in successful, redirecting to dashboard...');
          
          // Track successful signup
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'sign_up', {
              event_category: 'engagement',
              method: 'email'
            });
          }
          
          // Redirect to dashboard
          router.push('/dashboard');
          onClose();
        }
      } else {
        console.log('Account creation failed:', data);
        setErrors({ general: data.error || 'Failed to create account' });
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    }

    setIsLoading(false);
    console.log('=== FORM SUBMIT ENDED ===');
  };

  const handleGoogleSignup = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-200 scale-95 animate-[scale-in_0.2s_ease-out_forwards]">
        <style jsx>{`
          @keyframes scale-in {
            from {
              transform: scale(0.75);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Start your 14-day free trial</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 text-center mb-6">
            We suggest using the email address that you use at work.
          </p>

          {/* Google Signup Button */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mb-4"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {errors.general}
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B] ${
                    errors.firstName ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B] ${
                    errors.lastName ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="name@work-email.com"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B] ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Fields */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password (8+ characters)"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B] ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B] ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4A154B] text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-[#4A154B] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </div>
              ) : (
                'Start Free Trial'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center mt-4">
            By clicking "Start Free Trial", you agree to our{' '}
            <a href="/terms" className="text-[#4A154B] hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-[#4A154B] hover:underline">Privacy Policy</a>.
          </p>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already using Retloop?{' '}
              <button
                onClick={() => {
                  onClose();
                  window.location.href = '/auth/signin';
                }}
                className="text-[#4A154B] hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <h3 className="text-green-800 font-medium">Message sent!</h3>
            <p className="text-green-700 text-sm">We'll get back to you within 24 hours.</p>
          </div>
        </div>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-4 text-green-600 hover:text-green-800 text-sm font-medium"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B]"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B]"
          placeholder="your.email@company.com"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B]"
          placeholder="Your company name"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B]"
          placeholder="Tell us about your store and how we can help..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#4A154B] text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-[#4A154B] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate newsletter signup
    setTimeout(() => {
      setSubscribed(true);
      setIsSubmitting(false);
      setEmail('');
    }, 1000);
  };

  if (subscribed) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-800 text-sm font-medium">Subscribed!</span>
        </div>
        <button 
          onClick={() => setSubscribed(false)}
          className="mt-2 text-green-600 hover:text-green-800 text-xs"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h4 className="font-semibold text-gray-900 mb-2">Stay updated</h4>
      <p className="text-sm text-gray-600 mb-4">Get cart recovery tips and product updates</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4A154B]"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#4A154B] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-900 disabled:opacity-50"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}

export function AnalyticsTracker() {
  React.useEffect(() => {
    // Google Analytics tracking code
    if (typeof window !== 'undefined') {
      // Load Google Analytics
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-RN0WD74NFZ';
      document.head.appendChild(script);

      // Initialize Google Analytics
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      (window as any).gtag = gtag;
      
      gtag('js', new Date());
      gtag('config', 'G-RN0WD74NFZ');
    }
  }, []);

  return null; // This component doesn't render anything visible
}