import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Add to Firestore
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...data,
      createdAt: serverTimestamp(),
      status: 'new' // Initial status
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Error saving booking:', error);
    return NextResponse.json({ success: false, error: 'Failed to save booking' }, { status: 500 });
  }
}
