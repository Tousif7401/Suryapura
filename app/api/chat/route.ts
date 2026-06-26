import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, locale = 'hi' } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured');
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    console.log('Processing message:', message, 'for locale:', locale);

    // System prompt - keep it SUPER short and conversational
    const systemPrompt = locale === 'en'
      ? `You are a friendly assistant for Suryapura Gram Panchayat.

RULES:
1. Keep ALL answers under 2 sentences
2. Don't list schemes unless specifically asked
3. Talk like a helpful person, not a brochure

If someone says "can you hear me" -> Just say "Yes! What can I help you with?"`
      : `आप सूर्यपुरा ग्राम पंचायत के सहायक हैं।

नियम:
1. सभी जवाब 2 वाक्यों में रखें
2. योजनाएं सिर्फ पूछे जाने पर बताएं
3. ब्रोशर की तरह न बोलें, बातचीत करें

अगर कोई पूछे "क्या आप सुन सकते हो" -> सिर्फ कहें "जी हाँ! मैं आपकी क्या मदद कर सकती हूँ?"`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                { text: `${systemPrompt}\n\nUser: ${message}` }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return NextResponse.json({
        error: 'Failed to get response from Gemini',
        details: errorText
      }, { status: 500 });
    }

    const data = await response.json();
    console.log('Gemini response:', JSON.stringify(data).substring(0, 200));

    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'क्षमा करें, कोई उत्तर नहीं मिला।';

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
