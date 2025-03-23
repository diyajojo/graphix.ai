import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { recommendations } = await request.json();

    const prompt = `Convert these technical recommendations into simple, numbered steps:
    ${recommendations}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that simplifies technical explanations into clear, numbered steps." },
        { role: "user", content: prompt }
      ],
    });

    const processedRecommendations = completion.choices[0].message.content || recommendations;

    return NextResponse.json({ processedRecommendations });
  } catch (error) {
    console.error('Error processing recommendations:', error);
    return NextResponse.json({ error: 'Failed to process recommendations' }, { status: 500 });
  }
}
