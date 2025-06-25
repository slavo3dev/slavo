import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";
import classes from "./formatText.module.css";

const SyntaxHighlighterComponent = SyntaxHighlighter as any;

export const CodeBlock = ({ className, children }: { className?: string; children: React.ReactNode }) => {
	const [isMounted, setIsMounted] = useState(false);
	// No need to destructure code here, directly use className and children
	const language = className ? className.split("-")[1] : "javascript";

	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Use children directly instead of code.children
	return (
		isMounted ? (
			<SyntaxHighlighterComponent style={atomDark} language={language} children={children} />
		) : (
			<p>Loading...</p> // This can be a placeholder or null if you prefer not to show anything
		)
	);
};


export const customRenderers =  {
	p(paragraph: any) {
		const { node } = paragraph;
		if (node.children[0].tagName === "img" ) {
			const image = node.children[0];
			
			return (
				<div className={classes.image}>
					<Image
						src={`${image.properties.src}`}
						alt={image.alt}
						width={600}
						height={300}
					/>
				</div>
			);
		}

		return <p>{paragraph.children}</p>;
	},

	code(code: any) {
		return <CodeBlock className={code.className} children={code.children} />;	
	},
    
	a ( a: any ) {
		const urlLink: string = a.node.properties.href;
		const linkTitle: string = a.node.children[ 0 ].value;
            
		return <a
			className={classes.hoverLink}
			href={ urlLink } target="_blank">{ linkTitle }
			<span className={classes.hoverLine}></span>
		</a>;
	}
};
