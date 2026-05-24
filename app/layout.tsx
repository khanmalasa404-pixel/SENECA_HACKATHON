import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "Energy Equity Dashboard",
  description:
    "A hackathon dashboard for community energy equity and sustainability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}