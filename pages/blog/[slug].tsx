import type { NextPage } from "next";
import { HeadBasePage, PostContent } from "@/components/index";
import { getPostData, getPostsFiles } from "lib/posts-lib";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Post: NextPage = ({ post }: any) => {
  return (
    <>
      <HeadBasePage
        title={`${post.title} | Slavo`}
        description={post.excerpt}
        ogType="article"
        ogImage={post.ogImage}
      />
      <PostContent post={post} />
    </>
  );
};

export function getStaticProps(context: {
  params: { slug: string };
}) {
  const { slug } = context.params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 60,
  };
}

export function getStaticPaths() {
  const postName = getPostsFiles();

  const slugs = postName.map((fileName) =>
    fileName.replace(/\.md$/, ""),
  );
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default Post;
