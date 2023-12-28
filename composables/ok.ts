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
  toFloat (input) {
    // Remove all characters that are not digits, dots, or dashes
    const cleanedInput = input.replace(/[^\d.,-]/g, '');
  
    // Remove commas if they exist
    const withoutCommas = cleanedInput.replace(/,/g, '');
    return parseFloat(withoutCommas);
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
    if(!iban) return null
    const formattedIBAN = iban.match(/.{1,4}/g).join(' ');
    return formattedIBAN;
  },
  formatBankCode(bic) {
    if(!bic) return null
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
  sleep: async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  validateCard(num){
    let sum = 0;
    let isEven = false;
  
    // Remove any non-numeric characters and reverse the string
    const cardNumber = String(num).replace(/\D/g, "").split("").reverse().join("");
  
    for (let n = 0; n < cardNumber.length; n++) {
      let digit = parseInt(cardNumber.charAt(n));
  
      if (isEven) {
        digit *= 2;
  
        if (digit > 9) {
          digit -= 9;
        }
      }
  
      sum += digit;
      isEven = !isEven;
    }
  
    return sum % 10 === 0;
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
    // Create the date object
    const date = dd && mm && yyyy ? new Date(Date.UTC(yyyy, mm - 1, dd)) : new Date();
  
    // Extract and format the components of the date
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const ms = String(date.getUTCMilliseconds()).padStart(3, '0');
  
    // Format the timestamp
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
  combineJsonByEntity(jsonArray) {
    let result = [];
    let tempObj = {};
  
    if (!jsonArray) return "No input";
  
    jsonArray.forEach(jsonObj => {
      const entity = jsonObj.id;
  
      if (!tempObj[entity]) {
        tempObj[entity] = {};
      }
  
      for (const key in jsonObj) {
        if (jsonObj[key] !== null && key !== 'event' && key !== 'sender') {
          tempObj[entity][key] = jsonObj[key];
        }
      }
    });
  
    for (const key in tempObj) {
      result.push(tempObj[key]);
    }
  
    return result;
  },
  combineJsonByTicker(jsonArray) {
    let result = [];
    let tempObj = {};
  
    if (!jsonArray) return "No input";
  
    jsonArray.forEach(jsonObj => {
      const ticker = jsonObj.message_ticker;
  
      if (!tempObj[ticker]) {
        tempObj[ticker] = {};
      }
  
      for (const key in jsonObj) {
        if (jsonObj[key] !== null && key !== 'event' && key !== 'sender') {
          tempObj[ticker][key] = jsonObj[key];
        }
      }
    });
  
    for (const key in tempObj) {
      result.push(tempObj[key]);
    }
  
    return result;
  },
  combineJsonByKeys(jsonArray, ...keysToMergeOn) {
    let result = [];
    let tempObj = {};
  
    if (!jsonArray) return "No input";
  
    jsonArray.forEach(jsonObj => {
      // Create a composite key using the keysToMergeOn
      const compositeKey = keysToMergeOn.map(key => jsonObj[key]).join('|');
  
      if (!tempObj[compositeKey]) {
        tempObj[compositeKey] = {};
      }
  
      for (const key in jsonObj) {
        if (jsonObj[key] !== null && key !== 'event' && key !== 'sender') {
          tempObj[compositeKey][key] = jsonObj[key];
        }
      }
    });
  
    for (const key in tempObj) {
      result.push(tempObj[key]);
    }
  
    return result;
  },
  verifyKeyPair: async (event:any) => {
    const secretCronKey = 'Bearer ' + process.env.CRON_SECRET;
    const secretWebhookKey = 'Bearer ' + process.env.WEBHOOK_SECRET;
    const incomingKey = event.node.req.headers['authorization'];
    if (!incomingKey || incomingKey !== secretCronKey || incomingKey !== secretWebhookKey) {
      return false
    } else {
      return true
    }
  },
  merge(jsonArray: any[], ...keysToMergeOn: string[]) {
    let tempObj: { [key: string]: any } = {};

    if (!jsonArray || jsonArray.length === 0) {
      return [];
    }
  
    jsonArray.forEach(jsonObj => {
      const compositeKey = keysToMergeOn.map(key => jsonObj[key]).join('|');
      tempObj[compositeKey] = tempObj[compositeKey] || {};
  
      for (const key in jsonObj) {
        if (jsonObj[key] !== null && key !== 'event' && key !== 'sender') {
          tempObj[compositeKey][key] = jsonObj[key];
        }
      }
    });
  
    const mergedArray = Object.values(tempObj);
  
    // Extending the Array prototype to include the single method
    Object.defineProperty(mergedArray, 'single', {
      value: function() {
        return this[0] || null;
      },
      writable: true,
      enumerable: false,
      configurable: true
    });
  
    return mergedArray;
  },
  uuid(){
    return uuidv4()
  },
  getEntity: async (supabase, topic, entity) => {
    const { data, error } = await supabase
      .from(topic)
      .select()
      .eq('id', entity)
      .order('timestamp', { ascending: true })
    return ok.combineJson(data)
  },
  convertCurrency: async (supabase, amount, from, to) => {
    const { data, error } = await supabase
      .from('topic_exchangeRates')
      .select('rate')
      .eq('from', from)
      .eq('to', to)
      .limit(1)
      .single()
    if(error) {
      return amount
    } else {
      return amount*data.rate
    }
  },
  cleanMessage: async (message) => {
    const json = Object.entries(message).reduce((acc, [key, value]) => {
      if (value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});
    delete json.event
    delete json.id
    delete json.timestamp
    delete json.sender
    return json
  }
};

export const okclock = (input) => {
  if (input="now") return Date.now()
  if (input="today") return Date.now()
  if (input="tomorrow") return "not supported yet"
}