
const CREEM_API_URL = 'https://api.creem.io/v1'; // Verify actual API URL
const PRODUCT_ID = 'YOUR_PRODUCT_ID'; // User needs to set this

export const initiateCheckout = async (email: string) => {
    try {
        const apiKey = import.meta.env.VITE_CREEM_PUBLIC_KEY;
        const productId = import.meta.env.VITE_CREEM_PRODUCT_ID;

        if (!apiKey || !productId) {
            console.error('Missing Creem configuration', { apiKey: !!apiKey, productId: !!productId });
            throw new Error('Payment configuration missing');
        }

        const payload = {
            product_id: productId,
            customer_email: email,
            success_url: `${window.location.origin}?payment=success`,
            cancel_url: `${window.location.origin}?payment=cancel`,
        };

        console.log('Initiating checkout with payload:', payload);

        const response = await fetch(`${CREEM_API_URL}/checkouts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Payment API Error:', response.status, errorText);
            throw new Error(`Failed to initiate checkout: ${response.statusText}`);
        }

        const data = await response.json() as { checkout_url?: string };
        if (data.checkout_url) {
            window.location.href = data.checkout_url;
        } else {
            console.error('No checkout_url in response:', data);
            throw new Error('No checkout URL returned');
        }
    } catch (error) {
        console.error('Payment Error:', error);
        throw error;
    }
};
