// Simple wrapper for Google Analytics event tracking
// You need to replace G-XXXXXXXXXX in index.html with your actual Measurement ID

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
