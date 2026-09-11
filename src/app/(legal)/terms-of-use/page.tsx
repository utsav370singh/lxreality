import type { Metadata } from "next";
import { LegalPage } from "../legal-content";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsOfUsePage() {
  return (
    <LegalPage title="Terms of Use">
      <p>
        By accessing this website you agree to these terms. The content is provided for general
        information about LX Realty&rsquo;s services and does not constitute an offer or investment
        advice.
      </p>
      <h2>Use of content</h2>
      <p>
        All text, imagery, project information and reports are the property of LX Realty or its
        partners and may not be reproduced without permission.
      </p>
      <h2>Project information</h2>
      <p>
        Prices, availability and project details are indicative, sourced from developers, and subject
        to change. Please confirm current details with our advisory team before making any decision.
      </p>
    </LegalPage>
  );
}
