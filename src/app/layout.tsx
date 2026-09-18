import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Character Random Maker",
  description: "キャラクター立ち絵設定をランダム生成するツール",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
