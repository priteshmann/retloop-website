'use client'

import { ArrowRight, CheckCircle, Zap, Users, BarChart3, Play, Star, TrendingUp, ShoppingCart, Clock, Shield, X } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      // Store email in Supabase (you'll need to replace with your actual Supabase endpoint)
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          source: 'landing_page_trial',
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setEmail('')
        // Auto-close modal after 3 seconds
        setTimeout(() => {
          setShowEmailModal(false)
          setIsSuccess(false)
        }, 3000)
      } else {
        throw new Error('Failed to subscribe')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const openEmailModal = () => {
    setShowEmailModal(true)
    setEmail('')
    setError('')
    setIsSuccess(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-orange-400">
      {/* Email Capture Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div 
            className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl animate-in zoom-in-0 duration-500 ease-out"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
              animation: 'modal-scale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >            
            <button 
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <div className="animate-in slide-in-from-bottom-8 duration-700 delay-200">
                <div className="text-center mb-8">
                  {/* Animated icon */}
                  <div className="relative mx-auto mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                      <ShoppingCart className="w-10 h-10 text-white relative z-10 animate-bounce" />
                      {/* Icon sparkles only */}
                      <div className="absolute top-2 right-3 w-2 h-2 bg-white rounded-full animate-ping delay-300"></div>
                      <div className="absolute bottom-3 left-2 w-1.5 h-1.5 bg-white/80 rounded-full animate-ping delay-700"></div>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl mx-auto blur-xl opacity-30 animate-pulse"></div>
                  </div>
                  
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-3">
                    Start Your Free Trial
                  </h3>
                  <p className="text-gray-600 text-lg">Enter your email to begin your 14-day free trial of Retloop</p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                      Email Address
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@yourstore.com"
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg group-hover:border-purple-300 bg-gray-50/50 focus:bg-white"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200 animate-in slide-in-from-top-2 duration-300">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                    style={{
                      backgroundSize: '200% 200%',
                      animation: isLoading ? 'none' : 'gradient-x 3s ease infinite'
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Starting Trial...
                        </>
                      ) : (
                        <>
                          Start 14-Day Free Trial
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </span>
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:animate-[shimmer_0.8s_ease-out] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </button>

                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center animate-in slide-in-from-left duration-500 delay-300">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        No credit card required
                      </div>
                      <div className="flex items-center animate-in slide-in-from-right duration-500 delay-500">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Cancel anytime
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center animate-in zoom-in-50 duration-500">
                {/* Success state with celebration animation */}
                <div className="relative mx-auto mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto relative">
                    <CheckCircle className="w-12 h-12 text-white animate-bounce" />
                    {/* Celebration particles */}
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-1 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-300"></div>
                    <div className="absolute top-0 -left-3 w-2.5 h-2.5 bg-purple-400 rounded-full animate-ping delay-500"></div>
                    <div className="absolute -bottom-2 right-0 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-700"></div>
                  </div>
                  <div className="absolute inset-0 w-24 h-24 bg-green-400 rounded-full mx-auto blur-xl opacity-40 animate-pulse"></div>
                </div>
                
                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                  Welcome to Retloop!
                </h3>
                <p className="text-gray-600 text-lg mb-4 animate-in slide-in-from-bottom duration-500 delay-200">
                  Check your email for setup instructions and your free trial access.
                </p>
                <p className="text-sm text-gray-500 animate-pulse">
                  This window will close automatically...
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modal-scale {
          0% { 
            transform: scale(0.8);
            opacity: 0;
          }
          100% { 
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%) skewX(-12deg); }
        }
      `}</style>

      {/* Navigation */}
      <nav className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-white">Retloop</div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-white/90 hover:text-white px-3 py-2 text-sm font-medium">Features</a>
                <a href="#pricing" className="text-white/70 hover:text-white px-3 py-2 text-sm font-medium">Pricing</a>
                <a href="#demo" className="text-white/70 hover:text-white px-3 py-2 text-sm font-medium">Demo</a>
                <a href="#testimonials" className="text-white/70 hover:text-white px-3 py-2 text-sm font-medium">Reviews</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-white/90 hover:text-white text-sm font-medium">
                Sign in →
              </button>
              <button 
                onClick={openEmailModal}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-all"
              >
                Start Free Trial →
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
                <Star className="w-4 h-4 mr-2 text-yellow-300" />
                Trusted by 1,000+ Shopify stores
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
                Turn abandoned carts into
                <br />
                <span className="text-6xl lg:text-8xl bg-gradient-to-r from-blue-200 to-orange-200 bg-clip-text text-transparent">
                  customers
                </span>
                <br />
                with AI videos
              </h1>
              
              <p className="text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                AI-powered personalized videos and lifestyle images that recover abandoned carts with 3x higher conversion rates than generic emails. Set up in 5 minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={openEmailModal}
                  className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  Start 14-Day Free Trial
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-lg">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-white/80">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  5-minute setup
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Shopify certified
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 mt-12 lg:mt-0">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">FASHION STORE</div>
                        <div className="text-white/60 text-xs">Retloop Dashboard</div>
                      </div>
                    </div>
                    <div className="text-white/60 text-sm">Live Results</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-white/60 text-xs mb-1">Recovery Rate</div>
                      <div className="text-2xl font-bold text-white">+287%</div>
                      <div className="text-green-400 text-xs">vs generic emails</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-xs mb-1">Revenue Recovered</div>
                      <div className="text-2xl font-bold text-white">$48,291</div>
                      <div className="text-green-400 text-xs">this month</div>
                    </div>
                  </div>
                  
                  <div className="h-16 bg-gradient-to-r from-blue-400/20 to-orange-400/20 rounded-lg flex items-end justify-between p-2 mb-4">
                    <div className="w-2 bg-blue-400 rounded-t" style={{height: '40%'}}></div>
                    <div className="w-2 bg-blue-400 rounded-t" style={{height: '60%'}}></div>
                    <div className="w-2 bg-blue-400 rounded-t" style={{height: '35%'}}></div>
                    <div className="w-2 bg-orange-400 rounded-t" style={{height: '80%'}}></div>
                    <div className="w-2 bg-orange-400 rounded-t" style={{height: '100%'}}></div>
                    <div className="w-2 bg-orange-400 rounded-t" style={{height: '75%'}}></div>
                    <div className="w-2 bg-orange-400 rounded-t" style={{height: '90%'}}></div>
                  </div>
                  
                  <div className="text-white/60 text-xs text-center">AI videos recovering 47 carts today</div>
                </div>

                <div className="absolute -right-4 -bottom-4 bg-white/15 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-xl max-w-xs">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                      <Play className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-white text-sm font-medium">AI Video Generated</div>
                  </div>
                  <div className="text-white/80 text-xs mb-2">Hi Sarah! We noticed you loved these wireless headphones...</div>
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-orange-400 rounded"></div>
                    <div className="text-white/60 text-xs">Sent 3 min ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How Retloop recovers your lost sales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI automation creates personalized recovery experiences in minutes, not hours
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="group hover:scale-105 transition-transform">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 h-full border border-blue-100">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Detection</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Automatically detects cart abandonment and triggers personalized recovery sequence within minutes
                </p>
              </div>
            </div>

            <div className="group hover:scale-105 transition-transform">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 h-full border border-purple-100">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Personalization</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Creates custom scripts, lifestyle images, and 8-second videos with natural voice narration
                </p>
              </div>
            </div>

            <div className="group hover:scale-105 transition-transform">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 h-full border border-orange-100">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3x Higher Recovery</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Delivers via email with proven 3x better recovery rates than generic messaging
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">From abandonment to recovery in 4 steps</h3>
              <p className="text-xl text-gray-600">Fully automated. No manual work required.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">1. Cart Detected</h4>
                <p className="text-gray-600 text-sm">Customer abandons cart, trigger activates instantly</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">2. AI Generates</h4>
                <p className="text-gray-600 text-sm">Creates personalized script and lifestyle product image</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">3. Video Created</h4>
                <p className="text-gray-600 text-sm">8-second video with voice narration and action scenes</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">4. Email Sent</h4>
                <p className="text-gray-600 text-sm">Personalized recovery email delivered automatically</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Start with a 14-day free trial. No setup fees, no credit card required.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Basic</h3>
                <p className="text-white/70 mb-6">Perfect for growing Shopify stores</p>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-bold text-white">$49</span>
                  <span className="text-white/70 ml-2">/month</span>
                </div>
                <p className="text-white/60 text-sm">Up to 50 recoveries included, then $2 each</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">AI-generated lifestyle product images</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">Personalized email recovery sequences</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">Real-time cart abandonment detection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">Basic analytics dashboard</span>
                </li>
              </ul>
              
              <button 
                onClick={openEmailModal}
                className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start 14-Day Free Trial
              </button>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 to-purple-500/20 backdrop-blur-lg border-2 border-orange-400/30 rounded-2xl p-8 relative hover:border-orange-400/50 transition-all">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-orange-400 to-purple-400 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                <p className="text-white/70 mb-6">For stores that want maximum conversion</p>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-bold text-white">$299</span>
                  <span className="text-white/70 ml-2">/month</span>
                </div>
                <p className="text-white/60 text-sm">Up to 120 recoveries included, then $3 each</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">Everything in Basic</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">AI-generated 8-second personalized videos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">Natural voice narration with action scenes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">Advanced personalization engine</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">Priority support and analytics</span>
                </li>
              </ul>
              
              <button 
                onClick={openEmailModal}
                className="w-full bg-gradient-to-r from-orange-400 to-purple-400 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-500 hover:to-purple-500 transition-all"
              >
                Start 14-Day Free Trial
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="flex items-center justify-center space-x-6 text-sm text-white/60 mb-4">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>5-minute setup</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Cancel anytime</span>
              </div>
            </div>
            <p className="text-white/60">All plans include 14-day free trial with up to 10 recoveries</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Loved by Shopify store owners
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how Retloop is helping stores recover more revenue with AI-powered videos
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold text-lg">MR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Mike Rodriguez</h4>
                  <p className="text-gray-600 text-sm">Founder, TechHub Store</p>
                </div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Retloop recovered $12,000 in the first month. The AI videos are incredibly realistic and customers love the personal touch. 340% improvement over our old system.
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-semibold text-lg">SJ</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">CEO, Luxury Lifestyle</p>
                </div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Setup took 4 minutes. Within 24 hours we were recovering carts we never would have gotten back. The ROI is incredible and pays for itself quickly.
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-semibold text-lg">AL</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Alex Liu</h4>
                  <p className="text-gray-600 text-sm">Marketing Director, FitGear</p>
                </div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                The personalization is incredible. Customers email us asking how we made such personalized videos. It feels completely human but is fully automated.
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to recover more sales?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 1,000+ Shopify stores using Retloop to turn abandoned carts into revenue. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={openEmailModal}
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Start 14-Day Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg">
              Schedule Demo
            </button>
          </div>
          <p className="text-white/70 text-sm mt-4">No credit card required • 5-minute setup • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="text-2xl font-bold mb-4">Retloop</div>
              <p className="text-gray-400 mb-6 max-w-md">
                AI-powered cart recovery for Shopify stores. Turn abandoned carts into customers with personalized videos and automated email sequences.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={openEmailModal}
                  className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Start Free Trial
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#demo" className="text-gray-400 hover:text-white transition-colors">Demo</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex space-x-6 text-sm text-gray-400 mb-4 md:mb-0">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </div>
              <p className="text-sm text-gray-400">© 2024 Retloop. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}