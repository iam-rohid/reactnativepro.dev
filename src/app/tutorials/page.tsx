import PostCard from "@/components/post-card";
import { BASE_METADATA, SITE_NAME, SITE_URL } from "@/constants";
import { isPostPublished } from "@/utils";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: `Tutorials - ${SITE_NAME}`,
  openGraph: {
    ...BASE_METADATA.openGraph,
    url: `${SITE_URL}/tutorials`,
  },
};

export default function TutorialsPage() {
  const posts = allPosts
    .filter(isPostPublished)
    .sort((a, b) => compareDesc(a.publishedAt, b.publishedAt));

  return (
    <main className="flex-1">
      <div className="container my-8 md:my-12">
        <h2 className="text-3xl font-bold md:text-5xl md:leading-tight">
          Tutorials
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </div>
      </div>
    </main>
  );
}
