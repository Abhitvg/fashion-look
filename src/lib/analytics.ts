/**
 * GA4 event tracking helper.
 * Measurement ID: G-WPGKRLGNN7
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type EventName =
  | 'whatsapp_cta_hero'
  | 'whatsapp_cta_service'
  | 'whatsapp_cta_calculator'
  | 'whatsapp_cta_giftbox'
  | 'whatsapp_cta_homevisit'
  | 'whatsapp_cta_faq'
  | 'whatsapp_cta_fab'
  | 'calculator_completed'
  | 'referral_code_generated'
  | 'referral_code_copied'
  | 'referral_redeemed';

export function trackEvent(name: EventName, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params ?? {});
  }
}

export function openWhatsApp(url: string, eventName: EventName, params?: Record<string, string | number>) {
  trackEvent(eventName, params);
  window.open(url, '_blank', 'noopener,noreferrer');
}
