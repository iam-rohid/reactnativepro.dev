import { Button } from "@/components/ui/button";
import { allPosts } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const posts = allPosts;
  return (
    <main>
      <section className="py-16 md:py-32">
        <div className="container">
          <h1 className="mx-auto max-w-5xl text-center text-4xl font-bold leading-tight md:text-5xl md:leading-tight">
            Become a Pro React Native Developer with Real-World Projects!
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-center text-lg font-medium leading-normal text-muted-foreground md:mt-8 md:text-xl md:leading-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            ullam ipsum quas nesciunt consequuntur quod eum cum harum, fugit
            itaque perferendis consectetur in.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/tutorials">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="my-16 md:my-32">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                href={post.url}
                key={post._id}
                className="overflow-hidden rounded-xl border bg-card ring-offset-background transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                <Image
                  src={post.coverImage.url}
                  width={post.coverImage.width}
                  height={post.coverImage.height}
                  alt={post.coverImage.alt}
                  className="aspect-video"
                />
                <div className="p-4">
                  <h3 className="line-clamp-2 text-xl font-bold leading-tight">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 leading-normal text-muted-foreground">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
