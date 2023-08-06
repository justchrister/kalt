import { ok } from '~/composables/ok'

const createJsonAndPublish = async (client: any, meta: any, content: any, topic: any) => {
  const json = {
    ...content
  };
  if(meta.id) json['message_id'] = meta.id;
  if(meta.entity) json['message_entity'] = meta.entity;
  if(meta.sent) json['message_sent'] = meta.sent;
  if(meta.sender) json['message_sender'] = meta.sender;
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
    userPreferences: async (content: userPreferences) => {
      return await createJsonAndPublish(client, meta, content, 'topic_userPreferences');
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
    entity: async (entity: any) => {
      const { data, error } = await client
        .from('topic_'+topic)
        .select()
        .eq('message_entity', entity)
        .order('message_sent', { ascending: true })
      if(error) {
        return error
      } else {
        return ok.combineJson(data)
      }
    },
    read: async (service: any, id: any) => {
      const subscription = 'sub_'+topic+'_'+service
      const { error} = await client
        .from(subscription)
        .update({ message_read: true })
        .eq('message_id', id)
    }
  }
}
