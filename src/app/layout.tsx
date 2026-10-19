import "./globals.css";

export const metadata = {
  title: "SM Green Energy Solutions",
  description: "Solar energy solutions and completed solar projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}