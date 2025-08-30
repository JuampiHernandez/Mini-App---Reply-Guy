function withValidProperties(
  properties: Record<string, undefined | string | string[]>,
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    }),
  );
}

export async function GET() {
  const URL = "https://mini-app-reply-guy.vercel.app";

  return Response.json({
    accountAssociation: {
      header: "eyJmaWQiOjY3MzAsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhCRTE1NjIyNzQ1NkVGY0I1NkZEMDEwMzdGMjNiNWNBNGIxM0QzNkMxIn0",
      payload: "eyJkb21haW4iOiJtaW5pLWFwcC1yZXBseS1ndXkudmVyY2VsLmFwcCJ9",
      signature: "MHg2YjQ0ZTM3NzYxMTk1NjUwNzRjY2RlMjM0OTI2YWY2OWM0ZTRmM2I2NGFlMWQ3N2I0ZTM4NjM3MTFmMDczYWJkNmZiOTA3MmQ0Y2FiYjg0NTRjNTY1MmNkYTk2NWE3ZTFkOTkzMjVjNTAzNmQ3ZDUzNWFlM2M3ZmIyMmE1YzJjMDFi"
    },
    frame: withValidProperties({
      version: "1",
      name: "🐸 Reply Guy",
      subtitle: "AI-powered social media replies",
      description: "Generate the perfect reply with GPT-4 AI. Choose between Smart & Insightful or Engagement & Viral strategies.",
      screenshotUrls: [`${URL}/screenshot.png`],
      iconUrl: `${URL}/icon.png`,
      splashImageUrl: `${URL}/splash.png`,
      splashBackgroundColor: "#1F2937",
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: "social",
      tags: ["ai", "social-media", "replies", "gpt-4", "farcaster"],
      heroImageUrl: `${URL}/hero.png`,
      tagline: "Perfect replies, every time",
      ogTitle: "🐸 Reply Guy - AI-Powered Social Media Replies",
      ogDescription: "Generate the perfect reply with GPT-4 AI. Smart, engaging, and viral responses.",
      ogImageUrl: `${URL}/hero.png`,
    }),
  });
}
