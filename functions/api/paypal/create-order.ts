import { createClient } from '@supabase/supabase-js';

interface Env {
    PAYPAL_CLIENT_ID: string;
    PAYPAL_CLIENT_SECRET: string;
    PAYPAL_MODE: string; // 'sandbox' or 'live'
    SUPABASE_URL: string;
    SUPABASE_SERVICE_KEY: string;
}

interface OrderRequest {
    plan: 'pro_lifetime';
    userId?: string;
    email?: string;
}

const PLANS = {
    pro_lifetime: {
        name: 'DeepResume Pro (Lifetime)',
        price: '9.99',
        currency: 'USD'
    }
};

async function getPayPalAccessToken(env: Env): Promise<string> {
    const baseUrl = env.PAYPAL_MODE === 'live'
        ? 'https://api-m.paypal.com'
        : 'https://api-m.sandbox.paypal.com';

    const auth = btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`);

    const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
        throw new Error('Failed to get PayPal access token');
    }

    const data = await response.json() as { access_token: string };
    return data.access_token;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    try {
        // Validate environment variables
        if (!env.PAYPAL_CLIENT_ID || !env.PAYPAL_CLIENT_SECRET) {
            return new Response(
                JSON.stringify({ error: 'PayPal credentials not configured' }),
                { status: 500, headers: corsHeaders }
            );
        }

        const body = await request.json() as OrderRequest;
        const { plan, userId, email } = body;

        if (!plan || !PLANS[plan]) {
            return new Response(
                JSON.stringify({ error: 'Invalid plan selected' }),
                { status: 400, headers: corsHeaders }
            );
        }

        const selectedPlan = PLANS[plan];
        const baseUrl = env.PAYPAL_MODE === 'live'
            ? 'https://api-m.paypal.com'
            : 'https://api-m.sandbox.paypal.com';

        // Get access token
        const accessToken = await getPayPalAccessToken(env);

        // Create PayPal order
        const orderResponse = await fetch(`${baseUrl}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [{
                    reference_id: `${plan}_${Date.now()}`,
                    description: selectedPlan.name,
                    custom_id: userId || 'anonymous',
                    amount: {
                        currency_code: selectedPlan.currency,
                        value: selectedPlan.price
                    }
                }],
                application_context: {
                    brand_name: 'DeepResume',
                    locale: 'en-US',
                    landing_page: 'LOGIN',
                    user_action: 'PAY_NOW',
                    shipping_preference: 'NO_SHIPPING',
                    return_url: 'https://deep-resume.xyz/payment/success',
                    cancel_url: 'https://deep-resume.xyz/payment/cancel'
                }
            })
        });

        if (!orderResponse.ok) {
            const errorText = await orderResponse.text();
            console.error('PayPal create order error:', errorText);
            return new Response(
                JSON.stringify({ error: 'Failed to create PayPal order', details: errorText }),
                { status: 500, headers: corsHeaders }
            );
        }

        const orderData = await orderResponse.json() as {
            id: string;
            status: string;
            links: Array<{ href: string; rel: string }>;
        };

        // Save order to database
        if (env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY) {
            const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);

            await supabase.from('payment_orders').insert({
                order_id: orderData.id,
                user_id: userId || null,
                email: email || null,
                plan: plan,
                amount: selectedPlan.price,
                currency: selectedPlan.currency,
                status: 'CREATED',
                provider: 'paypal'
            });
        }

        // Find the approval URL (could be 'approve' or 'payer-action')
        const approvalLink = orderData.links.find(link =>
            link.rel === 'approve' || link.rel === 'payer-action'
        );

        return new Response(
            JSON.stringify({
                orderId: orderData.id,
                status: orderData.status,
                approvalUrl: approvalLink?.href
            }),
            { headers: corsHeaders }
        );

    } catch (error: any) {
        console.error('PayPal create order error:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: corsHeaders }
        );
    }
};

export const onRequestOptions: PagesFunction = async () => {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
};
