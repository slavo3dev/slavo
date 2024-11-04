
import { FC, useState, useContext } from "react";
import supabase from "lib/supabase";
import UserInfoContext from "@/context/UserInfoContext";
import { Comments } from "@/components/Comments";


interface FreeSourceTypeProps {
  fact: {
    like: number;
    exelent: number;
    id: number;
    false: number;
    text: string;
    source: string;
    category: string;
  };
  setFacts: () => void;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FreeSource: FC<FreeSourceTypeProps> = ({
  fact,
  setFacts,
}: any) => {
  console.log("Fact object:", fact);
  const [isUpdating, setIsUpdating] = useState(false);
  const badSource = fact.like + fact.exelent < fact.false;

  const { userInfo } = useContext(UserInfoContext);

  async function handleVote(columnName: string) {
    if (userInfo?.email) {
      setIsUpdating(true);
      const { data: updatedFact, error } = await supabase
        .from("sources")
        .update({ [columnName]: fact[columnName] + 1 })
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
      alert("Please Login or Verify email address");
    }
  }
