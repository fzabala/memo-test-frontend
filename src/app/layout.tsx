import type { Metadata } from "next";
import styles from "./globals.scss";
import { ApolloWrapper } from "../lib/apollo-wrapper";

export const metadata: Metadata = {
  title: "Memo Game",
  description: "Memo Test Game for kids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
