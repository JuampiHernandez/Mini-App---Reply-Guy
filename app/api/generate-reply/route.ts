import { NextRequest, NextResponse } from 'next/server';
import { OpenAIService } from '../../../lib/openai-service';
import { ResponseType } from '../../../app/components/ReplyGuyApp';

export async function POST(request: NextRequest) {
  try {
    const { postText, context, responseType } = await request.json();

    // Validate input
    if (!postText || !responseType) {
      return NextResponse.json(
        { error: 'Missing required fields: postText and responseType' },
        { status: 400 }
      );
    }

    // Validate response type
    const validTypes: ResponseType[] = ['smart', 'engagement'];
    if (!validTypes.includes(responseType)) {
      return NextResponse.json(
        { error: 'Invalid response type' },
        { status: 400 }
      );
    }

    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Generate reply using OpenAI
    const reply = await OpenAIService.generateReply(postText, context, responseType);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error generating reply:', error);
    
    return NextResponse.json(
      { error: 'Failed to generate reply' },
      { status: 500 }
    );
  }
}
