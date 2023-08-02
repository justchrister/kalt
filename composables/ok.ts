// @ts-nocheck
import { v4 as uuidv4 } from 'uuid';
export const ok = {

  async fetch(method, url) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
  today() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because getMonth() starts at 0
    const year = date.getFullYear().toString();
    const yearShort = year.slice(-2); // Get last two digits for short year format

    return {
      toString: () => `${day}.${month}.${yearShort}`,
      dd: () => day,
      mm: () => month,
      yy: () => yearShort,
      yyyy: () => year
    }
  },
  lastDateOfMonth(){
    const date = new Date();
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate().toString().padStart(2, '0');

    return lastDayOfMonth;
  },
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
    let lineIcon ='\x1b[34m| \x1b[0m'
    let text = ''
    if (type==='success') {
      label = '\x1b[32m● \x1b[0m'
      lineIcon ='\x1b[32m| \x1b[0m'
    }
    if (type==='warn'){
      label = '\x1b[33m● \x1b[0m'
      lineIcon ='\x1b[33m| \x1b[0m'
    }
    if (type==='error'){
      label = '\x1b[31m● \x1b[0m'
      lineIcon ='\x1b[31m| \x1b[0m'
    }
  
    inputs.forEach((input, i) => {
      if (Array.isArray(input) && input.every(x => typeof x === 'string')) {
        text += '\n' + input.map((elem, index) => `${lineIcon} ${String(index)}  "${elem}"`).join('\n');
      } else if (typeof input === 'object') {
        const formattedObject = JSON.stringify(input, null, 2)
          .split('\n')
          .map((line) => lineIcon+' '+ line)
          .join('\n');
        text += '\n' + formattedObject;
      } else {
        text += input;
      }
    });
    
    console.log(label + text)
    return
  },

  addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  },

  prettyCurrency(amount) {
    let amountRounded = (Math.ceil(amount * 10) / 10).toFixed(1);
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    });
    return formatter.format(amountRounded);
  },
  prettyDate(dateTime) {
    const date = new Date(dateTime);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
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
  timestamptz(dd = null, mm = null, yyyy = null) {
    const date = dd && mm && yyyy ? new Date(yyyy, mm - 1, dd) : new Date();
    const year = date.getUTCFullYear();
    const month = dd || mm || yyyy ? String(date.getUTCMonth() + 1).padStart(2, '0') : String(new Date().getUTCMonth() + 1).padStart(2, '0');
    const day = dd || mm || yyyy ? String(date.getUTCDate()).padStart(2, '0') : String(new Date().getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const ms = String(date.getUTCMilliseconds()).padStart(3, '0');
    const timestamptz = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${ms}Z`;
    return timestamptz;
  },
  combineJson(jsonArray){
    
    let result = {};
    if (!jsonArray) return "no input"
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
  },
  convertCurrency: async (supabase, amount, from, to) => {
    const { data, error } = await supabase
      .from('topic_exchangeRates')
      .select('value')
      .eq('from', from)
      .eq('to', to)
      .limit(1)
      .single()
    if(data) return amount*data.rate
    if(error) return amount
  },
  cleanMessage: async (message) => {
    const json = Object.entries(message).reduce((acc, [key, value]) => {
      if (value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});
    delete json.message_id
    delete json.message_entity
    delete json.message_sent
    delete json.message_sender
    return json
  }
};

export const okclock = (input) => {
  if (input="now") return Date.now()
  if (input="today") return Date.now()
  if (input="tomorrow") return "not supported yet"
}