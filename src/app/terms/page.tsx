// src/app/terms/page.tsx
export default function TermsOfService() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-600">Last updated: September 25, 2025</p>
          </div>
  
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using Retloop ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-6">
              Retloop is a SaaS platform that provides AI-powered cart recovery videos for e-commerce stores. We help businesses recover abandoned shopping carts through personalized video messages.
            </p>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="text-gray-700 mb-6">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Basic Plan: $49/month for up to 1,000 cart recovery videos</li>
              <li>Premium Plan: $299/month for unlimited cart recovery videos</li>
              <li>Free trial: 14 days with unlimited access</li>
              <li>Billing is processed monthly in advance</li>
              <li>No refunds for partial months</li>
            </ul>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cancellation</h2>
            <p className="text-gray-700 mb-6">
              You may cancel your subscription at any time. Upon cancellation, you will continue to have access to the service until the end of your current billing period.
            </p>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Prohibited Uses</h2>
            <p className="text-gray-700 mb-6">
              You may not use our service for any illegal or unauthorized purpose nor may you, in the use of the service, violate any laws in your jurisdiction.
            </p>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              In no case shall Retloop be liable for any incidental, special, exemplary or consequential damages arising out of or in connection with your use of the service.
            </p>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
            <p className="text-gray-700 mb-6">
              Questions about the Terms of Service should be sent to us at support@retloop.com
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