import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants";
import { allAuthors, allPosts, allTags } from "contentlayer/generated";
import { isPostPublished } from "@/utils";

const addPathToBaseURL = (path: string) => `${SITE_URL}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/about",
    "/tutorials",
    "/tags",
    ...allTags.map((item) => item.url),
    ...allPosts.filter(isPostPublished).map((item) => item.url),
    ...allAuthors.map((item) => item.url),
  ].map((route) => ({
    url: addPathToBaseURL(route),
    lastModified: new Date(),
  }));
}
