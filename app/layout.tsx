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
    "fc:frame": "vNext",
    "fc:frame:image": "/hero.png",
    "fc:frame:button:1": "Generate Reply",
    "fc:frame:post_url": "/api/webhook",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="/hero.png" />
        <meta property="fc:frame:button:1" content="Generate Reply" />
        <meta property="fc:frame:post_url" content="/api/webhook" />
      </head>
      <body className="bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
