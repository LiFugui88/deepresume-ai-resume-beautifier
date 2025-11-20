
const CREEM_API_URL = 'https://api.creem.io/v1'; // Verify actual API URL
const PRODUCT_ID = 'YOUR_PRODUCT_ID'; // User needs to set this

export const initiateCheckout = async (email: string) => {
    try {
        const response = await fetch(`${CREEM_API_URL}/checkouts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': import.meta.env.VITE_CREEM_PUBLIC_KEY || '',
            },
            body: JSON.stringify({
                product_id: import.meta.env.VITE_CREEM_PRODUCT_ID,
                customer_email: email,
                success_url: `${window.location.origin}?payment=success`,
                cancel_url: `${window.location.origin}?payment=cancel`,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to initiate checkout');
        }

        const data = await response.json() as { checkout_url?: string };
        if (data.checkout_url) {
            window.location.href = data.checkout_url;
        } else {
            throw new Error('No checkout URL returned');
        }
    } catch (error) {
        console.error('Payment Error:', error);
        throw error;
    }
};
