import type { Metadata } from "next";
import { Providers } from "./providers";
// @ts-ignore - allow side-effect import of global CSS; add a global declaration file (e.g. global.d.ts with "declare module '*.css';") to remove this ignore
import "./globals.css";

export const metadata: Metadata = {
  title: "V3rific",
  description: "Transparent Creative Supply Chain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
