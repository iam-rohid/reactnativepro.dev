import PostCard from "@/components/post-card";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export default function TutorialsPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(a.publishedAt, b.publishedAt),
  );

  return (
    <main className="flex-1">
      <div className="container my-8 md:my-12">
        <h2 className="text-3xl font-bold md:text-5xl">Tutorials</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </div>
      </div>
    </main>
  );
}
