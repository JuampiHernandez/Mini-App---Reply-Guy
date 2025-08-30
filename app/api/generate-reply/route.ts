import { NextRequest, NextResponse } from 'next/server';
import { OpenAIService } from '../../../lib/openai-service';
import { ResponseType, AnswerLength } from '../../../app/components/ReplyGuyApp';

export async function POST(request: NextRequest) {
  try {
    const { postText, context, responseType, answerLength } = await request.json();

    // Validate required fields
    if (!postText || !responseType) {
      return NextResponse.json(
        { error: 'Post text and response type are required' },
        { status: 400 }
      );
    }

    // Validate response type
    const validTypes: ResponseType[] = ['smart', 'engagement'];
    if (!validTypes.includes(responseType)) {
      return NextResponse.json(
        { error: 'Invalid response type. Must be "smart" or "engagement"' },
        { status: 400 }
      );
    }

    // Validate answer length
    const validLengths: AnswerLength[] = ['short', 'long'];
    if (!answerLength || !validLengths.includes(answerLength)) {
      return NextResponse.json(
        { error: 'Invalid answer length. Must be "short" or "long"' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Generate reply using OpenAI
    const reply = await OpenAIService.generateReply(postText, context, responseType, answerLength);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in generate-reply API:', error);
    return NextResponse.json(
      { error: 'Failed to generate reply' },
      { status: 500 }
    );
  }
}
