export function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">📖 Educational Purpose</h2>
        <p className="mb-3"><strong>This app is for educational and personal study purposes ONLY.</strong></p>
        <ul className="list-disc list-inside space-y-2">
          <li>✅ Provides Quranic text for learning and study</li>
          <li>✅ Sources verified from Islamic authorities</li>
          <li>⚠️ <strong>Does NOT claim religious authority</strong></li>
          <li>⚠️ <strong>Not affiliated with any religious institution</strong></li>
          <li>📚 <strong>For religious guidance, consult qualified Islamic scholars</strong></li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">📚 Content Sources & Accuracy</h2>
        <p className="mb-3">We provide verified content from:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>King Fahd Complex</strong> for Printing the Holy Quran</li>
          <li><strong>Tanzil Project</strong> verified texts</li>
          <li><strong>Al Quran Cloud</strong> database</li>
          <li><strong>Cross-verification</strong> across multiple sources</li>
        </ul>
        <p className="mt-3"><strong>Text Processing:</strong> Text is formatted for mobile display only. The original sacred content is never altered.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">🚫 Prohibited Uses</h2>
        <p className="mb-3">This app and its content may NOT be used for:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>❌ Commercial purposes without permission</li>
          <li>❌ Creating derivative religious works</li>
          <li>❌ Any use that disrespects Islamic beliefs</li>
          <li>❌ Claiming religious authority or endorsement</li>
          <li>❌ Political or controversial purposes</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">⚠️ Disclaimers</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>This app does <strong>NOT</strong> replace consultation with Islamic scholars</li>
          <li>Content is for <strong>educational purposes only</strong></li>
          <li>We do <strong>NOT</strong> claim religious authority</li>
          <li>Users are responsible for their own religious practice</li>
          <li>App may have technical limitations or errors</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">📧 Contact</h2>
        <p className="mb-2">Questions about terms: <strong>legal@yourapp.com</strong></p>
        <p>Last updated: {new Date().toISOString().split('T')[0]}</p>
      </section>
    </div>
  );
}