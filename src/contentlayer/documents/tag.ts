import { Tag as TagType } from "contentlayer/generated";
import { defineDocumentType } from "contentlayer/source-files";

const _getTagSlug = (doc: TagType) => {
  return doc._raw.flattenedPath.replace("tags/", "");
};

export const Tag = defineDocumentType(() => ({
  name: "Tag",
  contentType: "data",
  filePathPattern: "tags/**/*.json",
  fields: {
    name: {
      type: "string",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: _getTagSlug,
    },
    url: {
      type: "string",
      resolve: (doc) => `/authors/${_getTagSlug(doc)}`,
    },
  },
}));
