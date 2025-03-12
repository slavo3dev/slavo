import React, { useState, useContext, useEffect } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import { CardLayout } from "@/components/Layout/CardsLayout";
import { PorchComments } from "@/components/porchComments";
import supabase from "@/lib/supabase";

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
  const { userInfo } = useContext(UserInfoContext);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const toggleLoginModal = () => setShowLoginModal((prev) => !prev);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [textUpdate, setTextUpdate] = useState<string>(porch.text);

  useEffect(() => {
    if (userInfo?.email) {
      const userHasVoted = porch.likes.includes(userInfo.email);
      setHasVoted(userHasVoted);
    }
  }, [userInfo, porch.likes]);

  const date = new Date(porch.created_at);
  const formattedDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;

  const handleVote = async () => {
    if (!userInfo?.email) {
      toggleLoginModal();
      return;
    }

    setIsUpdating(true);

    try {
      let updatedLikes = [...porch.likes];

      if (hasVoted) {
        updatedLikes = updatedLikes.filter(
          (email) => email !== userInfo.email,
        );
      } else {
        updatedLikes.push(userInfo.email); 
      }

      const { error } = await supabase
        .from("porch")
        .update({ likes: updatedLikes })
        .eq("new_id", porch.new_id);

      if (error) {
        console.error("Error updating likes:", error);
        alert("Failed to update likes. Please try again.");
        setIsUpdating(false);
        return;
      }

      setPorchs((porchs) =>
        porchs.map((p) =>
          p.new_id === porch.new_id
            ? { ...p, likes: updatedLikes }
            : p,
        ),
      );

      setHasVoted(!hasVoted);
      setIsUpdating(false);
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
      setIsUpdating(false);
    }
  };

  const commentText = porch.text;
  const [showMore, setShowMore] = useState<boolean>(false);

  
  const displayComment = showMore
    ? commentText
    : commentText.slice(0, 90);
  const handleMore = () => setShowMore(true);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextUpdate(e.target.value);
  };

  const submitChange = async (porchId: string, newText: string) => {
    setIsUpdating(true);
  
    try {
      const { error } = await supabase
        .from("porch")
        .update({ text: newText })
        .eq("new_id", porchId);
  
      if (error) {
        console.error("Error updating porch:", error);
        alert("Failed to update. Please try again.");
      } else {
        setPorchs((prevPorchs) =>
          prevPorchs.map((p) =>
            p.new_id === porchId ? { ...p, text: newText } : p
          )
        );
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
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
          <div className="py-5">
            <PorchComments sourceId={porch.new_id} />
          </div>
        }
        isLoggedIn={!!userInfo?.email}
        submitChange={submitChange}
      />
    </>
  );
};

