import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    // Check if phone already has a code
    const existingCode = await redis.get<string>(`ref:phone:${phone}`);
    if (existingCode) {
      return NextResponse.json({ code: existingCode });
    }

    // Generate new code: Initials + 4 random digits
    const initials = name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
    
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newCode = `${initials}${randomDigits}`;

    // Store in KV
    const payload = {
      name,
      phone,
      createdAt: new Date().toISOString(),
      redemptions: 0
    };

    // Use transaction/pipeline to ensure both keys are set
    const pipeline = redis.pipeline();
    pipeline.set(`ref:${newCode}`, payload);
    pipeline.set(`ref:phone:${phone}`, newCode);
    await pipeline.exec();

    return NextResponse.json({ code: newCode });

  } catch (error) {
    console.error('Error generating referral code:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
