import { allPosts } from "contentlayer/generated";
import Link from "next/link";

export default function HomePage() {
  const posts = allPosts;
  return (
    <div>
      {posts.map((post) => (
        <Link key={post._id} href={post.url} className="hover:underline">
          {post.title}
        </Link>
      ))}
    </div>
  );
}
