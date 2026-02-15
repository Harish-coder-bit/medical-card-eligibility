import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Medical Card Eligibility Checker",
  description: "Check your eligibility for a medical card based on your U.S. state.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-gray-800 bg-gray-50 leading-relaxed">
        <Navbar />
        <main className="max-w-[960px] mx-auto py-8 px-5 min-h-[calc(100vh-140px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
