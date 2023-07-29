import { ok } from '~/composables/ok'

const createJsonAndPublish = async (content, topic) => {
  const json = {
    'id': meta.id || ok.uuid(),
    'entity': meta.entity || ok.uuid(),
    'sent': meta.sent || ok.timestamptz(),
    'sender': meta.sender,
    ...content
  }
  const { data, error } = await client.from(topic).insert(json).select()
  if (error) {
    ok.log('error', `failed to insert ${topic}: `+error.message)
  } else {
    ok.log('success', `inserted on ${topic}: `, data)
  }
  return { data, error }
}

export const pub = (client, meta: messageMeta) => {
  return {
    accountTransaction: async (content: accountTransaction) => {
      return await createJsonAndPublish(content, topic_accountTransaction);
    },
    exchangeOrder: async (content: exchangeOrder) => {
      return await createJsonAndPublish(content, topic_exchangeOrder);
    },
    userSubscriptions: async (content: userSubscription) => {
      return await createJsonAndPublish(content, topic_userSubscriptions);
    }
  }
}
