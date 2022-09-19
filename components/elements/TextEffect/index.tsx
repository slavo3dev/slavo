import { FC } from "react";
import ReactTypingEffect from "react-typing-effect";


export const TextEffect: FC = ({ text1, text2 }: any) => {
  return (
    <>
      <ReactTypingEffect text={[text1, text2]} />
    </>
  );
};
