import PostCard from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const recentPosts = allPosts
    .sort((a, b) => compareDesc(a.publishedAt, b.publishedAt))
    .slice(0, 6);

  return (
    <main className="flex-1">
      <div className="container flex max-w-screen-lg flex-col items-center gap-4 py-12 lg:py-24">
        <h1 className="text-center text-4xl font-bold tracking-tight md:text-6xl md:leading-[1.1]">
          Let&apos;s Learn React Native
        </h1>
        <p className="max-w-screen-md text-center text-lg text-muted-foreground md:text-xl">
          Ready to Dive into React Native? Let&apos;s Start Your Journey to
          Mastery Together! Explore Free Tutorials and Hands-On Projects for an
          Engaging Learning Experience!
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/tutorials">Get Started</Link>
          </Button>
        </div>
      </div>

      <section id="recent-tutorials" className="my-12 md:my-24">
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Recent Posts
            </h2>
            <Button asChild variant="link" className="-mr-4">
              <Link href="/tutorials">
                See All
                <ArrowRightIcon className="-mr-1 ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:mt-6 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard post={post} key={post._id} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
