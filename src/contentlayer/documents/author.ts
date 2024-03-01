import { Author as AuthorType } from "contentlayer/generated";
import { defineDocumentType } from "contentlayer/source-files";
import { Image } from "../nested/image";

const _getAuthorSlug = (doc: AuthorType) => {
  return doc._raw.flattenedPath.replace("authors/", "");
};

export const Author = defineDocumentType(() => ({
  name: "Author",
  contentType: "data",
  filePathPattern: "authors/*.json",
  fields: {
    name: {
      type: "string",
      required: true,
    },
    bio: {
      type: "string",
    },
    country: {
      type: "string",
    },
    twitterHandle: {
      type: "string",
    },
    linkedInHandle: {
      type: "string",
    },
    website: {
      type: "string",
    },
    avatar: {
      type: "nested",
      of: Image,
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: _getAuthorSlug,
    },
    url: {
      type: "string",
      resolve: (doc) => `/authors/${_getAuthorSlug(doc)}`,
    },
  },
}));
