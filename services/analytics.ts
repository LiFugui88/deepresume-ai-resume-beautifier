// Analytics service - tracks events to both Google Analytics and Supabase
import { supabase } from './supabase';

// Google Analytics event tracking
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, params);
    } else {
        console.log(`[Analytics] Event: ${eventName}`, params);
    }
};

export const AnalyticsEvents = {
    UPLOAD_RESUME: 'upload_resume',
    MANUAL_ENTRY_START: 'manual_entry_start',
    MANUAL_ENTRY_SUBMIT: 'manual_entry_submit',
    ANALYSIS_SUCCESS: 'analysis_success',
    ANALYSIS_FAILURE: 'analysis_failure',
    DOWNLOAD_PDF: 'download_pdf',
    INITIATE_CHECKOUT: 'initiate_checkout',
    SWITCH_TEMPLATE: 'switch_template',
};

// Supabase analytics tracking (for admin dashboard)
export type AnalyticsEventType = 'page_view' | 'resume_generate' | 'pdf_download';

export const trackAnalytics = async (
    eventType: AnalyticsEventType,
    options?: {
        template?: string;
        isLoggedIn?: boolean;
    }
) => {
    try {
        const { error } = await supabase.from('analytics').insert({
            event_type: eventType,
            template: options?.template || null,
            is_logged_in: options?.isLoggedIn || false,
        });

        if (error) {
            console.error('Failed to track analytics:', error);
        }
    } catch (err) {
        // Silently fail - analytics should not break the app
        console.error('Analytics error:', err);
    }
};
