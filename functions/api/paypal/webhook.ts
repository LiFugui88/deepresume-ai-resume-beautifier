import { createClient } from '@supabase/supabase-js';

interface Env {
    PAYPAL_CLIENT_ID: string;
    PAYPAL_CLIENT_SECRET: string;
    PAYPAL_MODE: string;
    PAYPAL_WEBHOOK_ID: string;
    SUPABASE_URL: string;
    SUPABASE_SERVICE_KEY: string;
}

interface PayPalWebhookEvent {
    id: string;
    event_type: string;
    resource: {
        id: string;
        status: string;
        purchase_units?: Array<{
            reference_id: string;
            custom_id: string;
            payments?: {
                captures?: Array<{
                    id: string;
                    status: string;
                    amount: { value: string; currency_code: string };
                }>;
            };
        }>;
        payer?: {
            email_address: string;
            payer_id: string;
        };
    };
    create_time: string;
}

async function verifyWebhookSignature(
    env: Env,
    headers: Headers,
    body: string
): Promise<boolean> {
    const baseUrl = env.PAYPAL_MODE === 'live'
        ? 'https://api-m.paypal.com'
        : 'https://api-m.sandbox.paypal.com';

    const auth = btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`);

    // Get access token
    const tokenResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    if (!tokenResponse.ok) {
        console.error('Failed to get access token for webhook verification');
        return false;
    }

    const tokenData = await tokenResponse.json() as { access_token: string };

    // Verify webhook signature
    const verifyResponse = await fetch(`${baseUrl}/v1/notifications/verify-webhook-signature`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            auth_algo: headers.get('paypal-auth-algo'),
            cert_url: headers.get('paypal-cert-url'),
            transmission_id: headers.get('paypal-transmission-id'),
            transmission_sig: headers.get('paypal-transmission-sig'),
            transmission_time: headers.get('paypal-transmission-time'),
            webhook_id: env.PAYPAL_WEBHOOK_ID,
            webhook_event: JSON.parse(body)
        })
    });

    if (!verifyResponse.ok) {
        console.error('Webhook verification request failed');
        return false;
    }

    const verifyData = await verifyResponse.json() as { verification_status: string };
    return verifyData.verification_status === 'SUCCESS';
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    try {
        const body = await request.text();

        // Verify webhook signature (skip in development if needed)
        if (env.PAYPAL_WEBHOOK_ID) {
            const isValid = await verifyWebhookSignature(env, request.headers, body);
            if (!isValid) {
                console.error('Invalid webhook signature');
                return new Response('Invalid signature', { status: 401 });
            }
        }

        const event = JSON.parse(body) as PayPalWebhookEvent;
        console.log('Received PayPal webhook:', event.event_type, event.id);

        // Initialize Supabase client
        if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_KEY) {
            console.error('Supabase credentials not configured');
            return new Response('OK', { status: 200 });
        }

        const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);

        // Handle different event types
        switch (event.event_type) {
            case 'CHECKOUT.ORDER.APPROVED': {
                // Order approved by buyer, but not yet captured
                const orderId = event.resource.id;

                await supabase
                    .from('payment_orders')
                    .update({
                        status: 'APPROVED',
                        payer_email: event.resource.payer?.email_address,
                        payer_id: event.resource.payer?.payer_id,
                        updated_at: new Date().toISOString()
                    })
                    .eq('order_id', orderId);

                console.log('Order approved:', orderId);
                break;
            }

            case 'PAYMENT.CAPTURE.COMPLETED': {
                // Payment successfully captured - upgrade user
                const orderId = event.resource.id;
                const purchaseUnit = event.resource.purchase_units?.[0];
                const capture = purchaseUnit?.payments?.captures?.[0];
                const userId = purchaseUnit?.custom_id;
                const plan = purchaseUnit?.reference_id?.split('_')[0]; // e.g., 'pro_monthly_timestamp' -> 'pro'

                // Update payment order status
                await supabase
                    .from('payment_orders')
                    .update({
                        status: 'COMPLETED',
                        capture_id: capture?.id,
                        updated_at: new Date().toISOString()
                    })
                    .eq('order_id', orderId);

                // Upgrade user subscription if userId exists
                if (userId && userId !== 'anonymous') {
                    await supabase
                        .from('profiles')
                        .update({
                            subscription_status: 'pro',
                            subscription_id: orderId
                        })
                        .eq('id', userId);

                    console.log('User upgraded to pro:', userId);
                }

                console.log('Payment captured:', orderId, 'Amount:', capture?.amount?.value);
                break;
            }

            case 'PAYMENT.CAPTURE.DENIED':
            case 'PAYMENT.CAPTURE.REFUNDED': {
                // Payment denied or refunded - downgrade user if needed
                const orderId = event.resource.id;

                // Update order status
                await supabase
                    .from('payment_orders')
                    .update({
                        status: event.event_type === 'PAYMENT.CAPTURE.DENIED' ? 'DENIED' : 'REFUNDED',
                        updated_at: new Date().toISOString()
                    })
                    .eq('order_id', orderId);

                // Find and downgrade user
                const { data: order } = await supabase
                    .from('payment_orders')
                    .select('user_id')
                    .eq('order_id', orderId)
                    .single();

                if (order?.user_id) {
                    await supabase
                        .from('profiles')
                        .update({
                            subscription_status: 'free',
                            subscription_id: null
                        })
                        .eq('id', order.user_id);

                    console.log('User downgraded:', order.user_id);
                }
                break;
            }

            default:
                console.log('Unhandled event type:', event.event_type);
        }

        return new Response('OK', { status: 200 });

    } catch (error: any) {
        console.error('Webhook processing error:', error);
        // Return 200 to prevent PayPal from retrying
        return new Response('OK', { status: 200 });
    }
};

// Handle OPTIONS for CORS preflight
export const onRequestOptions: PagesFunction = async () => {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
};
