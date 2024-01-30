export { requestAccess };

declare global {
  interface requestAccess {
    email?: string;
    firstName?: string;
    lastName?: string;
    country?: string;
  }
}