import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

export const encryptServerSide = (text: string, secretKeyHex: string) => {
  const iv = randomBytes(16);

  const secretKey = Buffer.from(secretKeyHex, 'hex');

  const cipher = createCipheriv('aes-256-cbc', secretKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return { iv: iv.toString('hex'), content: encrypted };
};

export const decryptServerSide = (hash: { iv: string, content: string }, secretKeyHex: string): string => {
  const iv = Buffer.from(hash.iv, 'hex');
  const encryptedText = Buffer.from(hash.content, 'hex');

  const secretKey = Buffer.from(secretKeyHex, 'hex');

  const decipher = createDecipheriv('aes-256-cbc', secretKey, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};