// Client-side Encryption and Decryption

export const encryptClientSide = async (text, secretKeyHex) => {
  const iv = window.crypto.getRandomValues(new Uint8Array(16));

  // Convert the hex string key to a format suitable for the Web Crypto API
  const secretKey = new Uint8Array(secretKeyHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

  const key = await window.crypto.subtle.importKey(
      "raw",
      secretKey,
      { name: "AES-CBC" },
      false,
      ["encrypt"]
  );

  const encrypted = await window.crypto.subtle.encrypt(
      { name: "AES-CBC", iv },
      key,
      new TextEncoder().encode(text)
  );

  return {
      iv: Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join(''),
      content: Array.from(new Uint8Array(encrypted)).map(b => b.toString(16).padStart(2, '0')).join('')
  };
};

export const decryptClientSide = async (hash: { iv: string, content: string }, secretKey: string): Promise<string> => {
  const iv = new Uint8Array(hash.iv.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  const encryptedData = new Uint8Array(hash.content.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));

  const key = await window.crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secretKey),
      { name: "AES-CBC" },
      false,
      ["decrypt"]
  );

  const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      key,
      encryptedData
  );

  return new TextDecoder().decode(decrypted);
};
