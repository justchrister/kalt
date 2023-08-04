import { ok } from '~/composables/ok'

const createJsonAndPublish = async (client: any, meta: any, content: any, topic: any) => {
  const json = {
    'message_id': meta.id || ok.uuid(),
    'message_entity': meta.entity || ok.uuid(),
    'message_sent': meta.sent || ok.timestamptz(),
    'message_sender': meta.sender,
    ...content
  };
  const { error } = await client.from(topic).insert(json);
  return { error };
}

export const pub = (client: any, meta: any) => {
  return {
    accountTransactions: async (content: accountTransaction) => {
      return await createJsonAndPublish(client, meta, content, 'topic_accountTransaction');
    },
    exchangeOrders: async (content: exchangeOrder) => {
      return await createJsonAndPublish(client, meta, content, 'topic_exchangeOrder');
    },
    userSubscriptions: async (content: userSubscription) => {
      return await createJsonAndPublish(client, meta, content, 'topic_userSubscriptions');
    },
    exchangeRates: async (content: exchangeRate) => {
      return await createJsonAndPublish(client, meta, content, 'topic_exchangeRates');
    },
    paymentCards: async (content: paymentCard) => {
      return await createJsonAndPublish(client, meta, content, 'topic_paymentCards');
    },
    paymentsPending: async (content: paymentsPending) => {
      return await createJsonAndPublish(client, meta, content, 'topic_paymentsPending');
    },
    requestAccess: async (content: requestAccess) => {
      return await createJsonAndPublish(client, meta, content, 'topic_requestAccess');
    }
  }
}

export const sub = (client: any, topic: any) => {
  return {
    entity: async (entity_id: any) => {
      const { data, error } = await client
        .from('topic_'+topic)
        .select()
        .eq('message_entity', entity_id)
        .order('message_sent', { ascending: true })
      if(error) {
        return error
      } else {
        return ok.combineJson(data)
      }
    },
    read: async (service: any, message_id: any) => {
      const subscription = topic+'__'+service
      const { data, error} = await client
        .from(subscription)
        .update({ message_read: true })
        .eq('message_id', message_id)
      return {data, error}
    }
  }
}
