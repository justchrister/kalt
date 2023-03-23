// @ts-nocheck
// publishOrder() should be a way of creating an order, that generates the event
const timestamp = async () => {
  return Date.now()
}

export const publishTransaction = (
  me: string,
  user: string,
  quantity: number,
  currency: string,
  transactionType: transactionType
) => {
  let message = {
    "from": me,
    "timestamp": timestamp(),
    "messageId": null, // auto generated
    "message": {
      "user_id": user,
      "quantity": quantity,
      "currency": currency,
      "transaction_type": transactionType
    }
  }
  console.log(message)
  return message
}