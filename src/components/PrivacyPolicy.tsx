import { ArrowLeft, Mail, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PrivacyPolicy() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleBack}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-neutral-800">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-400 text-sm mb-8">Effective Date: November 1, 2024</p>

        <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
        <p className="text-gray-300 mb-4">
          DEBUTIQUES is a brand operated by Mabok Ltd, Company Number: 13081295, located at 71-75 Shelton Street, London, Greater London, United Kingdom, WC2H 9JQ ("we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website at debutiques.com, including any other media form, media channel, or mobile website related or connected thereto (collectively, the "Site").
        </p>
        <p className="text-gray-300 mb-8">
          By using the Site, you consent to the data practices described in this policy.
        </p>

        <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
        <p className="text-gray-300 mb-4">We may collect the following types of personal information:</p>
        <ul className="list-disc pl-6 text-gray-300 mb-8">
          <li><strong>Personal Identifiers:</strong> Name, email address, telephone number, company name, and job title.</li>
          <li><strong>Usage Data:</strong> IP address, browser type, referring URLs, pages visited, duration of visits.</li>
          <li><strong>Technical Data:</strong> Device type, operating system, geographic location (city-level).</li>
          <li><strong>Marketing Data:</strong> Preferences for receiving marketing communications and newsletters.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
        <p className="text-gray-300 mb-4">We use your personal data for the following purposes:</p>
        <ul className="list-disc pl-6 text-gray-300 mb-8">
          <li>To respond to your inquiries and deliver services requested.</li>
          <li>To improve and optimize our website and services.</li>
          <li>To send newsletters, marketing communications, and other information that may interest you (with your explicit consent).</li>
          <li>To comply with applicable laws, regulations, and legal processes.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mb-4">4. Legal Basis for Processing (GDPR)</h2>
        <p className="text-gray-300 mb-4">Under the General Data Protection Regulation (GDPR), our legal basis for collecting and processing your personal data includes:</p>
        <ul className="list-disc pl-6 text-gray-300 mb-8">
          <li>Your consent (where explicitly given).</li>
          <li>Necessity to fulfill contractual obligations or take pre-contractual steps.</li>
          <li>Compliance with legal obligations.</li>
          <li>Our legitimate business interests, such as site optimization and analytics.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mb-4">5. Your Rights (GDPR and CCPA)</h2>
        <p className="text-gray-300 mb-4">You have certain rights regarding your personal data, including:</p>
        <ul className="list-disc pl-6 text-gray-300 mb-4">
          <li><strong>Access:</strong> You can request copies of your personal data.</li>
          <li><strong>Rectification:</strong> You can request corrections to inaccurate or incomplete data.</li>
          <li><strong>Deletion:</strong> You can request the deletion of your personal data, subject to legal restrictions.</li>
          <li><strong>Objection:</strong> You may object to our processing of your personal data.</li>
          <li><strong>Data Portability:</strong> You may request transfer of your data to another controller.</li>
          <li><strong>Withdraw Consent:</strong> You can withdraw your consent at any time, where consent was the basis of processing.</li>
        </ul>
        <p className="text-gray-300 mb-4">Under the California Consumer Privacy Act (CCPA), California residents have the additional right to:</p>
        <ul className="list-disc pl-6 text-gray-300 mb-4">
          <li>Request disclosure of the categories and specific pieces of personal data collected.</li>
          <li>Request disclosure of the purpose for collecting and using your personal data.</li>
          <li>Opt-out of the sale of personal data (we do not sell personal data).</li>
        </ul>
        <p className="text-gray-300 mb-8">To exercise these rights, please contact us at info@debutiques.com.</p>

        <h2 className="text-xl font-semibold text-white mb-4">6. Data Sharing and Disclosure</h2>
        <p className="text-gray-300 mb-4">We may share your personal data:</p>
        <ul className="list-disc pl-6 text-gray-300 mb-4">
          <li>With service providers and vendors who assist in operating our website and services, bound by strict data processing agreements compliant with GDPR and CCPA.</li>
          <li>With law enforcement or regulatory agencies if required by law.</li>
        </ul>
        <p className="text-gray-300 mb-8">We never sell or rent your personal data to third parties.</p>

        <h2 className="text-xl font-semibold text-white mb-4">7. International Data Transfers</h2>
        <p className="text-gray-300 mb-8">
          Your personal data may be transferred to countries outside the European Economic Area (EEA) or your local jurisdiction. Such transfers comply with applicable data protection laws, including the use of standard contractual clauses approved by the European Commission.
        </p>

        <h2 className="text-xl font-semibold text-white mb-4">8. Data Retention</h2>
        <p className="text-gray-300 mb-8">
          We retain your personal data for only as long as necessary to fulfill the purposes for which it was collected or to comply with legal, regulatory, or internal policy requirements.
        </p>

        <h2 className="text-xl font-semibold text-white mb-4">9. Security Measures</h2>
        <p className="text-gray-300 mb-8">
          We employ appropriate technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction.
        </p>

        <h2 className="text-xl font-semibold text-white mb-4">10. Cookies and Similar Technologies</h2>
        <p className="text-gray-300 mb-8">
          We use cookies and similar technologies to enhance your experience, analyze traffic, and personalize content. You can manage your cookie preferences through your browser settings.
        </p>

        <h2 className="text-xl font-semibold text-white mb-4">11. Changes to This Policy</h2>
        <p className="text-gray-300 mb-8">
          We may update this Privacy Policy periodically. Any changes will be posted on this page with a revised effective date. We encourage you to periodically review this policy to stay informed about how we handle your data.
        </p>

        <h2 className="text-xl font-semibold text-white mb-4">12. Contact Information</h2>
        <p className="text-gray-300 mb-4">
          If you have questions or concerns about this Privacy Policy or our data handling practices, please contact us:
        </p>
        <div className="space-y-2 text-gray-300 mb-8">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-gray-400" />
            <span>Email: </span>
            <a href="mailto:info@debutiques.com" className="text-white hover:text-gray-300 transition-colors underline">
              info@debutiques.com
            </a>
          </div>
          <div className="flex items-start gap-2">
            <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
            <span>Postal Address: Mabok Ltd, 71-75 Shelton Street, London, Greater London, United Kingdom, WC2H 9JQ; Debutiques, Güntherstraße 13, 60528 Frankfurt am Main, Germany</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mb-4">13. Complaints</h2>
        <p className="text-gray-300 mb-8">
          You have the right to lodge a complaint with a supervisory authority if you believe your data has been processed unlawfully. If you reside in the EEA, you may contact your local data protection authority.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;