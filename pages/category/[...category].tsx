import { BlogPosts, CategorySearch } from "@components";
import { useRouter } from "next/router";
import { getAllPosts } from "lib/posts-lib";
import { slugify, deslugify } from "lib/formatText/slug";

export async function getStaticProps() {
  const blogArticles = getAllPosts();
  return {
    props: { posts: blogArticles },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const categories = Array.from(
    new Set(
      posts
        .map((p: any) => (p.category ?? "").toString().trim())
        .filter(Boolean)
    )
  );
  const paths = categories.map((cat) => ({
    params: { category: [slugify(cat)] },
  }));

  return {
    paths,   
    fallback: "blocking",
  };
}

export default function Category(props: any) {
  const router = useRouter();

  const slugId = Array.isArray(router.query.category)
    ? router.query.category[0] ?? ""
    : (router.query.category as string) ?? "";

  const categoryPosts = (props.posts || []).filter(
    (blog: any) => slugify((blog.category ?? "").toString()) === slugId
  );

  function findCategoryHandle(category: string) {
    const fullPath = `/category/${slugify(category)}`;
    router.push(fullPath);
  }

  const title = (slugId ? deslugify(slugId) : "Title Not Found")
    .toUpperCase();

  return (
    <>
      <CategorySearch onSearch={findCategoryHandle} posts={props.posts} />
      <h1 style={{ textAlign: "center", padding: "10px" }}>{title}</h1>
      <BlogPosts posts={categoryPosts} />
    </>
  );
}
