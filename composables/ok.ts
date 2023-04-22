// @ts-nocheck
import { v4 as uuidv4 } from 'uuid';
export const ok = {
  toInt(input){
    const pattern = /[^0-9]/g;
    return parseInt(input.replace(pattern, ''));
  },
  toChar(input){
    const pattern = /[^0-9]/g;
    return input.replace(pattern, '');
  },
  invertInt(number) {
    return -number;
  },
  toPercent(int){
    return int*100 + '%'
  },
  formatIBAN(iban) {
    const formattedIBAN = iban.match(/.{1,4}/g).join(' ');
    return formattedIBAN;
  },
  formatBankCode(bic) {
    const formattedBIC = bic.replace(/(.{4})(.{3})(.*)/, '$1 $2 $3');
    return formattedBIC;
  },
  formatCurrency(amount, currency) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    });
    return formatter.format(amount);
  },
  log(type, ...inputs){
    // https://talyian.github.io/ansicolors/
    
    let label = '\x1b[34m● \x1b[0m'
    let text = ''
    if (type==='success') label = '\x1b[32m● \x1b[0m'
    if (type==='warn')    label = '\x1b[33m● \x1b[0m'
    if (type==='error')   label = '\x1b[31m● \x1b[0m'

    inputs.forEach((input) => {
      if (typeof input === 'object') {
        const formattedObject = JSON.stringify(input, null, 2)
          .split('\n')
          .map((line) => '  ' + line)
          .join('\n');
        text += '\n' + formattedObject;
      } else {
        text += input;
      }
    });
    if (type==='success') {
      console.log(label + text)
    } else if (type==='warn') {
      console.warn(label + text)
    } else if (type==='error') {
      console.error(label + text)
    } else {
      console.log(label + text)
    }

    return
  },

  addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  },

  prettyCurrency(amount, currency) {
    let amountRounded = (Math.ceil(amount * 10) / 10).toFixed(1);
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    });
    return formatter.format(amountRounded)
  },
  prettyDate(dateTime) {
    const day = new Date(dateTime).getDate()
    const month = new Date(dateTime).getMonth()+1
    const year = new Date(dateTime).getFullYear()
    return day+"/"+month+"/"+year
  },
  prettyTime(dateTime){
    const hour = ok.addZero(new Date(dateTime).getHours())
    const minute = ok.addZero(new Date(dateTime).getMinutes())
    return hour+":"+minute
  },
  supabaseDate(dateTime) {
    const day = new Date(dateTime).getDate()
    const month = new Date(dateTime).getMonth()+1
    const year = new Date(dateTime).getFullYear()
    return year+'-'+ok.addZero(month)+'-'+ok.addZero(day)
  },
  timestamptz() {
    const now = new Date()
    const year = now.getUTCFullYear()
    const month = String(now.getUTCMonth() + 1).padStart(2, '0')
    const day = String(now.getUTCDate()).padStart(2, '0')
    const hours = String(now.getUTCHours()).padStart(2, '0')
    const minutes = String(now.getUTCMinutes()).padStart(2, '0')
    const seconds = String(now.getUTCSeconds()).padStart(2, '0')
    const ms = String(now.getUTCMilliseconds()).padStart(3, '0')
    const timestamptz = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${ms}Z`
    return timestamptz
  },
  combineJson(jsonArray){
    
    let result = {};

    for (let i = 0; i < jsonArray.length; i++) {
      let jsonObj = jsonArray[i];

      for (let key in jsonObj) {
        // Only set the value in result object if it's not null
        if (jsonObj[key] !== null) {
          result[key] = jsonObj[key];
        }
      }
    }
    return result
  },
  camelToKebab(string){
    return string.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
  },
  convertKeysToCamelCase(object) {
    const result = {};
    for (const key in object) {
      const camelKey = kebabToCamel(key);
      result[camelKey] = object[key];
    }
    return result;
  },
  uuid(){
    return uuidv4()
  }
};

export const okclock = (input) => {
  if (input="now") return Date.now()
  if (input="today") return Date.now()
  if (input="tomorrow") return "not supported yet"
}