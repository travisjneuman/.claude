import { getDocs } from "@/lib/data/docs";
import { getCounts } from "@/lib/data/counts";
import Footer from "./Footer";

const DOC_SLUGS = ["SETUP-GUIDE", "WORKFLOW-GUIDE", "MAINTENANCE"];

export default function FooterWithDocs() {
  const allDocs = getDocs();
  const footerDocs = allDocs.filter((d) => DOC_SLUGS.includes(d.slug));
  const counts = getCounts();
  return <Footer docs={footerDocs} counts={counts} />;
}
