import { FC, useState, useContext } from "react";
import supabase from "lib/supabase";
import UserInfoContext from "@/context/UserInfoContext";
import { Comments } from "@/components/Comments";
import { CardLayout } from "@/components/Layout/CardsLayout";
import LoginModal from "@/components/Auth/LoginPopup";

interface FreeSourceTypeProps {
  fact: {
    like: number;
    exelent: number;
    id: number;
    false: number;
    text: string;
    source: string;
    [key: string]: number | string; 
  };
  setFacts: React.Dispatch<React.SetStateAction<any[]>>;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FreeSource: FC<FreeSourceTypeProps> = ({ fact, setFacts }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const { userInfo } = useContext(UserInfoContext);
  const toggleLoginModal = () => setShowLoginModal((prev) => !prev);

  async function handleVote(columnName: string) {
    if (userInfo?.email) {
      setIsUpdating(true);

      const { data: updatedFact, error } = await supabase
        .from("sources")
        .update({ [columnName]: (fact[columnName] as number) + 1 })
        .eq("id", fact.id)
        .select();
      setIsUpdating(false);

      if (!error)
        setFacts((facts: any[]) =>
          facts.map((f: { id: any }) =>
            f.id === fact.id ? updatedFact[0] : f,
          ),
        );
    } else {
      toggleLoginModal();
    }
  }
  return (
    <>
    <CardLayout
        title={fact.category}
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