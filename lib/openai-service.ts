import OpenAI from 'openai';
import { ResponseType, AnswerLength } from "../app/components/ReplyGuyApp";

export class OpenAIService {
  private static client: OpenAI | null = null;
  private static readonly MODEL = "gpt-4";
  private static readonly MAX_TOKENS_SHORT = 100;
  private static readonly MAX_TOKENS_LONG = 200;

  private static getClient(): OpenAI {
    if (!this.client) {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
      }
      this.client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
    return this.client;
  }

  private static getSystemPrompt(responseType: ResponseType, answerLength: AnswerLength): string {
    const lengthInstruction = answerLength === "short" 
      ? "Keep your response concise and punchy, under 100 words." 
      : "Provide a detailed and comprehensive response, around 150-200 words.";

    const basePrompt = `You are Reply Guy, an AI assistant that generates perfect social media replies. ${lengthInstruction}

Your responses should be:
- Natural and conversational
- Engaging and authentic
- Free of emojis and excessive punctuation
- Tailored to the specific post content
- Appropriate for the chosen strategy`;

    switch (responseType) {
      case "smart":
        return `${basePrompt}

For Smart & Insightful responses:
- Add genuine value to the conversation
- Show thoughtfulness and intelligence
- Provide insights or perspectives that enhance the discussion
- Be respectful and constructive
- Avoid being overly formal or academic`;
      
      case "engagement":
        return `${basePrompt}

For Engagement & Viral responses:
- Create content that encourages interaction
- Use hooks and questions that invite replies
- Be entertaining and shareable
- Include elements that make people want to engage
- Balance humor with authenticity`;
      
      default:
        return basePrompt;
    }
  }

  static async generateReply(postText: string, context: string, responseType: ResponseType, answerLength: AnswerLength): Promise<string> {
    const client = this.getClient();
    
    const maxTokens = answerLength === "short" ? this.MAX_TOKENS_SHORT : this.MAX_TOKENS_LONG;
    const systemPrompt = this.getSystemPrompt(responseType, answerLength);
    
    const userPrompt = `Post to reply to: "${postText}"${context ? `\n\nAdditional context: ${context}` : ''}

Please generate a ${answerLength} ${responseType} reply. Remember: no emojis, be natural and engaging.`;

    try {
      const completion = await client.chat.completions.create({
        model: this.MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
        top_p: 0.9,
      });

      const reply = completion.choices[0]?.message?.content?.trim();
      
      if (!reply) {
        throw new Error('No reply generated from OpenAI');
      }

      // Log token usage and estimated cost
      const usage = completion.usage;
      if (usage) {
        const inputCost = (usage.prompt_tokens / 1000) * 0.03; // $0.03 per 1K input tokens
        const outputCost = (usage.completion_tokens / 1000) * 0.06; // $0.06 per 1K output tokens
        const totalCost = inputCost + outputCost;
        
        console.log(`Token usage: ${usage.prompt_tokens} input + ${usage.completion_tokens} output = ${usage.total_tokens} total`);
        console.log(`Estimated cost: $${totalCost.toFixed(4)}`);
      }

      return reply;
    } catch (error) {
      console.error('Error generating reply with OpenAI:', error);
      
      // Fallback responses based on type and length
      const fallbackResponses = {
        smart: {
          short: "That's an interesting point. I'd love to hear more about your perspective on this.",
          long: "This is a really thoughtful observation. I think it raises some important questions about how we approach these kinds of situations. What do you think would be the best way to move forward with this?"
        },
        engagement: {
          short: "This is fascinating! What do you think about it?",
          long: "Wow, this really got me thinking! I'm curious to hear what others think about this perspective. Has anyone else experienced something similar? What was your takeaway?"
        }
      };

      return fallbackResponses[responseType][answerLength] || "Thanks for sharing this! I'd love to hear more about your thoughts.";
    }
  }

  static getModelInfo(): string {
    return `Using ${this.MODEL} for high-quality reply generation`;
  }
}
