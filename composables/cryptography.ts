import { ok } from '~/composables/ok'
const minKeyLength = 64;

const keyLengthRequirement = (key:string) => {
    if (key.length !== minKeyLength) {
        ok.log('error', 'Invalid secret key length: '+key.length)
    }
}

export const cryptography = {
    async decrypt(secretKey: string, hash: { iv: string, content: string }) {
        keyLengthRequirement(secretKey);
        if (process.client) {
            const { decryptClientSide } = await import('./cryptography/client');
            return await decryptClientSide(hash, secretKey);
        } else if (process.server) {
            const { decryptServerSide } = await import('./cryptography/server');
            return await decryptServerSide(hash, secretKey);
        }
    },
    async encrypt(secretKey: string, text: string) {
        keyLengthRequirement(secretKey);
        if (process.client) {
            const { encryptClientSide } = await import('./cryptography/client');
            return await encryptClientSide(text, secretKey);
        } else if (process.server) {
            const { encryptServerSide } = await import('./cryptography/server');
            return await encryptServerSide(text, secretKey);
        }
    }
}