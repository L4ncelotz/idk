import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rupture",
  description: "Rupture is a hands-on incident response playground.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
