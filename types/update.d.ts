export type { update };

declare global {
  interface update {
    userId?: string;
    updateId?: string;
    cohort?: string;
    messages?: json;
    subject?: string;
    ingress?: string;
    category?: string;
    read?: boolean;
    channel?: string;
  }
}