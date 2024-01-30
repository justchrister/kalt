export { paymentMethod };

declare global {
  interface paymentMethod {
    id?: string;
    provider?: string;
    intentToken?: string;
    authenticationRequested?: boolean;
    used?: boolean;
  }
}
