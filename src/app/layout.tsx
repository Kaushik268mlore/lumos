import "~/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Lumos",
  description: "the web gallery",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} flex flex-col gap-4` }>
        <TopNav/>
        {children}</body>
    </html>
  );
} 
function TopNav(){
  return (
    <nav className="flex w-full items-center justify-between p-4 text-xl font-semibold border-b" >
      <div className="">Gallery</div>  
      <div className="">Sign In</div>
    </nav> 
  );
}
