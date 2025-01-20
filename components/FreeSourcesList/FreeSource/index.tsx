import { FC, useState, useContext, useEffect } from "react";
import supabase from "lib/supabase";
import UserInfoContext from "@/context/UserInfoContext";
import { Comments } from "@/components/Comments";
import { CardLayout } from "@/components/Layout/CardsLayout";

interface Fact {
  id: number;
  likes: string[];
  text: string;
  source: string;
  category?: string;  
}

interface FreeSourceProps {
  fact: Fact;
  setFacts: React.Dispatch<React.SetStateAction<Fact[]>>;
}

export const FreeSource: FC<FreeSourceProps> = ({ fact, setFacts }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { userInfo } = useContext(UserInfoContext);
  const [hasVoted, setHasVoted] = useState<boolean>(false);


  useEffect(() => {
    if (userInfo?.email) {
      const userHasVoted = fact.likes.includes(userInfo.email);
      setHasVoted(userHasVoted);
    }
  }, [userInfo, fact.likes]);

  const handleVote = async () => {
    if (!userInfo?.email) return; 

    setIsUpdating(true);

    try {
      let updatedLikes = [...fact.likes];

      if (hasVoted) {
        updatedLikes = updatedLikes.filter((email) => email !== userInfo.email); 
      } else {
        updatedLikes.push(userInfo.email); 
      }

      const { error } = await supabase
        .from("sources")
        .update({ likes: updatedLikes })
        .eq("id", fact.id);

      if (error) {
        console.error("Error updating likes:", error);
        alert("Failed to update likes. Please try again.");
        setIsUpdating(false);
        return;
      }

      setFacts((prevFacts) =>
        prevFacts.map((f) => (f.id === fact.id ? { ...f, likes: updatedLikes } : f))
      );

      setHasVoted(!hasVoted);
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const commentText = fact.text;
  const [showMore, setShowMore] = useState<boolean>(false);
  const displayComment = showMore ? commentText : commentText.slice(0, 90);
  const handleMore = () => setShowMore(true);

  return (
  <CardLayout
    title={fact.category || "Unknown Category"}
    porch={{
      source: fact.source,
      likes: fact.likes,
    }}
    displayComment={displayComment}
    commentText={fact.text}
    showMore={showMore}
    handleVote={handleVote}
    isUpdating={isUpdating}
    handleMore={handleMore}
    formattedDate={undefined}
    isVoteDisabled={!userInfo?.email} 
    hasVoted={hasVoted}
    isLoggedIn={!!userInfo?.email} 
    extraContent={
      <div className="py-5">
        <Comments sourceId={fact.id} />
      </div>
    }
  />
);

};
