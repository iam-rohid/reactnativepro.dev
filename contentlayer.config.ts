import * as documentTypes from "@/contentlayer";
import { makeSource } from "contentlayer/source-files";

export default makeSource({
  contentDirPath: "content",
  documentTypes,
});
