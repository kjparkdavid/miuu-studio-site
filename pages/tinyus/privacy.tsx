import LegalPage from "@/components/tinyus/legalPage";
import { PRIVACY } from "@/lib/tinyusLegal";

export default function Privacy() {
  return <LegalPage locale="en" doc={PRIVACY} page="privacy" />;
}
