import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";
import classes from "./formatText.module.css";


export const customRenderers = {

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
		const { className, children } = code;
		const language = className ? className.split("-")[1] : "js"; // className is something like language-js => We need the "js" part here
		return (
			<SyntaxHighlighter
				style={atomDark}
				language={language}
				children={children}
			/>
		);
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