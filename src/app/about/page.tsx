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
  return <main className="flex-1">Under development...</main>;
}
