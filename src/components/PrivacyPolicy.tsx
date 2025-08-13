export function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy - Holy Quran App</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">🔒 Data Collection</h2>
        <p className="mb-3">This app respects your privacy. We collect minimal data:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Local Storage:</strong> App preferences (font size, settings) stored on your device</li>
          <li><strong>Offline Data:</strong> Downloaded Quran text for offline reading (stored locally)</li>
          <li><strong>No Personal Data:</strong> We do NOT collect names, emails, or personal information</li>
          <li><strong>No Tracking:</strong> We do NOT track your reading habits or behavior</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">🌐 Third-Party Services</h2>
        <p className="mb-3">We use verified Islamic content providers:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Al Quran Cloud API:</strong> For verified Quranic text</li>
          <li><strong>Tanzil Project:</strong> For text verification and backup</li>
        </ul>
        <p className="mt-3">These services have their own privacy policies.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">👶 Children's Privacy (COPPA Compliance)</h2>
        <p className="mb-3">This app is safe for all ages:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>✅ No personal information collected from anyone</li>
          <li>✅ No communication features between users</li>
          <li>✅ No inappropriate content</li>
          <li>✅ Educational religious content only</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">🛡️ Data Security</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>All data stored locally on your device</li>
          <li>API communications use HTTPS encryption</li>
          <li>No data transmitted to third parties</li>
          <li>No analytics or tracking scripts</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">📧 Contact</h2>
        <p className="mb-2">For privacy questions: <strong>privacy@yourapp.com</strong></p>
        <p>Last updated: {new Date().toISOString().split('T')[0]}</p>
      </section>
    </div>
  );
}