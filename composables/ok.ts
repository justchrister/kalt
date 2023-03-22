// @ts-nocheck
// import { serverSupabaseServiceRole } from '#supabase/server'


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
};

export const oklog = async (type, text) => {
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
  httpPost("~/api/oklog", json)
  return json
};
/*
export const okrandom = () => {
  return 
};


export const oktranslate = () => {
  return 
};

export const createOrder = (userId, ) => {
  const uuid = okuuid();
  let order = {
  }
  if(!userId) {
    return oklog("error", "order missing userId")
  }
  return 
};*/