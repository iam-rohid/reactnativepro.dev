import PostCard from "@/components/post-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BASE_METADATA, SITE_NAME, SITE_URL } from "@/constants";
import { isPostPublished } from "@/utils";
import { LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { allAuthors, allPosts } from "contentlayer/generated";
import { GlobeIcon, UserIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import pluralize from "pluralize";

type Props = { params: { slug: string } };

export const generateStaticParams = async () => {
  return allAuthors.map((item) => ({ slug: item.slug }));
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = allAuthors.find((author) => author.slug === params.slug);

  if (!author) {
    return {};
  }

  return {
    ...BASE_METADATA,
    title: `${author.name} - ${SITE_NAME}`,
    description: `Explore all content from ${author.name} on ${SITE_NAME}`,
    openGraph: {
      ...BASE_METADATA.openGraph,
      url: `${SITE_URL}${author.url}`,
    },
  };
}

export default function AuthorPage({ params }: Props) {
  const author = allAuthors.find((author) => author.slug === params.slug);

  if (!author) {
    notFound();
  }

  const posts = allPosts.filter(
    (post) => isPostPublished(post) && post.authors.includes(author.slug),
  );

  return (
    <main className="flex-1">
      <div className="container my-8 md:my-12">
        <div className="flex flex-col items-center border-b pb-8">
          <Avatar className="h-32 w-32">
            <AvatarImage
              src={author.avatar.url}
              width={author.avatar.width}
              height={author.avatar.height}
              alt={author.avatar.alt}
            />
            <AvatarFallback>
              <UserIcon className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
          <h1 className="mt-4 text-center text-2xl font-bold md:text-4xl md:leading-tight">
            {author.name}
          </h1>
          {author.bio && (
            <p className="mt-2 max-w-screen-sm text-center text-lg leading-normal text-muted-foreground md:text-xl md:leading-normal">
              {author.bio}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-center leading-6 text-muted-foreground">
            {author.country && (
              <>
                <span>{author.country}</span>
                <span>•</span>
              </>
            )}
            <span>
              {posts.length} {pluralize("post", posts.length)}
            </span>
            <span>•</span>
            {author.website && (
              <Link
                href={author.website}
                className="p-1 hover:text-accent-foreground"
                target="_blank"
              >
                <GlobeIcon className="h-5 w-5" />
                <p className="sr-only">Website</p>
              </Link>
            )}
            {author.twitterHandle && (
              <Link
                href={`https://twitter.com/${author.twitterHandle}`}
                className="p-1 hover:text-accent-foreground"
                target="_blank"
              >
                <TwitterLogoIcon className="h-5 w-5" />
                <p className="sr-only">Twitter</p>
              </Link>
            )}
            {author.linkedInHandle && (
              <Link
                href={`https://www.linkedin.com/in/${author.linkedInHandle}`}
                className="p-1 hover:text-accent-foreground"
                target="_blank"
              >
                <LinkedInLogoIcon className="h-5 w-5" />
                <p className="sr-only">LinkedIn</p>
              </Link>
            )}
          </div>
        </div>
        {posts.length === 0 ? (
          <p className="mt-8 text-muted-foreground">
            {author.name} don&apos;t have any content yet
          </p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard post={post} key={post._id} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
