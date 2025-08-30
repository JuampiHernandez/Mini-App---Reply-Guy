import { ResponseType } from "../app/components/ReplyGuyApp";

// Mock AI service - will be replaced with real API calls
export class AIService {
  private static generateMockResponse(postText: string, context: string, responseType: ResponseType): string {
    const baseResponses = {
      smart: [
        "This is a thoughtful analysis that demonstrates deep understanding of the topic. The points raised here are particularly insightful because they consider multiple perspectives. I'd add that this approach aligns well with current best practices in the field.",
        "Interesting perspective! This raises several important questions about the underlying assumptions. From a technical standpoint, I think we should also consider the long-term implications and potential trade-offs involved.",
        "This is a compelling argument that highlights key considerations many overlook. The evidence presented here is quite convincing, though I wonder if we might be missing some alternative viewpoints that could enrich the discussion."
      ],
      engagement: [
        "🔥 This is absolutely WILD and I'm here for it! The audacity, the creativity, the sheer chaos energy... this is peak content right here. Who else is losing their mind over this?",
        "Okay but like... this is the kind of take that makes me question everything I thought I knew. The plot twist nobody saw coming! 🤯 What's your hot take on this?",
        "I'm sorry but this is the most controversial thing I've read today and I'm OBSESSED. The internet is going to lose it over this one. Thoughts? 👀"
      ],
      supportive: [
        "This is such a thoughtful and important perspective. Thank you for sharing this - it really resonates with me and I'm sure many others feel the same way. You're doing great work! 💪",
        "I love how you've articulated this. It takes courage to put yourself out there like this, and I really appreciate your honesty. You're not alone in feeling this way.",
        "This is beautiful and so well said. Your words have the power to help others who might be going through similar experiences. Keep shining your light! ✨"
      ],
      question: [
        "This is fascinating! I'm curious - what made you think about this in the first place? And how do you think this might evolve over time?",
        "Really interesting perspective! I wonder what the broader implications of this might be? How do you think this connects to other trends we're seeing?",
        "This raises so many questions for me! What do you think the biggest challenges will be? And how might we overcome them?"
      ]
    };

    const responses = baseResponses[responseType];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add some personalization based on context if provided
    if (context.trim()) {
      return `${randomResponse}\n\n${context}`;
    }
    
    return randomResponse;
  }

  static async generateReply(
    postText: string, 
    context: string, 
    responseType: ResponseType
  ): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Generate mock response
    return this.generateMockResponse(postText, context, responseType);
  }
}
