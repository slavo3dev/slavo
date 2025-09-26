import { FC, useMemo } from "react";
import { useRouter } from "next/router";
import { DropDownMenu } from "@/components/DropDown";
import { useCategoryHook } from "@/lib/hooks/useCategoryHook";
import { CatProps } from "../BlogMenuCat";
import { slugify } from "lib/formatText/slug"; 

export const BlogDropDown: FC<CatProps> = ({ categories, onSearch }) => {
  const router = useRouter();

  const options = useMemo(() => {
    const set = new Set<string>(["ALL"]);
    for (const c of categories || []) {
      const label = (c ?? "").toString().trim();
      if (label) set.add(label);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [categories]);

  const { activeCategory, handleCategoryClick } = useCategoryHook(
    options,
    "selectedCategory"
  );

  const handleItemClick = (label: string) => {
    handleCategoryClick(label);

    if (label === "ALL") {
      router.push("/blog");
      return;
    }

    const categorySlug = slugify(label); 
    onSearch(categorySlug);
  };

  return (
    <DropDownMenu
      label="Blog"
      items={options}
      onSelect={handleItemClick}
      value={activeCategory || "ALL"}
    />
  );
};
