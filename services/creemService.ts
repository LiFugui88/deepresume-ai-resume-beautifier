const CREEM_API_URL = 'https://api.creem.io/v1'; // Verify actual API URL

export const initiateCheckout = async (email?: string) => {
    try {
        const productId = import.meta.env.VITE_CREEM_PRODUCT_ID;

        if (!productId) {
            console.error('Missing Creem Product ID');
            throw new Error('Configuration error');
        }

        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId,
                email
            }),
        });

        if (!response.ok) {
            const errorData = await response.json() as { error: string, details?: string };
            throw new Error(errorData.error || 'Checkout initiation failed');
        }

        const data = await response.json() as { checkout_url: string };

        if (data.checkout_url) {
            window.location.href = data.checkout_url;
        } else {
            throw new Error('No checkout URL received');
        }
    } catch (error) {
        console.error('Payment Error:', error);
        throw error;
    }
};
