export { linkedBankAccount };

declare global {
    interface linkedBankAccount {
        userId: string;
        name?: string;
        email?: string;
        iban?: string;
        bankCode?: string;
    }
}
