import Link from "next/link";
import { useEffect } from "react";
import Layout from "@/components/layout";

// GitHub Pages serves this for every unknown path. Tiny Us invite links (/tinyus/invite/ABCD-1234/) have no page
// of their own in a static export, so they're forwarded to the invite page with the code in the query.
const INVITE = /^\/(ko\/)?tinyus\/invite\/([A-Za-z0-9-]{8,9})\/?$/;

export default function NotFound() {
  useEffect(() => {
    const m = location.pathname.match(INVITE);
    if (m) location.replace(`/${m[1] || ""}tinyus/invite/?code=${encodeURIComponent(m[2])}`);
  }, []);

  return (
    <Layout locale="en" path="/" title="Page not found · Miuu Studio" description="This page doesn't exist.">
      <section className="section py-24 text-center">
        <h1 className="font-display text-4xl font-extrabold">Page not found</h1>
        <p className="mt-3 text-ink/70">This page doesn&apos;t exist (or it moved).</p>
        <Link href="/" className="pill mt-8 bg-ink text-white hover:bg-violet">Home</Link>
      </section>
    </Layout>
  );
}
