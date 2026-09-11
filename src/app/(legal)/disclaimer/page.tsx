import type { Metadata } from "next";
import { LegalPage } from "../legal-content";

export const metadata: Metadata = { title: "Disclaimer" };

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer">
      <p>
        LX Realty acts as a real estate consultancy and advisory firm. We are not the developer or
        seller of any project featured on this website.
      </p>
      <h2>No guarantee of returns</h2>
      <p>
        Any reference to appreciation, rental yield or returns is illustrative and based on past
        market data. Real estate investments carry risk and past performance does not guarantee
        future results.
      </p>
      <h2>Third-party information</h2>
      <p>
        Project specifications, images and pricing are provided by the respective developers. LX
        Realty is not responsible for changes made by developers or for RERA compliance of listed
        projects.
      </p>
    </LegalPage>
  );
}
