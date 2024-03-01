import PostCard from "@/components/post-card";
import { BASE_METADATA, SITE_NAME, SITE_URL } from "@/constants";
import { allPosts, allTags } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import pluralize from "pluralize";

type Props = { params: { slug: string } };

const getTagBySlug = (slug: string) => {
  return allTags.find((tag) => tag.slug === slug);
};

export const generateStaticParams = async () => {
  return allTags.map((tag) => ({ slug: tag.slug }));
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = getTagBySlug(params.slug);

  if (!tag) {
    return {};
  }

  return {
    ...BASE_METADATA,
    title: `${tag.name} - ${SITE_NAME}`,
    description: tag.description ?? `Explore all content from ${tag.name} tag.`,
    openGraph: {
      ...BASE_METADATA.openGraph,
      url: `${SITE_URL}${tag.url}`,
    },
  };
}

export default function TagPage({ params }: Props) {
  const tag = getTagBySlug(params.slug);
  if (!tag) {
    notFound();
  }

  const posts = allPosts
    .filter((post) => post.tags.includes(params.slug))
    .sort((a, b) => compareDesc(a.publishedAt, b.publishedAt));

  return (
    <main className="flex-1">
      <div className="container my-8 md:my-12">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold md:text-5xl md:leading-tight">
            {tag.name}
          </h2>
          <p className="text-lg text-muted-foreground">
            {posts.length} {pluralize("post", posts.length)}
          </p>
        </div>
        {posts.length === 0 ? (
          <p className="mt-8 text-muted-foreground">
            No content found for #{tag.slug}
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
