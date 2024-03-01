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
import { ChevronLeftIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import { SITE_NAME, SITE_URL } from "@/constants";

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

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  const authors = getAuthors(post.authors);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.description,
    authors: authors.map((author) => ({
      name: author.name,
      url: `https://twitter.com/${author.twitterHandle}`,
    })),
    publisher: SITE_NAME,
    creator: SITE_NAME,
    keywords: post.tags.map((tag) => tag.replaceAll("-", " ")),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      url: `${SITE_URL}${post.url}`,
      siteName: SITE_NAME,
      images: [post.coverImage.url, ...previousImages],
    },
    twitter: {
      site: "@ReactNativePro",
      creator: `@${authors[0].twitterHandle}`,
      card: "summary_large_image",
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
    <main>
      <div className="container my-16 max-w-screen-md">
        <header className="my-8">
          <h1 className="text-3xl font-bold md:text-5xl">{post.title}</h1>
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
          className="aspect-video w-full rounded-xl border"
        />
        <article className="prose dark:prose-invert md:prose-lg my-12 max-w-none">
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
                <div className="flex-1 overflow-hidden">
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
                    <TwitterLogoIcon className="h-4 w-4 flex-shrink-0" />
                    <p className="truncate">/{author.twitterHandle}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Button asChild className="mt-8" variant="secondary">
          <Link href="/">
            <ChevronLeftIcon className="-ml-1 mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
