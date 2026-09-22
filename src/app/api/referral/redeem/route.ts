import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, newCustomerName, newCustomerPhone } = body;

    if (!code || !newCustomerName || !newCustomerPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const upperCode = code.toUpperCase();
    
    // Fetch referrer details
    const referrer = await redis.get<{ name: string; phone: string; redemptions: number }>(`ref:${upperCode}`);
    
    if (!referrer) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 404 });
    }

    // Prevent self-referral (basic check by phone number)
    if (referrer.phone === newCustomerPhone) {
      return NextResponse.json({ error: 'Cannot refer yourself' }, { status: 400 });
    }

    // Increment redemption count
    await redis.set(`ref:${upperCode}`, {
      ...referrer,
      redemptions: referrer.redemptions + 1
    });

    // We can also store the redemption event if needed for auditing
    const eventId = Date.now().toString();
    await redis.set(`redemption:${upperCode}:${eventId}`, {
      referrerPhone: referrer.phone,
      newCustomerName,
      newCustomerPhone,
      timestamp: new Date().toISOString()
    });

    // In a real app, you might trigger a WhatsApp API message to the referrer here
    // saying "Congratulations! Your code was used. You have ₹500 off your next visit."

    return NextResponse.json({
      success: true,
      referrerName: referrer.name,
      discountReferrer: 500,
      discountNew: 300
    });

  } catch (error) {
    console.error('Error redeeming referral code:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
