import { Metadata } from "next";

export const SITE_NAME = "ReactNativePro.dev";
export const SITE_URL = "https://reactnativepro.dev";
export const TWITTER_HANDLE = "rohiddev";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? "";

export const BASE_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} - Let's Learn React Native`,
  description:
    "Ready to Dive into React Native? Let's Start Your Journey to Mastery Together! Explore Free Tutorials and Hands-On Projects for an Engaging Learning Experience!",
  publisher: SITE_NAME,
  creator: SITE_NAME,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    images: ["/images/og-image.png"],
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    site: `@${TWITTER_HANDLE}`,
    card: "summary_large_image",
  },
};
