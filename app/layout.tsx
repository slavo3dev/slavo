
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Snippets Page",
	description: "Share your code snippets with the world",
};

export default function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={ inter.className }>
				<div className="container mx-auto px-12"> 
					{ children }
				</div>
			</body>
		</html>
	);
}
