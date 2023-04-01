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
      "type": type,
      "text": text
    }
    return json
  }
};
import { v4 as uuidv4 } from 'uuid';
export const okuuid = () => {
  return uuidv4()
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