import { Button } from "@/components/ui/button";
import { BASE_METADATA, SITE_NAME, SITE_URL } from "@/constants";
import { isPostPublished } from "@/utils";
import { allPosts, allTags } from "contentlayer/generated";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: `Tags - ${SITE_NAME}`,
  openGraph: {
    ...BASE_METADATA.openGraph,
    url: `${SITE_URL}/tags`,
  },
};

export default function TagsPage() {
  const tags = allTags
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((tag) => ({
      ...tag,
      postsCount: allPosts.filter(
        (post) => isPostPublished(post) && post.tags.includes(tag.slug),
      ).length,
    }));

  return (
    <main className="flex-1">
      <div className="container my-8 md:my-12">
        <h2 className="text-3xl font-bold md:text-5xl md:leading-tight">
          Tags
        </h2>
        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Button
              key={tag._id}
              asChild
              variant="secondary"
              style={{
                backgroundColor: tag.bgColor,
                color: tag.fgColor,
              }}
              className="hover:opacity-90"
            >
              <Link href={tag.url}>
                {tag.name} - {tag.postsCount}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </main>
  );
}
