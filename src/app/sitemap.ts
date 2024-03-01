import type { MetadataRoute } from "next";
import { allPosts, allAuthors, allTags } from "contentlayer/generated";
import { SITE_URL } from "@/constants";
import { compareDesc } from "date-fns";

const addPathToBaseURL = (path: string) => `${SITE_URL}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/about",
    "/tutorials",
    "/tags",
    ...allTags.map((item) => item.url),
    ...allPosts
      .sort((a, b) => compareDesc(a.publishedAt, b.publishedAt))
      .map((item) => item.url),
    ...allAuthors.map((item) => item.url),
  ].map((route) => ({
    url: addPathToBaseURL(route),
    lastModified: new Date(),
  }));
}
