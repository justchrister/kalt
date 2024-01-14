const minKeyLength = 64;

const keyLengthRequirement = (key:string) => {
    if (key.length !== minKeyLength) {
        ok.log('error', 'Invalid secret key length: '+key.length)
        throw new Error("Invalid secret key length. Key must be 32 bytes for AES-256-CBC. This key is: "+ key.length);
    } else {
        console.log('key length ok')
    }
}



// Client-side Encryption and Decryption
export const encryptClientSide = async (text: string, secretKeyHex: string) => {
    keyLengthRequirement(secretKeyHex);
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
export const decryptClientSide = async (hash: { iv: string, content: string }, secretKeyHex: string): Promise<string> => {
    keyLengthRequirement(secretKeyHex);

  // Convert hex string to Uint8Array
  const hexStringToUint8Array = (hexString: string) => {
      const length = hexString.length;
      const uint8Array = new Uint8Array(length / 2);
      for (let i = 0; i < length; i += 2) {
          uint8Array[i / 2] = parseInt(hexString.substr(i, 2), 16);
      }
      return uint8Array;
  };
  const iv = hexStringToUint8Array(hash.iv);
  const encryptedData = hexStringToUint8Array(hash.content);

  const secretKey = hexStringToUint8Array(secretKeyHex);

  const key = await window.crypto.subtle.importKey(
      "raw",
      secretKey,
      { name: "AES-CBC" },
      false,
      ["decrypt"]
  );

  const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      key,
      encryptedData
  );
    const decoded = await new TextDecoder().decode(decrypted);
  return decoded;
};