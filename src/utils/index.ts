import { type ClassValue, clsx } from "clsx";
import { Post } from "contentlayer/generated";
import { twMerge } from "tailwind-merge";

export const isPostPublished = (post: Post) =>
  process.env.NODE_ENV === "development" || !post.draft;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
