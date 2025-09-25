// src/app/refunds/page.tsx
import Link from 'next/link';

export default function RefundPolicy() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Refund Policy</h1>
            <p className="text-gray-600">Last updated: September 25, 2025</p>
          </div>
  
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Free Trial Period</h2>
            <p className="text-gray-700 mb-6">
              We offer a 14-day free trial with unlimited access to all Retloop features. No credit card is required during the trial period. You can cancel at any time during the trial without any charges.
            </p>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Monthly Subscription Refunds</h2>
            <p className="text-gray-700 mb-6">
              Due to the digital nature of our service and the immediate access to our AI cart recovery platform, all subscription payments are non-refundable. However, we provide the following options:
            </p>
            
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>Cancellation:</strong> You may cancel your subscription at any time and continue using the service until the end of your current billing period</li>
              <li><strong>Downgrade:</strong> You can downgrade from Premium to Basic plan, effective at your next billing cycle</li>
              <li><strong>Pause Service:</strong> Contact support to discuss temporary service suspension for extenuating circumstances</li>
            </ul>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Exceptional Circumstances</h2>
            <p className="text-gray-700 mb-6">
              We may consider refunds in exceptional circumstances, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Technical issues that prevent you from accessing the service for more than 48 hours</li>
              <li>Billing errors or duplicate charges</li>
              <li>Service not performing as described (subject to technical review)</li>
            </ul>
            <p className="text-gray-700 mb-6">
              Such requests must be submitted within 7 days of the billing date and will be reviewed on a case-by-case basis.
            </p>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Cancel</h2>
            <p className="text-gray-700 mb-6">
              You can cancel your subscription at any time by:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Logging into your account dashboard and clicking &quot;Cancel Subscription&quot;</li>
              <li>Emailing our support team at support@retloop.com</li>
              <li>Using the cancellation link in your billing receipt</li>
            </ul>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Billing Disputes</h2>
            <p className="text-gray-700 mb-6">
              All payments are processed securely through Paddle. If you have questions about a charge or need to dispute a payment, please contact support@retloop.com with your order details.
            </p>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Account Termination</h2>
            <p className="text-gray-700 mb-6">
              If we terminate your account due to violation of our Terms of Service, no refund will be provided for the remaining subscription period.
            </p>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              For any questions regarding refunds or cancellations, please contact us at support@retloop.com. We typically respond within 24 hours during business days.
            </p>
  
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-800">
                Our support team is here to help you get the most out of Retloop. Before requesting a refund, consider reaching out to support@retloop.com - we may be able to resolve any issues you're experiencing.
              </p>
            </div>
          </div>
  
          <div className="text-center mt-8">
            <Link 
              href="/"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }