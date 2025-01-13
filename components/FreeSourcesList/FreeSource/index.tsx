import { FC, useState, useContext, useEffect } from "react";
import supabase from "lib/supabase";
import UserInfoContext from "@/context/UserInfoContext";
import { Comments } from "@/components/Comments";
import { CardLayout } from "@/components/Layout/CardsLayout";
import LoginModal from "@/components/Auth/LoginPopup";

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
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const { userInfo } = useContext(UserInfoContext);
  const [isVoteDisabled, setIsVoteDisabled] = useState(false);

  useEffect(() => {
    const checkIfVoted = async () => {
      if (userInfo?.email) {
        const voted = await hasVoted();
        setIsVoteDisabled(voted);
      }
    };

    checkIfVoted();

    if (userInfo?.email && showLoginModal) {
      setShowLoginModal(false);
    }
  }, [userInfo, showLoginModal, fact.id]);    

  const toggleLoginModal = () => setShowLoginModal((prev) => !prev);

  const hasVoted = async (): Promise<boolean> => {
    if (!userInfo?.email) return false;

    const { data, error } = await supabase
      .from("sources")
      .select("likes")
      .eq("id", fact.id)
      .single();

    if (error) {
      console.error("Error checking vote:", error);
      return false;
    }

    return data?.likes?.includes(userInfo.email) || false;
  };

  async function handleVote() {
    if (userInfo?.email) {
      const voted = await hasVoted();

      if (voted) {
        return;  
      }

      setIsUpdating(true);

      const { data: updatedFact, error } = await supabase
        .from("sources")
        .update({
          likes: [...fact.likes, userInfo.email], 
        })
        .eq("id", fact.id)
        .select();

      if (!error && updatedFact && updatedFact.length > 0) {
        setFacts((prevFacts) =>
          prevFacts.map((f) => (f.id === fact.id ? (updatedFact[0] as Fact) : f))
        );
      }

      setIsVoteDisabled(true);
      setIsUpdating(false);
    } else {
      toggleLoginModal(); 
    }
  }
  return (
    <>
      <CardLayout
        title={fact.category || "Unknown Category"}
        porch={{
          source: fact.source,
          likes: fact.likes,
        }}
        displayComment={fact.text.slice(0, 90)}
        commentText={fact.text}
        showMore={false}
        handleVote={handleVote}
        isUpdating={isUpdating}
        isVoteDisabled={isVoteDisabled} 
        extraContent={
            <div className="py-5">
              <Comments sourceId={fact.id} />
            </div>
          }
      />
      {showLoginModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg max-w-xl w-full p-6">
            <LoginModal isOpen={showLoginModal} onClose={toggleLoginModal} />
          </div>
        </>
      )}
    </>
  );
};