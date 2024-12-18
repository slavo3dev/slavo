import { FC, useState, useContext, useEffect } from "react";
import supabase from "lib/supabase";
import UserInfoContext from "@/context/UserInfoContext";
import { Comments } from "@/components/Comments";
import { CardLayout } from "@/components/Layout/CardsLayout";
import LoginModal from "@/components/Auth/LoginPopup";

interface Fact {
  id: number;
  like: number;
  exelent: number;
  false: number;
  text: string;
  source: string;
  category?: string;  
}
interface FreeSourceProps {
  fact: Fact;  
  setFacts: React.Dispatch<React.SetStateAction<Fact[]>>;  
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FreeSource: FC<FreeSourceProps> = ({ fact, setFacts }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const { userInfo } = useContext(UserInfoContext);

  useEffect(() => {
    console.log("User Info Updated:", userInfo);
    if (userInfo?.email && showLoginModal) {
      console.log("Closing Modal after Login");
      setShowLoginModal(false); 
    }
  }, [userInfo]);

  const toggleLoginModal = () => setShowLoginModal((prev) => !prev);
  
  async function handleVote(columnName: keyof Fact) {
    if (userInfo?.email) {
      setIsUpdating(true);

      const { data: updatedFact, error } = await supabase
        .from("sources")
        .update({ [columnName]: (fact[columnName] as number) + 1 })
        .eq("id", fact.id)
        .select();
      setIsUpdating(false);

      if (!error && updatedFact && updatedFact.length > 0)
        setFacts((prevFacts) =>
          prevFacts.map((f) => (f.id === fact.id ? (updatedFact[0] as Fact) : f))
    );
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
          excellent: fact.exelent,
        }}
        displayComment={fact.text.slice(0, 90)}
        commentText={fact.text}
        showMore={false}
        handleVote={() => handleVote("exelent")} 
        isUpdating={isUpdating}
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
