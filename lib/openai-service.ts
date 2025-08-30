import OpenAI from 'openai';
import { ResponseType } from "../app/components/ReplyGuyApp";

export class OpenAIService {
  private static client: OpenAI | null = null;
  
  // Best model - GPT-4: highest quality replies for best user experience
  private static readonly MODEL = "gpt-4";
  private static readonly MAX_TOKENS = 150; // Limit response length to control costs

  private static getClient(): OpenAI {
    if (!this.client) {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY environment variable is not set');
      }
      this.client = new OpenAI({
        apiKey: apiKey,
      });
    }
    return this.client;
  }

  private static getSystemPrompt(responseType: ResponseType): string {
    const prompts = {
      smart: `You are Reply Guy, an AI expert at generating thoughtful, intelligent social media replies. 
      Your goal is to create responses that make the user appear knowledgeable and insightful.
      
      Guidelines:
      - Use facts, data, and logical reasoning
      - Demonstrate expertise in the topic
      - Encourage meaningful discussion and debate
      - Keep responses concise but substantial (2-3 sentences)
      - Be respectful and professional
      - Avoid generic statements, be specific and actionable`,
      
      engagement: `You are Reply Guy, an AI expert at generating viral, engaging social media replies. 
      Your goal is to create responses that generate high interaction and engagement.
      
      Guidelines:
      - Use humor, memes, and trending references when appropriate
      - Create controversial or thought-provoking takes
      - Encourage reactions, replies, and reposts
      - Use emojis and casual language
      - Be entertaining and shareable
      - Keep responses concise (1-2 sentences)
      - Avoid being offensive or harmful`
    };

    return prompts[responseType] || prompts.smart;
  }

  static async generateReply(
    postText: string, 
    context: string, 
    responseType: ResponseType
  ): Promise<string> {
    try {
      const client = this.getClient();
      
      const systemPrompt = this.getSystemPrompt(responseType);
      const userPrompt = `Generate a ${responseType} reply to this post: "${postText}"${context ? `\n\nAdditional context: ${context}` : ''}`;

      console.log(`Using ${this.MODEL} for ${responseType} response`);

      const completion = await client.chat.completions.create({
        model: this.MODEL,
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
        max_tokens: this.MAX_TOKENS,
        temperature: 0.7,
        top_p: 0.9,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response generated from OpenAI');
      }

      // Log token usage for cost tracking
      const usage = completion.usage;
      if (usage) {
        console.log(`Tokens used: ${usage.total_tokens} (input: ${usage.prompt_tokens}, output: ${usage.completion_tokens})`);
        console.log(`Estimated cost: $${((usage.total_tokens / 1000) * 0.03).toFixed(6)}`);
      }

      return response.trim();
    } catch (error) {
      console.error('OpenAI API error:', error);
      
      // Fallback to a simple response if API fails
      const fallbackResponses = {
        smart: "This is an interesting perspective that deserves thoughtful consideration.",
        engagement: "This is the kind of content that gets people talking! 🔥"
      };
      
      return fallbackResponses[responseType] || fallbackResponses.smart;
    }
  }

  // Get model info for reference
  static getModelInfo(): { model: string; cost: string; quality: string; description: string } {
    return {
      model: "GPT-4",
      cost: "Premium ($0.03/1K tokens)",
      quality: "Best",
      description: "Highest quality replies for the best user experience"
    };
  }
}
