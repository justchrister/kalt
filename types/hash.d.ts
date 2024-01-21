export type { Hash };

declare global {
    interface Hash {
        iv?: string;
        content?: string;
    }
}