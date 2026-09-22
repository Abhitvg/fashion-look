import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, setDoc, doc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    // Check if phone already has a code
    const q = query(collection(db, 'referrals'), where('phone', '==', phone));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Return existing code
      const existingDoc = querySnapshot.docs[0];
      return NextResponse.json({ code: existingDoc.id });
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

    // Store in Firestore with the code as the document ID
    await setDoc(doc(db, 'referrals', newCode), {
      name,
      phone,
      createdAt: serverTimestamp(),
      redemptions: 0
    });

    return NextResponse.json({ code: newCode });

  } catch (error) {
    console.error('Error generating referral code:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
