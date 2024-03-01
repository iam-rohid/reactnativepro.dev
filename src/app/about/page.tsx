import { BASE_METADATA, SITE_NAME, SITE_URL } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: `About - ${SITE_NAME}`,
  openGraph: {
    ...BASE_METADATA.openGraph,
    url: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <div className="container my-8 md:my-12">
        <h2 className="text-3xl font-bold md:text-5xl md:leading-tight">
          About
        </h2>
        <p className="mt-8 text-muted-foreground">Under development</p>
      </div>
    </main>
  );
}
