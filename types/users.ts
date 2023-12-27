export { user };

declare global {
    interface user {
        userId?: string;
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
        colorScheme?: string;
        profilePicture?: string;
        language?: string;
        currency?: string;
    }
}