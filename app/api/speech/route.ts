import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, locale = 'hi' } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 500 });
    }

    // Hindi voice IDs from ElevenLabs
    // Using warm, friendly Hindi female voice
    const hindiVoiceId = 'ozJEuqM9jdb6z7bXM0kt'; // Hindi Female - Warm, Friendly
    const englishVoiceId = '21m00Tcm4TlvDq8ikWAM'; // English voice (Rachel)
    const voiceId = locale === 'en' ? englishVoiceId : hindiVoiceId;

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('ElevenLabs API error:', error);
      return NextResponse.json({ error: 'Failed to generate speech' }, { status: 500 });
    }

    const audioBuffer = await response.arrayBuffer();

    // Return the audio as a response with appropriate headers
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error('Speech API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
