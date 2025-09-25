// src/app/privacy/page.tsx
export default function PrivacyPolicy() {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">retloop</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: September 25, 2025</p>
          </div>
  
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-6">
              We collect information you provide directly to us, such as when you create an account, subscribe to our service, or contact us for support.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Email address and contact information</li>
              <li>Account credentials and profile information</li>
              <li>Payment and billing information (processed securely by Paddle)</li>
              <li>Store integration data from Shopify and other e-commerce platforms</li>
              <li>Usage data and analytics about how you use our service</li>
            </ul>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Provide and maintain our cart recovery service</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send you technical notices and support messages</li>
              <li>Analyze usage patterns to improve our service</li>
              <li>Generate personalized AI videos for abandoned cart recovery</li>
            </ul>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy. We may share information with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Service providers who assist in operating our platform (Paddle for payments, Supabase for data storage)</li>
              <li>E-commerce platforms you connect to our service (Shopify, WooCommerce, etc.)</li>
              <li>Legal authorities when required by law or to protect our rights</li>
            </ul>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment information is processed securely through Paddle's encrypted systems.
            </p>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Retention</h2>
            <p className="text-gray-700 mb-6">
              We retain your information for as long as necessary to provide our services. When you cancel your account, we will delete or anonymize your personal information within 30 days, except where required by law to retain it longer.
            </p>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Access and update your personal information</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Analytics</h2>
            <p className="text-gray-700 mb-6">
              We use Google Analytics to understand how our service is used. We also use essential cookies to maintain your session and preferences. You can control cookie settings through your browser.
            </p>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about this Privacy Policy, please contact us at support@retloop.com
            </p>
          </div>
  
          <div className="text-center mt-8">
            <a 
              href="/"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }