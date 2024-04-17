// @ts-nocheck
import { v4 as uuidv4 } from 'uuid';
export const ok = {
  async post(url, bodyContent){
    try{
      const response = await $fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bodyContent })
      });
      return await response;
    } catch (error) {
      return {
        data: null,
        error: {
          status: 501,
          message: 'failed getting default payment method'
        }
      }
    }
  },
  async fetch(url) {
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
  toInt(input) {
    const toString = input.toString();
    const pattern = /[^0-9]/g;
    const asInt = parseInt(toString.replace(pattern, '')) as int;
    return asInt;
  },
  toFloat(input) {
    // Remove all characters that are not digits, dots, or dashes
    const cleanedInput = input.replace(/[^\d.,-]/g, '');

    // Remove commas if they exist
    const withoutCommas = cleanedInput.replace(/,/g, '');
    return parseFloat(withoutCommas);
  },
  toChar(input) {
    const pattern = /[^0-9]/g;
    return input.replace(pattern, '');
  },
  invertInt(number) {
    return -number;
  },
  toPercent(int) {
    return int * 100 + '%'
  },
  formatIBAN(iban) {
    if (!iban) return null
    const formattedIBAN = iban.match(/.{1,4}/g).join(' ');
    return formattedIBAN;
  },
  formatBankCode(bic) {
    if (!bic) return null
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
  log(type, ...inputs) {
    // https://talyian.github.io/ansicolors/
    let label = '\x1b[34m● \x1b[0m'
    let lineIcon = '\x1b[34m| \x1b[0m'
    let text = ''
    if (type === 'success') {
      label = '\x1b[32m● \x1b[0m'
      lineIcon = '\x1b[32m| \x1b[0m'
    }
    if (type === 'warn') {
      label = '\x1b[33m● \x1b[0m'
      lineIcon = '\x1b[33m| \x1b[0m'
    }
    if (type === 'error') {
      label = '\x1b[31m● \x1b[0m'
      lineIcon = '\x1b[31m| \x1b[0m'
    }

    inputs.forEach((input, i) => {
      if (Array.isArray(input) && input.every(x => typeof x === 'string')) {
        text += '\n' + input.map((elem, index) => `${lineIcon} ${String(index)}  "${elem}"`).join('\n');
      } else if (typeof input === 'object') {
        const formattedObject = JSON.stringify(input, null, 2)
          .split('\n')
          .map((line) => lineIcon + ' ' + line)
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
    if (i < 10) { i = "0" + i }
    return i;
  },
  sleep: async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  wait: async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
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
  prettyTime(dateTime) {
    const hour = ok.addZero(new Date(dateTime).getHours())
    const minute = ok.addZero(new Date(dateTime).getMinutes())
    return hour + ":" + minute
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
  verifyKeyPair: async (event: any) => {
    const storedKey = 'Bearer ' + process.env.CRON_SECRET;
    const incomingKey = event.node.req.headers['authorization'];    
    if (incomingKey === storedKey) return true;
    return false;
  },
  sum(sumField, array, groupByField) {
    const grouped = array.reduce((acc, obj) => {
      const key = obj[groupByField];
      if (!acc[key]) {
        acc[key] = { ...obj, [sumField]: 0 }; 
      }
      acc[key][sumField] += obj[sumField];
      return acc;
    }, {});
    return Object.values(grouped);
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

    return mergedArray;
  },
  uuid() {
    return uuidv4()
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
