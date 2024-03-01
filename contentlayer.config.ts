import * as documentTypes from "./src/contentlayer";
import { makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";

export default makeSource({
  contentDirPath: "content",
  documentTypes,

  mdx: {
    rehypePlugins: [
      // @ts-ignore
      highlight,
    ],
  },
});
