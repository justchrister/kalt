export { linkedBankAccount };

declare global {
  interface linkedBankAccount {
    id?: string;
    name?: string;
    email?: string;
    iban?: string;
    bankCode?: string;
    reference?: string;
  }
}
