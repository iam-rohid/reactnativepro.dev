import type { Post as PostType } from "contentlayer/generated";
import { defineDocumentType } from "contentlayer/source-files";
import { Image } from "../nested/image";

const _getPostSlug = (doc: PostType) => {
  return doc._raw.flattenedPath.replace("posts/", "");
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    draft: {
      type: "boolean",
      required: true,
    },
    publishedAt: {
      type: "date",
      required: true,
    },
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    coverImage: {
      type: "nested",
      of: Image,
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    authors: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: _getPostSlug,
    },
    url: {
      type: "string",
      resolve: (doc) => `/posts/${_getPostSlug(doc)}`,
    },
  },
}));
