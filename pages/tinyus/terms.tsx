import LegalPage from "@/components/tinyus/legalPage";
import { TERMS } from "@/lib/tinyusLegal";

export default function Terms() {
  return <LegalPage locale="en" doc={TERMS} page="terms" />;
}
