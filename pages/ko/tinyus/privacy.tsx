import LegalPage from "@/components/tinyus/legalPage";
import { PRIVACY } from "@/lib/tinyusLegal";

export default function Privacy() {
  return <LegalPage locale="ko" doc={PRIVACY} page="privacy" />;
}
