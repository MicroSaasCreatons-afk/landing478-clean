export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold">MicroSaaS Creations</div>
        <div className="space-x-6">
          <a href="#features" className="hover:text-blue-400">Features</a>
          <a href="/pricing" className="hover:text-blue-400">Pricing</a>
          <a href="tel:+14787775451" className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700">
            Call Demo: (478) 777-5451
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Your AI Sales Rep That Never Sleeps
        </h1>
        <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Contractors, Trucking Companies, and Solar Installers: Stop missing calls. 
          Start closing more deals with AI that works 24/7.
        </p>
        <div className="flex gap-4 justify-center">
          <a 
            href="tel:+14787775451" 
            className="bg-blue-600 px-8 py-4 rounded-lg text-xl hover:bg-blue-700"
          >
            Experience Live Demo
          </a>
          <a 
            href="/pricing" 
            className="bg-gray-700 px-8 py-4 rounded-lg text-xl hover:bg-gray-600"
          >
            See Pricing
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-blue-400">24/7</div>
            <div className="text-gray-300 mt-2">Never Miss A Call</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-blue-400">90%</div>
            <div className="text-gray-300 mt-2">Call Answer Rate</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-blue-400">$0</div>
            <div className="text-gray-300 mt-2">Setup Fees</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-3 gap-8">
          <FeatureCard
            icon="📞"
            title="Inbound Calls"
            description="AI answers your business line 24/7. Takes messages, books appointments, qualifies leads."
          />
          <FeatureCard
            icon="🚀"
            title="Outbound Campaigns"
            description="AI calls your prospects. Follows up on estimates. Re-engages past customers."
          />
          <FeatureCard
            icon="📊"
            title="Smart Analytics"
            description="See every call, read transcripts, track conversions. Know what's working."
          />
        </div>
      </section>

      {/* Industries */}
      <section className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Built For Your Industry</h2>
          <div className="grid grid-cols-3 gap-8">
            <IndustryCard
              title="Contractors"
              description="HVAC, Plumbing, Electrical - Never miss an emergency call. AI gets job location, schedules appointments."
            />
            <IndustryCard
              title="Trucking"
              description="AI handles shipper inquiries 24/7. Quotes rates, checks capacity, books loads."
            />
            <IndustryCard
              title="Solar"
              description="AI qualifies homeowners, books site inspections, follows up on proposals."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Never Miss Another Lead?</h2>
        <p className="text-xl text-gray-300 mb-8">
          Call our demo line right now to experience the AI in action
        </p>
        <a 
          href="tel:+14787775451" 
          className="bg-blue-600 px-12 py-6 rounded-lg text-2xl hover:bg-blue-700 inline-block"
        >
          📞 Call (478) 777-5451
        </a>
        <p className="text-gray-400 mt-4">Or view <a href="/pricing" className="text-blue-400 underline">pricing plans</a></p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center text-gray-400">
        <p>&copy; 2025 MicroSaaS Creations. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

function IndustryCard({ title, description }) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}
