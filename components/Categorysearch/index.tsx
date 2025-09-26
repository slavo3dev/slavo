import { FC, useMemo } from "react";
import classes from "./category-search.module.css";
import { useRouter } from "next/router";
import { useCategoryHook } from "@/lib/hooks/useCategoryHook";
import { slugify } from "lib/formatText/slug";

type Post = { category?: string | null };
interface Props {
  onSearch: (slug: string) => void;
  posts: Post[];
}

export const CategorySearch: FC<Props> = ({ onSearch, posts }) => {
  const router = useRouter();


  const { labels, labelToSlug } = useMemo(() => {
    const map = new Map<string, string>(); 
    for (const p of posts) {
      const raw = (p.category ?? "").toString().trim();
      if (!raw) continue;
      const slug = slugify(raw);
      if (!slug) continue;
      if (!map.has(slug)) map.set(slug, raw);
    }

    const labels = Array.from(map.values()).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );

    const labelToSlug = new Map<string, string>();
    for (const [slug, label] of map.entries()) labelToSlug.set(label, slug);

    return { labels, labelToSlug };
  }, [posts]);

  const options = useMemo(() => ["ALL", ...labels], [labels]);

  const { activeCategory, handleCategoryClick } = useCategoryHook(
    options,
    "selectedCategory"
  );

  function submitHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const label = e.target.value;
    handleCategoryClick(label);

    if (label === "ALL") {
      router.push("/blog");
      return;
    }

    const slug = labelToSlug.get(label) ?? slugify(label);
    onSearch(slug);
  }

  return (
    <form className={classes.form}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="category">Choose Category</label>
          <select
            id="category"
            className={classes.selectElement}
            value={activeCategory || "ALL"}
            onChange={submitHandler}
          >
            {options.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
};
