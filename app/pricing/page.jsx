export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <a href="/" className="text-2xl font-bold">MicroSaaS Creations</a>
        <div className="space-x-6">
          <a href="/" className="hover:text-blue-400">Home</a>
          <a href="tel:+14787775451" className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700">
            Call Demo
          </a>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-300">Choose the plan that fits your business</p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Starter */}
          <PricingCard
            name="Starter"
            price="97"
            calls="150"
            content="50"
            features={[
              "150 AI voice calls per month",
              "50 content generations",
              "Inbound call handling",
              "Basic analytics",
              "Email support"
            ]}
            cta="Start Free Trial"
          />

          {/* Growth */}
          <PricingCard
            name="Growth"
            price="297"
            calls="400"
            content="200"
            popular={true}
            features={[
              "400 AI voice calls per month",
              "200 content generations",
              "Inbound + Outbound calls",
              "Advanced analytics",
              "CRM integration",
              "Priority support"
            ]}
            cta="Start Free Trial"
          />

          {/* Scale */}
          <PricingCard
            name="Scale"
            price="497"
            calls="1,000"
            content="500"
            features={[
              "1,000 AI voice calls per month",
              "500 content generations",
              "Unlimited campaigns",
              "Custom AI personality",
              "White-label options",
              "Dedicated support",
              "API access"
            ]}
            cta="Start Free Trial"
          />

        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <FAQItem
            question="What counts as a 'call'?"
            answer="Each inbound or outbound phone conversation counts as one call, regardless of duration."
          />
          <FAQItem
            question="What happens if I exceed my call limit?"
            answer="You can upgrade your plan anytime or purchase additional call blocks at $0.15 per call."
          />
          <FAQItem
            question="Can I cancel anytime?"
            answer="Yes, cancel anytime. No long-term contracts or cancellation fees."
          />
          <FAQItem
            question="Do I need any special equipment?"
            answer="No equipment needed. Just forward your business number to our system or use our provided number."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-4">Try It Free For 14 Days</h2>
          <p className="text-xl mb-8">No credit card required. See the AI in action.</p>
          <a 
            href="tel:+14787775451" 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 inline-block"
          >
            Call (478) 777-5451 Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center text-gray-400">
        <p>&copy; 2025 MicroSaaS Creations. All rights reserved.</p>
      </footer>
    </div>
  )
}

function PricingCard({ name, price, calls, content, features, popular, cta }) {
  return (
    <div className={`rounded-lg p-8 ${popular ? 'bg-blue-600 scale-105 shadow-2xl' : 'bg-gray-800'}`}>
      {popular && (
        <div className="text-center mb-4">
          <span className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-bold">
            MOST POPULAR
          </span>
        </div>
      )}
      
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      
      <div className="mb-6">
        <span className="text-5xl font-bold">${price}</span>
        <span className="text-gray-300">/month</span>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-700">
        <div className="text-lg font-semibold">{calls} Calls/Month</div>
        <div className="text-gray-300">{content} Content Pieces</div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <span className="text-green-400 mr-2">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className="w-full bg-white text-gray-900 py-3 rounded-lg font-bold hover:bg-gray-100">
        {cta}
      </button>
    </div>
  )
}

function FAQItem({ question, answer }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-2">{question}</h3>
      <p className="text-gray-300">{answer}</p>
    </div>
  )
}
