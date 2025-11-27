import { Env } from './analyze';

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    try {
        if (!env.CREEM_API_KEY) {
            return new Response(JSON.stringify({ error: "Server configuration error: Missing Creem API Key" }), { status: 500 });
        }

        const { productId, email } = await request.json() as { productId: string, email?: string };

        if (!productId) {
            return new Response(JSON.stringify({ error: "Missing productId" }), { status: 400 });
        }

        const response = await fetch('https://api.creem.io/v1/checkouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': env.CREEM_API_KEY
            },
            body: JSON.stringify({
                product_id: productId,
                customer_email: email || undefined,
                success_url: "https://cvgopro.com?payment=success",
                cancel_url: "https://cvgopro.com?payment=cancelled"
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Creem API Error:', errorText);
            return new Response(JSON.stringify({ error: `Creem API Error: ${response.statusText}`, details: errorText }), { status: response.status });
        }

        const data = await response.json() as { checkout_url: string };
        return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });

    } catch (error: any) {
        console.error("Checkout Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
