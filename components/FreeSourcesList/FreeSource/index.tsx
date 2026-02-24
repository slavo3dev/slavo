import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import supabase from "lib/supabase";
import UserInfoContext from "@/context/UserInfoContext";
import { CardLayout } from "@/components/Layout/CardsLayout";
import { CommentsFetcher } from "@/components/CommentsFetcher";

interface Fact {
  id: number;
  likes: string[];
  text: string | null; // ✅ reflect real data (Supabase can return null)
  source: string;
  category?: string;
}

interface FreeSourceProps {
  fact: Fact;
  setFacts: React.Dispatch<React.SetStateAction<Fact[]>>;
}

export const FreeSource: FC<FreeSourceProps> = ({
  fact,
  setFacts,
}) => {
  const { userInfo } = useContext(UserInfoContext);

  const [isUpdating, setIsUpdating] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // ✅ Normalize text so it never crashes on slice
  const commentText = useMemo(
    () => (fact?.text ?? "").toString().trim(),
    [fact?.text],
  );

  // ✅ Better truncation behavior
  const MAX_LEN = 90;
  const shouldTruncate = commentText.length > MAX_LEN;

  const displayComment = useMemo(() => {
    if (!commentText) return "—"; // nice fallback
    if (showMore || !shouldTruncate) return commentText;
    return `${commentText.slice(0, MAX_LEN)}…`;
  }, [commentText, showMore, shouldTruncate]);

  // ✅ Keep showMore state sane if data changes (new fact, refreshed text, etc.)
  useEffect(() => {
    setShowMore(false);
  }, [fact.id, commentText]);

  useEffect(() => {
    const email = userInfo?.email;
    if (!email) {
      setHasVoted(false);
      return;
    }
    setHasVoted(
      Array.isArray(fact.likes) ? fact.likes.includes(email) : false,
    );
  }, [userInfo?.email, fact.likes]);

  const handleMore = useCallback(() => setShowMore(true), []);

  const handleVote = useCallback(async () => {
    const email = userInfo?.email;
    if (!email || isUpdating) return;

    setIsUpdating(true);

    try {
      const currentLikes = Array.isArray(fact.likes)
        ? fact.likes
        : [];
      let updatedLikes = [...currentLikes];

      if (updatedLikes.includes(email)) {
        updatedLikes = updatedLikes.filter((e) => e !== email);
      } else {
        updatedLikes.push(email);
      }

      // ✅ Optimistic UI update (feels faster)
      setFacts((prev) =>
        prev.map((f) =>
          f.id === fact.id ? { ...f, likes: updatedLikes } : f,
        ),
      );
      setHasVoted(updatedLikes.includes(email));

      const { error } = await supabase
        .from("sources")
        .update({ likes: updatedLikes })
        .eq("id", fact.id);

      if (error) {
        // rollback on failure
        setFacts((prev) =>
          prev.map((f) =>
            f.id === fact.id ? { ...f, likes: currentLikes } : f,
          ),
        );
        setHasVoted(currentLikes.includes(email));

        console.error("Error updating likes:", error);
        alert("Failed to update likes. Please try again.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  }, [userInfo?.email, isUpdating, fact.id, fact.likes, setFacts]);

  const title = useMemo(
    () =>
      fact.category?.trim() ? fact.category : "Unknown Category",
    [fact.category],
  );

  return (
    <div className="group rounded-2xl transition-all duration-200">
      {/* ✅ style improvements while keeping your existing color system:
          - more spacing + nicer corners
          - subtle shadow on hover
          - keeps the same Tailwind colors (no new palette introduced)
      */}
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-200 group-hover:shadow-md">
        <CardLayout
          title={title}
          porch={{
            source: fact.source,
            likes: Array.isArray(fact.likes) ? fact.likes : [],
          }}
          displayComment={displayComment}
          commentText={commentText}
          showMore={showMore}
          handleVote={handleVote}
          isUpdating={isUpdating}
          handleMore={handleMore}
          formattedDate={undefined}
          isVoteDisabled={!userInfo?.email || isUpdating}
          hasVoted={hasVoted}
          isLoggedIn={!!userInfo?.email}
          extraContent={
            <div className="px-4 pb-6 pt-2 sm:px-6">
              {/* small layout polish; still same colors */}
              <div className="rounded-xl bg-gray-50/60 p-3 sm:p-4">
                <CommentsFetcher
                  sourceId={fact.id}
                  getRoute="getComments"
                  postRoute="postComments"
                />
              </div>

              {/* Optional helper text when content is empty */}
              {!commentText && (
                <p className="mt-3 text-sm text-gray-500">
                  No description provided for this resource yet.
                </p>
              )}

              {/* Optional “show more” hint when truncation applies (CardLayout might already render a button) */}
              {!showMore && shouldTruncate && (
                <p className="mt-2 text-xs text-gray-400">
                  Tip: click “More” to read the full text.
                </p>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
};
