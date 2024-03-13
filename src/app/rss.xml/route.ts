import { SITE_NAME, SITE_URL } from "@/constants";
import { isPostPublished } from "@/utils";
import {
  Author as AuthorType,
  allAuthors,
  allPosts,
} from "contentlayer/generated";
import RSS from "rss";

export const GET = async () => {
  const feed = new RSS({
    feed_url: `${SITE_URL}/rss.xml`,
    site_url: SITE_URL,
    title: SITE_NAME,
    pubDate: new Date(),
  });

  allPosts.filter(isPostPublished).map((post) => {
    const authors = allAuthors.filter((author) =>
      post.authors.includes(author.slug),
    );

    return feed.item({
      title: post.title,
      description: post.description,
      guid: `${SITE_URL}${post.url}`,
      url: `${SITE_URL}${post.url}`,
      date: post.publishedAt,
      author: authors.length > 0 ? authors[0].name : undefined,
      categories: post.tags,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
};
