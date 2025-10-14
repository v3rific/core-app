import { FaFingerprint, FaChartPie } from "react-icons/fa";
import { InfoCard } from "./InfoCard";

export function FeatureHighlights() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <InfoCard
        title="Register your producer identity"
        description="Activate manufacturer metadata on the V3rific network so partners can verify the official source."
        icon={<FaFingerprint />}
      />
      <InfoCard
        title="Monitor your dashboard"
        description="Track registration, verification state, and authorized admins from one centralized view."
        icon={<FaChartPie />}
      />
    </section>
  );
}
