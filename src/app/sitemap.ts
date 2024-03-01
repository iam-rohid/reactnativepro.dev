import type { MetadataRoute } from "next";
import { allPosts, allAuthors, allTags } from "contentlayer/generated";
import { SITE_URL } from "@/constants";

const addPathToBaseURL = (path: string) =>
  path === "/" ? SITE_URL : `${SITE_URL}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/about",
    "/tutorials",
    ...allPosts.map((item) => item.url),
    "/tags",
    ...allTags.map((item) => item.url),
    ...allAuthors.map((item) => item.url),
  ].map((route) => ({
    url: addPathToBaseURL(route),
    lastModified: new Date(),
  }));
}
