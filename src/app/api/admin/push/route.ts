import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { getFirestore } from 'firebase-admin/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, body: msgBody, image, clickAction } = body;

    // Check if the service account is configured
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      console.warn("FCM Broadcast skipped: FIREBASE_SERVICE_ACCOUNT_KEY is not set.");
      return NextResponse.json(
        { error: 'Service account not configured. Set FIREBASE_SERVICE_ACCOUNT_KEY in environment variables.' },
        { status: 500 }
      );
    }

    // Initialize Firebase Admin if not already initialized
    if (!getApps().length) {
      try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        initializeApp({
          credential: cert(serviceAccount),
        });
      } catch (e) {
        console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY", e);
        return NextResponse.json({ error: 'Invalid service account key format.' }, { status: 500 });
      }
    }

    const db = getFirestore();
    const messaging = getMessaging();

    // Fetch all tokens
    const tokensSnapshot = await db.collection('fcm_tokens').get();
    
    if (tokensSnapshot.empty) {
      return NextResponse.json({ success: true, successCount: 0, errorCount: 0 });
    }

    const tokens: string[] = [];
    tokensSnapshot.forEach(doc => {
      tokens.push(doc.id);
    });

    const message = {
      notification: {
        title,
        body: msgBody,
        ...(image && { image }),
      },
      data: {
        click_action: clickAction || '/',
      },
      tokens: tokens,
    };

    const response = await messaging.sendEachForMulticast(message);
    
    // Optionally: handle failure results to remove dead tokens
    if (response.failureCount > 0) {
      const failedTokens: string[] = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(tokens[idx]);
        }
      });
      console.log('List of failed tokens:', failedTokens);
      // In production, we should delete these failed tokens from Firestore
    }

    return NextResponse.json({
      success: true,
      successCount: response.successCount,
      errorCount: response.failureCount,
    });
    
  } catch (error: any) {
    console.error('Error broadcasting push notification:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send broadcast.' },
      { status: 500 }
    );
  }
}
