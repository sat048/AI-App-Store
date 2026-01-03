'use client'

import { useState } from 'react'

export default function Home() {
  // Waitlist form state
  const [email, setEmail] = useState('')
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [waitlistMessage, setWaitlistMessage] = useState('')

  // Demo/Contact modal state
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [contactMessage, setContactMessage] = useState('')
  const [formType, setFormType] = useState<'demo' | 'contact'>('demo')

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setWaitlistStatus('loading')
    setWaitlistMessage('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setWaitlistStatus('error')
        setWaitlistMessage(data.error || 'Something went wrong')
        return
      }

      setWaitlistStatus('success')
      setWaitlistMessage('Successfully added to waitlist!')
      setEmail('')
      
      // Reset after 3 seconds
      setTimeout(() => {
        setWaitlistStatus('idle')
        setWaitlistMessage('')
      }, 3000)
    } catch (error) {
      setWaitlistStatus('error')
      setWaitlistMessage('Failed to submit. Please try again.')
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactStatus('loading')
    setContactMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: formType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setContactStatus('error')
        setContactMessage(data.error || 'Something went wrong')
        return
      }

      setContactStatus('success')
      setContactMessage(data.message)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
      })

      // Close modal after 2 seconds
      setTimeout(() => {
        setShowModal(false)
        setContactStatus('idle')
        setContactMessage('')
      }, 2000)
    } catch (error) {
      setContactStatus('error')
      setContactMessage('Failed to submit. Please try again.')
    }
  }

  const openModal = (type: 'demo' | 'contact') => {
    setFormType(type)
    setShowModal(true)
    setContactStatus('idle')
    setContactMessage('')
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-white via-accent-300 to-accent-500 bg-clip-text text-transparent">
                AI App Store
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-400 hover:text-white transition">Features</a>
              <a href="#how-it-works" className="text-gray-400 hover:text-white transition">How It Works</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a>
              <button 
                onClick={() => openModal('demo')}
                className="bg-gradient-to-r from-accent-500 via-accent-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-accent-600 hover:via-purple-600 hover:to-accent-700 transition font-semibold shadow-lg shadow-accent-500/50"
              >
                Book Demo
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary via-primary to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-900/20 via-transparent to-purple-900/20"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-accent-500/20 to-purple-500/20 rounded-full text-sm font-semibold mb-6 border border-accent-500/30 backdrop-blur-sm">
            <span className="bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">Coming Soon</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            The Future of{' '}
            <span className="bg-gradient-to-r from-accent-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AI Applications
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            Discover, explore, and integrate cutting-edge AI tools that transform how you work. 
            One marketplace. Infinite possibilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={waitlistStatus === 'loading'}
                className="px-6 py-4 rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent flex-1 shadow-lg disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={waitlistStatus === 'loading'}
                className="bg-gradient-to-r from-accent-500 via-accent-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-accent-600 hover:via-purple-600 hover:to-accent-700 transition shadow-lg shadow-accent-500/50 hover:shadow-xl hover:shadow-accent-500/70 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {waitlistStatus === 'loading' ? 'Joining...' : waitlistStatus === 'success' ? '✓ Joined!' : 'Join Waitlist'}
              </button>
            </form>
          </div>
          {waitlistMessage && (
            <p className={`text-sm mt-4 ${waitlistStatus === 'error' ? 'text-red-400' : 'text-green-400'}`}>
              {waitlistMessage}
            </p>
          )}
          {!waitlistMessage && (
            <p className="text-sm text-gray-400 mt-4">
              Be among the first to access when we launch
            </p>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-900/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why AI App Store?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to discover and leverage AI applications in one place
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Curated Collection',
                description: 'Hand-picked AI applications vetted for quality, security, and performance. No more searching through endless options.',
              },
              {
                title: 'Instant Integration',
                description: 'Seamlessly integrate AI tools into your workflow with one-click installations and API connections.',
              },
              {
                title: 'Smart Discovery',
                description: 'AI-powered recommendations help you find the perfect tools for your specific needs and use cases.',
              },
              {
                title: 'Enterprise Ready',
                description: 'Built with security and compliance in mind. Perfect for teams and organizations of all sizes.',
              },
              {
                title: 'Analytics & Insights',
                description: 'Track usage, performance, and ROI of all your AI tools from a single dashboard.',
              },
              {
                title: 'Global Marketplace',
                description: 'Connect with developers, share feedback, and contribute to the growing AI ecosystem.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 hover:border-accent-500/50 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/0 via-accent-500/0 to-purple-500/0 group-hover:from-accent-500/10 group-hover:via-accent-500/5 group-hover:to-purple-500/10 transition-all"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-500/20 to-purple-500/20 mb-4 flex items-center justify-center border border-accent-500/30">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent-400 to-purple-400"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary to-primary-900 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-accent-900/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Getting started is simple and straightforward
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Browse & Discover',
                description: 'Explore our curated collection of AI applications across categories like productivity, creativity, analytics, and more.',
              },
              {
                step: '02',
                title: 'Try & Test',
                description: 'Test drive applications with free trials and demos. See how they fit into your workflow before committing.',
              },
              {
                step: '03',
                title: 'Integrate & Scale',
                description: 'One-click integration connects AI tools to your existing systems. Scale as your needs grow.',
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold bg-gradient-to-r from-accent-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">{step.step}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 text-lg">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-500/50 rounded-tr-lg" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary-900 via-primary to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-900/30 via-purple-900/20 to-cyan-900/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your{' '}
            <span className="bg-gradient-to-r from-accent-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Workflow?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of early adopters who are already on the waitlist. 
            Get exclusive access and special launch pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => openModal('demo')}
              className="bg-gradient-to-r from-accent-500 via-accent-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-accent-600 hover:via-purple-600 hover:to-accent-700 transition shadow-lg shadow-accent-500/50 hover:shadow-xl hover:shadow-accent-500/70"
            >
              Book a Demo
            </button>
            <a 
              href="#contact"
              className="bg-transparent border-2 border-gray-700 text-white px-8 py-4 rounded-lg font-semibold hover:border-accent-500 hover:bg-accent-500/10 transition text-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={contactStatus === 'loading'}
                  className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="contact-email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={contactStatus === 'loading'}
                  className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                disabled={contactStatus === 'loading'}
                className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent disabled:opacity-50"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                disabled={contactStatus === 'loading'}
                className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent disabled:opacity-50"
              />
            </div>
            {contactMessage && (
              <div className={`p-4 rounded-lg ${contactStatus === 'error' ? 'bg-red-900/20 text-red-400 border border-red-800' : 'bg-green-900/20 text-green-400 border border-green-800'}`}>
                {contactMessage}
              </div>
            )}
            <button
              type="submit"
              disabled={contactStatus === 'loading'}
              className="w-full bg-gradient-to-r from-accent-500 via-accent-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-accent-600 hover:via-purple-600 hover:to-accent-700 transition shadow-lg shadow-accent-500/50 hover:shadow-xl hover:shadow-accent-500/70 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {contactStatus === 'loading' ? 'Sending...' : contactStatus === 'success' ? '✓ Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Demo/Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-gradient-to-br from-gray-900 to-primary border border-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-accent-300 to-purple-300 bg-clip-text text-transparent">
                  {formType === 'demo' ? 'Book a Demo' : 'Contact Us'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition text-2xl"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-400 mb-6">
                {formType === 'demo' 
                  ? 'Schedule a personalized demo to see how AI App Store can transform your workflow.'
                  : 'Send us a message and we\'ll get back to you as soon as possible.'}
              </p>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="modal-name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={contactStatus === 'loading'}
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="modal-email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={contactStatus === 'loading'}
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>
                {formType === 'demo' && (
                  <div>
                    <label htmlFor="modal-company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      id="modal-company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                      disabled={contactStatus === 'loading'}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="modal-message" className="block text-sm font-medium text-gray-300 mb-2">
                    {formType === 'demo' ? 'Additional Information' : 'Message'}
                  </label>
                  <textarea
                    id="modal-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={contactStatus === 'loading'}
                    placeholder={formType === 'demo' ? 'Tell us about your use case or any specific questions...' : 'Your message...'}
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>
                {contactMessage && (
                  <div className={`p-4 rounded-lg ${contactStatus === 'error' ? 'bg-red-900/20 text-red-400 border border-red-800' : 'bg-green-900/20 text-green-400 border border-green-800'}`}>
                    {contactMessage}
                  </div>
                )}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={contactStatus === 'loading'}
                    className="flex-1 bg-gradient-to-r from-accent-500 via-accent-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-accent-600 hover:via-purple-600 hover:to-accent-700 transition shadow-lg shadow-accent-500/50 hover:shadow-xl hover:shadow-accent-500/70 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {contactStatus === 'loading' ? 'Submitting...' : contactStatus === 'success' ? '✓ Submitted!' : formType === 'demo' ? 'Request Demo' : 'Send Message'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    disabled={contactStatus === 'loading'}
                    className="px-8 py-4 rounded-lg font-semibold border-2 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white hover:bg-gray-800/50 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-primary py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-accent-900/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-white via-accent-300 to-purple-300 bg-clip-text text-transparent mb-4">AI App Store</div>
              <p className="text-sm text-gray-400">
                The premier marketplace for AI-powered applications.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-gray-400 hover:text-accent-400 transition">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-accent-400 transition">How It Works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-accent-400 transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-accent-400 transition">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-accent-400 transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-accent-400 transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-accent-400 transition">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-accent-400 transition">LinkedIn</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-accent-400 transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2026 AI App Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

