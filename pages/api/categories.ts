import { getAllPosts } from "@/lib/posts-lib";
import { getCategories } from "@/lib/helpers";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get all posts and extract categories
    const allPosts = getAllPosts();
    const categories = getCategories(allPosts);

    // Send categories as JSON
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to load categories" });
  }
};

export default handler;
