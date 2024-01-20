export { invite };

declare global {
  interface invite {
    id?: string;
    code?: string;
    used?: boolean;
  }
}