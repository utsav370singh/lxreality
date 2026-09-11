import type { Metadata } from "next";
import { LegalPage } from "../legal-content";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        LX Realty (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to protecting the privacy of
        visitors and clients. This policy explains what information we collect and how we use it.
      </p>
      <h2>Information we collect</h2>
      <p>
        We collect information you provide through our contact and enquiry forms — such as your name,
        phone number, email address and message — and standard analytics data about how the site is
        used.
      </p>
      <h2>How we use it</h2>
      <p>
        We use your information solely to respond to your enquiry, provide advisory services you have
        requested, and improve our website. We do not sell your personal data.
      </p>
      <h2>Contact</h2>
      <p>For any privacy request, write to us at info@lxrealty.in.</p>
    </LegalPage>
  );
}
