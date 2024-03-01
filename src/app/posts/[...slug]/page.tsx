import {
  Author,
  Tag,
  allAuthors,
  allPosts,
  allTags,
} from "contentlayer/generated";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeftIcon, UserIcon } from "lucide-react";
import { Metadata } from "next";
import { BASE_METADATA, SITE_URL } from "@/constants";

type Props = { params: { slug: string[] } };

const getPostBySlug = (slug: string[]) => {
  return allPosts.find((post) => post.slug === slug.join("/"));
};

const getAuthors = (authorsSlugs: string[]) => {
  return authorsSlugs
    .map((slug) => allAuthors.find((author) => author.slug === slug))
    .filter((author) => !!author) as Author[];
};

const getTags = (tagSlugs: string[]) => {
  return tagSlugs
    .map((slug) => allTags.find((tag) => tag.slug === slug))
    .filter((tag) => !!tag) as Tag[];
};

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({ slug: post.slug.split("/") }));
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  const authors = getAuthors(post.authors);

  return {
    ...BASE_METADATA,
    title: post.title,
    description: post.description,
    authors: authors.map((author) => ({
      name: author.name,
      url: `https://twitter.com/${author.twitterHandle}`,
    })),
    keywords: post.tags.map((tag) => tag.replaceAll("-", " ")),
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
      creator: `@${authors[0].twitterHandle}`,
    },
  };
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const Content = getMDXComponent(post.body.code);
  const authors = getAuthors(post.authors);
  const tags = getTags(post.tags);

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
          className="my-8 aspect-video w-full rounded-xl border"
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
              <div className="flex items-center gap-2" key={author._id}>
                <Avatar asChild>
                  <Link
                    href={author.url}
                    className="flex-shrink-0 transition-opacity hover:opacity-80"
                  >
                    <AvatarImage
                      src={author.avatar.url}
                      width={author.avatar.width}
                      height={author.avatar.height}
                      alt={author.avatar.alt}
                    />
                    <AvatarFallback>
                      <UserIcon className="h-6 w-6" />
                    </AvatarFallback>
                  </Link>
                </Avatar>
                <div className="max-w-full flex-1">
                  <Link
                    href={author.url}
                    className="font-medium hover:underline"
                  >
                    <p className="truncate">{author.name}</p>
                  </Link>
                  <Link
                    href={`https://twitter.com/${author.twitterHandle}`}
                    className="flex items-center text-muted-foreground hover:text-accent-foreground hover:underline"
                  >
                    <TwitterLogoIcon className="h-4 w-4 flex-shrink-0" />/
                    <p className="truncate">{author.twitterHandle}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Button asChild className="-ml-4 mt-8" variant="link">
          <Link href="/">
            <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
