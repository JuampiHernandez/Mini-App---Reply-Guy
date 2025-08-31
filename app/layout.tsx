import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import "@coinbase/onchainkit/styles.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "🐸 Reply Guy - AI-Powered Social Media Replies",
  description: "Generate the perfect reply with GPT-4 AI. Choose between Smart & Insightful or Engagement & Viral strategies.",
  openGraph: {
    title: "🐸 Reply Guy - AI-Powered Social Media Replies",
    description: "Generate the perfect reply with GPT-4 AI. Smart, engaging, and viral responses.",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Reply Guy - AI-Powered Social Media Replies",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "🐸 Reply Guy - AI-Powered Social Media Replies",
    description: "Generate the perfect reply with GPT-4 AI. Smart, engaging, and viral responses.",
    images: ["/hero.png"],
  },
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://mini-app-reply-guy.vercel.app/splash_image.png",
      button: {
        title: "Launch Reply Guy",
        action: {
          type: "launch_frame",
          name: "Reply Guy",
          url: "https://mini-app-reply-guy.vercel.app",
          splashImageUrl: "https://mini-app-reply-guy.vercel.app/splash_image.png",
          splashBackgroundColor: "#1F2937",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
