export { jobApplication };

declare global {
  interface jobApplication {
    role?: string;
    relevantProject?: string;
    bio?: string;
    relocate?: string;
    living?: string;
    contact?: string;
  }
}