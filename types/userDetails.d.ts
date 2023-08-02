export { userDetails };

declare global {
    interface userDetails {
        userId?: string;
        firstName?: string;
        lastName?: string;
        country?: string;
        city?: string;
        postalCode?: string;
        birthdate?: Date;
        addressLine1?: string;
        addressLine2?: string;
    }
}