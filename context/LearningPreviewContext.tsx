import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { createPreview, PreviewState } from "lib/learning/engine";

const LearningPreviewContext = createContext<{
  state: PreviewState;
  setState: Dispatch<SetStateAction<PreviewState>>;
} | null>(null);

export function LearningPreviewProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(createPreview);
  return (
    <LearningPreviewContext.Provider value={{ state, setState }}>
      {children}
    </LearningPreviewContext.Provider>
  );
}

export function useLearningPreview() {
  const value = useContext(LearningPreviewContext);
  if (!value) throw new Error("LearningPreviewProvider is required.");
  return value;
}