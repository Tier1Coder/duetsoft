import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Template App",
  description: "Reusable Next.js full-stack template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto">Template App</div>
        </header>
        <main className="flex-1 container mx-auto p-4">{children}</main>
        <footer className="bg-gray-100 p-4 text-center">
          <p className="text-sm text-gray-600">&copy; 2025 Template</p>
        </footer>
      </body>
    </html>
  );
}
