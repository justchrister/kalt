export type { user };

declare global {
    interface user {
        id?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        country?: string;
        city?: string;
        postalCode?: string;
        birthdate?: Date;
        addressLine1?: string;
        addressLine2?: string;
        autoVest?: number;
        newsletters?: boolean;
        termsOfService?: boolean;
        performanceUpdates?: boolean;
        profilePicture?: string;
        language?: string;
        paymentProviderId?: string;
        currency?: string;
    }
}