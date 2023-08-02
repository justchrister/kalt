export { userPreferences };

declare global {
    interface userPreferences {
        userId?: string;
        autoInvest?: number;
        newsletters?: boolean;
        termsOfService?: boolean;
        performanceUpdates?: boolean;
        colorScheme?: string;
        profilePicture?: string;
        language?: string;
        currency?: string;
    }
}