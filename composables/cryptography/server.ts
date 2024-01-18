import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

export const encryptServerSide = (text: string, secretKey: string) => {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), content: encrypted.toString('hex') };
};
export const decryptServerSide = (hash: { iv: string, content: string }, secretKeyHex: string): string => {
  const iv = Buffer.from(hash.iv, 'hex');
  const encryptedText = Buffer.from(hash.content, 'hex');

  // Convert hex string to Buffer
  const secretKey = Buffer.from(secretKeyHex, 'hex');

  // Ensure that the secretKey is 32 bytes for AES-256-CBC
  if (secretKey.length !== 32) {
    throw new Error('Invalid key length');
  }

  const decipher = createDecipheriv('aes-256-cbc', secretKey, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};