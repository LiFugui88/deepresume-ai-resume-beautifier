// PayPal Payment Service

interface CreateOrderResponse {
    orderId: string;
    status: string;
    approvalUrl: string;
}

export type PlanType = 'pro_lifetime';

export const PLAN_DETAILS = {
    pro_lifetime: {
        name: 'Lifetime Pro',
        price: '$9.99',
        priceValue: 9.99,
        period: 'one-time',
        features: [
            'Unlimited resume generations',
            'All premium templates',
            'PDF downloads',
            'No watermarks',
            'Priority support',
            'Lifetime access'
        ]
    }
} as const;

export async function createPayPalOrder(
    plan: PlanType,
    userId?: string,
    email?: string
): Promise<CreateOrderResponse> {
    const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            plan,
            userId,
            email
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create order');
    }

    return response.json();
}

export function redirectToPayPal(approvalUrl: string): void {
    window.location.href = approvalUrl;
}

// Helper to check URL params after redirect back
export function getPaymentResult(): { success: boolean; orderId?: string; cancelled?: boolean } | null {
    const params = new URLSearchParams(window.location.search);

    if (window.location.pathname === '/payment/success') {
        return {
            success: true,
            orderId: params.get('token') || undefined
        };
    }

    if (window.location.pathname === '/payment/cancel') {
        return {
            success: false,
            cancelled: true
        };
    }

    // Also check for legacy query params
    if (params.get('payment') === 'success') {
        return { success: true };
    }

    if (params.get('payment') === 'cancelled') {
        return { success: false, cancelled: true };
    }

    return null;
}
