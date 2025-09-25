'use client';

import React, { useState } from 'react';

const TrialExpiredPage = ({ 
  userEmail, 
  onPlanSelect 
}: { 
  userEmail: string,
  onPlanSelect: (plan: 'basic' | 'premium') => void 
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | null>(null);

  type Plan = {
    name: string;
    price: number;
    description: string;
    features: string[];
    buttonText: string;
    popular?: boolean;
  };

  const plans: Record<'basic' | 'premium', Plan> = {
    basic: {
      name: 'Basic Plan',
      price: 49,
      description: 'Perfect for small to medium stores',
      features: [
        'Up to 1,000 cart recovery videos per month',
        'Dashboard & analytics',
        'Email support',
        'Basic customization options',
        'Integration with Shopify'
      ],
      buttonText: 'Upgrade to Basic - $49/month'
    },
    premium: {
      name: 'Premium Plan', 
      price: 299,
      description: 'For growing businesses and high-volume stores',
      features: [
        'Unlimited cart recovery videos',
        'Advanced analytics & reporting',
        'Priority support & phone calls',
        'Advanced customization & branding',
        'Integration with all platforms',
        'A/B testing capabilities',
        'Custom video templates'
      ],
      buttonText: 'Upgrade to Premium - $299/month',
      popular: true
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
              <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
              <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900">retloop</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your free trial has expired
          </h1>
          <p className="text-gray-600 text-lg">
            Thanks for trying Retloop! To continue recovering abandoned carts, choose a plan below.
          </p>
          
          {userEmail && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-700 text-sm">
                Account: <strong>{userEmail}</strong>
              </p>
            </div>
          )}
        </div>

        {/* Plan Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {Object.entries(plans).map(([planKey, plan]) => (
            <div 
              key={planKey}
              className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                selectedPlan === planKey 
                  ? 'border-purple-600 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300'
              } ${plan.popular ? 'ring-2 ring-purple-600' : ''}`}
              onClick={() => setSelectedPlan(planKey as 'basic' | 'premium')}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {selectedPlan === planKey && (
                <div className="absolute inset-0 bg-purple-100 bg-opacity-50 rounded-xl flex items-center justify-center">
                  <div className="bg-white rounded-full p-3 shadow-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          {selectedPlan ? (
            <button
              onClick={() => onPlanSelect(selectedPlan)}
              className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors transform hover:scale-105"
            >
              {plans[selectedPlan].buttonText}
            </button>
          ) : (
            <p className="text-gray-500 text-lg">Select a plan above to continue</p>
          )}
          
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Cancel anytime
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Secure payment
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              24/7 support
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-4">
            Questions? Contact our team at support@retloop.com
          </p>
          
          <div className="flex justify-center items-center space-x-4 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-600">Refund Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialExpiredPage;