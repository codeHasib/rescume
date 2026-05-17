import { ThemeProvider } from "@/context/useThemeContext";
import Nav from "@/components/Nav";
import "./globals.css";
import { Quicksand, Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const headingFont = Quicksand({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "RescuMe - Pet Adoption Platform",
  description: "Find your perfect companion",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        <ThemeProvider>
          <Nav />
          <main className="flex-grow">{children}</main>
        </ThemeProvider>
        <ToastContainer></ToastContainer>
      </body>
    </html>
  );
}
