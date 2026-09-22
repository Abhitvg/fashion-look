import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, newCustomerName, newCustomerPhone } = body;

    if (!code || !newCustomerName || !newCustomerPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const upperCode = code.toUpperCase();
    
    // Fetch referrer details
    const docRef = doc(db, 'referrals', upperCode);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 404 });
    }

    const referrer = docSnap.data();

    // Prevent self-referral (basic check by phone number)
    if (referrer.phone === newCustomerPhone) {
      return NextResponse.json({ error: 'Cannot refer yourself' }, { status: 400 });
    }

    // Increment redemption count
    await updateDoc(docRef, {
      redemptions: (referrer.redemptions || 0) + 1
    });

    // Store the redemption event for auditing
    await addDoc(collection(db, 'redemptions'), {
      referralCode: upperCode,
      referrerPhone: referrer.phone,
      newCustomerName,
      newCustomerPhone,
      createdAt: serverTimestamp()
    });

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
