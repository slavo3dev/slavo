import { FC, useState } from "react";
import { BlogTitle } from "./BlogTitle";
import { PostsGrid } from "./PostsGrid";
import { PostsList } from "Types/PostsList";
import { Loader } from "@/components/ui/Loader";
import { BlogMenuCat } from "../BlogMenuCat";
import { getCategories } from "lib/helpers";

export const BlogPosts: FC<PostsList> = ({ posts }) => {
  const [category, setCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCategory("ALL"); 
  };

const filtredPost = posts.filter((post) => {
  const categoryMatch =
    category.toLocaleLowerCase() === "all" ||
    post.category.toLocaleLowerCase() === category.toLocaleLowerCase();
  const searchMatch = 
    post.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || 
    post.category.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()); 
  return categoryMatch && searchMatch;
});


  const handleSearchFocus = () => {
    setCategory("ALL");
  };

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <BlogTitle />
        <div className="max-w-5xl mx-auto">
           <div className="max-w-md mx-auto lg:flex lg:items-center lg:justify-between lg:max-w-none mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus} 
              placeholder="Search by category..."
              className="search-input w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="max-w-md mx-auto lg:flex lg:items-center lg:justify-between lg:max-w-none">
            <BlogMenuCat
              categories={getCategories(posts)}
              onSearch={(cat?: string) => {
                setCategory(cat || "ALL");
              }}
              selectedCategory={category} 
              setActiveCategory={() => setCategory("ALL")} 
            />
          </div>
        </div>
        {posts ? (
          <PostsGrid posts={filtredPost} />
        ) : (
          <Loader title="We are Loading Posts" />
        )}
      </div>
    </section>
  );
};
