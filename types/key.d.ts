export { key };

declare global {
  interface key {
    key?: string;
    nonce?: string;
  }
}