import { Post as PostType } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

export default function PostCard({ post }: { post: PostType }) {
  return (
    <Link
      href={post.url}
      className="overflow-hidden rounded-xl border bg-card ring-offset-background transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      <Image
        src={post.coverImage.url}
        width={post.coverImage.width}
        height={post.coverImage.height}
        alt={post.coverImage.alt}
        className="aspect-[2] border-b object-cover"
        priority
      />
      <div className="p-4">
        <h3 className="line-clamp-2 text-xl font-semibold">{post.title}</h3>
        <p className="mt-2 line-clamp-3 leading-normal text-muted-foreground">
          {post.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-2 text-muted-foreground">
          {post.tags.map((tag) => (
            <p key={tag}>#{tag}</p>
          ))}
        </div>
      </div>
    </Link>
  );
}
