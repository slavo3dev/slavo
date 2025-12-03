import React, { useState, useContext, useEffect } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import { CardLayout } from "@/components/Layout/CardsLayout";
import { CommentsFetcher } from "@/components/CommentsFetcher";
import { API_BASE_URL } from "@/lib/apiUrl";

interface PorchType {
  new_id: string;
  created_at: string;
  email: string;
  text: string;
  source: string;
  excellent: number;
  likes: string[];
  [key: string]: any;
}

interface PorchDailyUpdateProps {
  porch: PorchType;
  setPorchs: React.Dispatch<React.SetStateAction<PorchType[]>>;
}

export const PorchDailyUpdate: React.FC<PorchDailyUpdateProps> = ({
  porch,
  setPorchs,
}) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] =
    useState<boolean>(false);
  const [showMore, setShowMore] = useState(false);
  const toggleLoginModal = () => setShowLoginModal((prev) => !prev);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [textUpdate, setTextUpdate] = useState<string>(porch.text);

  const { userInfo } = useContext(UserInfoContext);
  const userEmail = userInfo?.email;

  useEffect(() => {
    if (userInfo?.email) {
      const userHasVoted = porch.likes.includes(userInfo.email);
      setHasVoted(userHasVoted);
    }
  }, [userEmail, porch.likes]);

  const date = new Date(porch.created_at);
  const formattedDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;

  const handleVote = async () => {
    if (!userEmail) {
      toggleLoginModal();
      return;
    }

    const previousLikes = porch.likes;

    // ✅ Optimistic update
    const optimisticLikes = hasVoted
      ? previousLikes.filter((e) => e !== userEmail)
      : [...previousLikes, userEmail];

    setPorchs((prev) =>
      prev.map((p) =>
        p.new_id === porch.new_id
          ? { ...p, likes: optimisticLikes }
          : p,
      ),
    );

    setHasVoted(!hasVoted);
    setIsUpdating(true);

    try {
      const endpoint = hasVoted
        ? `${API_BASE_URL}/porch/${porch.new_id}/unlike`
        : `${API_BASE_URL}/porch/${porch.new_id}/like`;

      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      const updated = result.data;

      // ✅ Sync UI with server truth
      setPorchs((prev) =>
        prev.map((p) => (p.new_id === porch.new_id ? updated : p)),
      );
    } catch (error) {
      console.error("Like failed:", error);

      // ❌ Rollback on error
      setPorchs((prev) =>
        prev.map((p) =>
          p.new_id === porch.new_id
            ? { ...p, likes: previousLikes }
            : p,
        ),
      );

      setHasVoted(!!previousLikes.includes(userEmail));
      alert("Like action failed. Reverted.");
    } finally {
      setIsUpdating(false);
    }
  };

  const commentText = porch.text;

  const displayComment = showMore
    ? commentText
    : commentText.slice(0, 90);
  const handleMore = () => setShowMore(true);

  const submitChange = async (porchId: string, newText: string) => {
    const previousText = porch.text;

    // ✅ Optimistic UI update
    setPorchs((prev) =>
      prev.map((p) =>
        p.new_id === porchId ? { ...p, text: newText } : p,
      ),
    );

    setIsUpdating(true);

    try {
      const res = await fetch(`${API_BASE_URL}/porch/${porchId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newText }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      // ✅ Ensure server version is final truth
      const updated = result.data;

      setPorchs((prev) =>
        prev.map((p) => (p.new_id === porchId ? updated : p)),
      );
    } catch (error) {
      console.error("Update failed:", error);

      // ❌ Rollback on error
      setPorchs((prev) =>
        prev.map((p) =>
          p.new_id === porchId ? { ...p, text: previousText } : p,
        ),
      );

      alert("Failed to update text. Changes reverted.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <CardLayout
        title="Daily Update"
        porch={porch}
        displayComment={displayComment}
        commentText={porch.text}
        showMore={showMore}
        handleMore={handleMore}
        handleVote={handleVote}
        isUpdating={isUpdating}
        formattedDate={formattedDate}
        isVoteDisabled={false}
        hasVoted={hasVoted}
        extraContent={
          <div className="pb-6">
            <CommentsFetcher
              sourceId={porch.new_id}
              getRoute="getPorchComments"
              postRoute="postPorchComments"
            />
          </div>
        }
        isLoggedIn={!!userInfo?.email}
        submitChange={submitChange}
        userEmail={userEmail}
      />
    </>
  );
};
