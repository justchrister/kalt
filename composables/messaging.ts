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
  return message
}