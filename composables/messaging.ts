// @ts-nocheck
// publishOrder() should be a way of creating an order, that generates the event
const timestamp = async () => {
  return Date.now()
}
const uuid = () =>{
  const hex = Math.floor(Math.random() * 0xfffffffffffff).toString(16).padStart(12, '0');
  const uuid = `${hex.substr(0, 8)}-${hex.substr(8, 4)}-4${hex.substr(12, 3)}-${Math.floor(Math.random() * 0xfff).toString(16).padStart(3, '0')}-${Math.floor(Math.random() * 0xfffffffffffff).toString(16).padStart(12, '0')}`;
  return uuid;
}
const httpPost = async (api, json) => {
  fetch("https://kalt.requestcatcher.com/", {
    method: "POST",
    body: JSON.stringify(json),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
  return
}

export const publishOrder = (from, user, quantity, currency) => {
  let message = {
    "from": from,
    "timestamp": timestamp(),
    "messageId": uuid(),
    "message": {
      "user_id": user,
      "quantity": quantity,
      "currency": currency
    }
  }
  httpPost("/api/adapter/orderCreated", message)
  return message
};

export const publishTransaction = (from, user, quantity, currency) => {
  let message = {
    "from": from,
    "timestamp": timestamp(),
    "messageId": uuid(),
    "message": {
      "user_id": user,
      "quantity": quantity,
      "currency": currency
    }
  }
  httpPost("/api/adapter/orderCreated", message)
  return message
};