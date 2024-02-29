import {
  Author,
  Tag,
  allAuthors,
  allPosts,
  allTags,
} from "contentlayer/generated";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export default function PostPage(props: Props) {
  const post = allPosts.find((post) => post.slug === props.params.slug);

  if (!post) {
    notFound();
  }

  const authors = post.authors
    .map((slug) => allAuthors.find((author) => author.slug === slug))
    .filter((author) => !!author) as Author[];
  const tags = post.tags
    .map((slug) => allTags.find((tag) => tag.slug === slug))
    .filter((tag) => !!tag) as Tag[];

  return (
    <div>
      <pre>{JSON.stringify({ post, authors, tags }, null, 2)}</pre>
    </div>
  );
}
