
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { Layout, Footer } from "@app/components";

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
				<Layout>
					{ children }
					<Footer />
				</Layout>
			</body>
		</html>
	);
}
