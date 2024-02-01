export { paymentMethod };

declare global {
  interface paymentMethod {
    id?: string;
    provider?: string;
    intentToken?: string;
    methodId?: string;
    authenticationRequested?: boolean;
    used?: boolean;
  }
}
