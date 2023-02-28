import ReactTypingEffect from "react-typing-effect";
import { FC } from "react";

interface TextProps
{
    text1: string, 
    text2: string
}

export const TextEffect:FC<TextProps> = ({ text1, text2 }) => {
	return (
		<>
			<ReactTypingEffect text={[text1, text2]} />
		</>
	);
};
