// @ts-nocheck
// import { serverSupabaseServiceRole } from '#supabase/server'

export const ok = {
  toInt(input){
    const pattern = /[^0-9]/g;
    return input.replace(pattern, '');
  },
  toChar(input){
    const pattern = /[^0-9]/g;
    return input.replace(pattern, '');
  },
  log(type, text){
    // const supabase = serverSupabaseServiceRole()

    // https://talyian.github.io/ansicolors/
    let label = '\x1b[34m● \x1b[0m';
    if (type==='success') label = '\x1b[32m● \x1b[0m'
    if (type==='warn')    label = '\x1b[33m● \x1b[0m'
    if (type==='error')   label = '\x1b[31m● \x1b[0m'
    console.log(label + text)
    let json={
      "uuid": okuuid(),
      "type": type,
      "text": text
    }
    return json
  }
};
export const okuuid = () => {  
  const uuidBytes = new Array(16);
  for (let i = 0; i < 16; i++) {
    uuidBytes[i] = Math.floor(Math.random() * 256);
  }
  uuidBytes[6] = (uuidBytes[6] & 0x0f) | 0x40; // set version to 4
  uuidBytes[8] = (uuidBytes[8] & 0x3f) | 0x80; // set variant to RFC 4122
  const hex = Array.from(uuidBytes, b => ('00' + b.toString(16)).slice(-2)).join('');
  const uuid = hex.substr(0, 8) + '-' + hex.substr(8, 4) + '-' + hex.substr(12, 4) +
              '-' + hex.substr(16, 4) + '-' + hex.substr(20, 12);
  return uuid;
};

const httpPost = async (api, json) => {
  fetch(api, {
    method: "POST",
    body: JSON.stringify(json),
    headers: { "Content-type": "application/json; charset=UTF-8"}
  });
  return
}

export const okclock = (input) => {
  if (input="now") return Date.now()
  if (input="today") return Date.now()
  if (input="tomorrow") return "not supported yet"
}

export const oktochars = (input) => {
    // The regex pattern matches any non-numeric characters and spaces
    const pattern = /[^a-zA-Z]/g;
    return input.replace(pattern, '');
};