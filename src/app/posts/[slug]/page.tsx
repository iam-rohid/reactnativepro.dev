import Image from "next/image";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { Metadata } from "next";
import { BASE_METADATA, SITE_URL } from "@/constants";
import { allAuthors, allPosts, allTags } from "contentlayer/generated";
import { isPostPublished } from "@/utils";

type Props = { params: { slug: string } };

export const generateStaticParams = async () => {
  return allPosts.filter(isPostPublished).map((post) => ({ slug: post.slug }));
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = allPosts.find(
    (post) => isPostPublished(post) && post.slug === params.slug,
  );

  if (!post) {
    return {};
  }

  const authors = allAuthors.filter((author) =>
    post.authors.includes(author.slug),
  );

  return {
    ...BASE_METADATA,
    title: post.title,
    description: post.description,
    authors: authors.map((author) => ({
      name: author.name,
      url: `https://twitter.com/${author.twitterHandle}`,
    })),
    keywords: post.tags,
    openGraph: {
      ...BASE_METADATA.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      url: `${SITE_URL}${post.url}`,
      images: [post.coverImage.url],
    },
    twitter: {
      ...BASE_METADATA.twitter,
      ...(authors.length > 0 && !!authors[0].twitterHandle
        ? { creator: `@${authors[0].twitterHandle}` }
        : {}),
    },
  };
}

export default function PostPage({ params }: Props) {
  const post = allPosts.find(
    (post) => isPostPublished(post) && post.slug === params.slug,
  );

  if (!post) {
    notFound();
  }

  const tags = allTags.filter((tag) => post.tags.includes(tag.slug));
  const authors = allAuthors.filter((author) =>
    post.authors.includes(author.slug),
  );

  const Content = getMDXComponent(post.body.code);

  return (
    <main className="flex-1">
      <div className="container my-8 max-w-screen-md md:my-12">
        <header>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl md:leading-[1.1]">
            {post.title}
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            {format(post.publishedAt, "MMM dd, yyyy")}
            {" · "}
            {`${Math.ceil(post.readingTime)} min read`}
          </p>
        </header>
        <Image
          src={post.coverImage.url}
          alt={post.coverImage.alt}
          width={post.coverImage.width}
          height={post.coverImage.height}
          className="my-8 w-full rounded-xl border object-cover"
        />
        <article className="prose my-12 max-w-none dark:prose-invert md:prose-lg">
          <Content />
        </article>
        <section id="tags">
          <p className="uppercase text-muted-foreground">Tags</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Button key={tag._id} asChild variant="secondary">
                <Link href={tag.url}>{tag.name}</Link>
              </Button>
            ))}
          </div>
        </section>
        <section id="authors" className="mt-8">
          <p className="uppercase text-muted-foreground">Authors</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {authors.map((author) => (
              <Link href={author.url} className="flex gap-4" key={author._id}>
                <Avatar className="h-12 w-12 hover:opacity-80">
                  <AvatarImage
                    src={author.avatar.url}
                    width={author.avatar.width}
                    height={author.avatar.height}
                    alt={author.avatar.alt}
                  />
                  <AvatarFallback>
                    <UserIcon className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-full flex-1">
                  <p className="truncate font-medium hover:underline">
                    {author.name}
                  </p>
                  {author.bio && (
                    <p className="line-clamp-3 text-muted-foreground">
                      {author.bio}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
