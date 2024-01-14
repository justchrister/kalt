import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

export const encryptServerSide = (text: string, secretKey: string) => {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), content: encrypted.toString('hex') };
};

export const decryptServerSide = (hash: { iv: string, content: string }, secretKey: string): string => {
  const iv = Buffer.from(hash.iv, 'hex');
  const encryptedText = Buffer.from(hash.content, 'hex');
  const decipher = createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};