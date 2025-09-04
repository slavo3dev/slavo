import ReactTypingEffect from "react-typing-effect";
import { FC } from "react";

interface TextProps
{
    text1: string, 
    text2: string
}

const TypingEffect = ReactTypingEffect as any;

export const TextEffect:FC<TextProps> = ({ text1, text2 }) => {
	return (
		<>
			<TypingEffect text={[text1, text2]} />
		</>
	);
};
