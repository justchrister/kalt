import { ok } from '~/composables/ok'

const createJsonAndPublish = async (client: any, meta: any, content: any, topic: any) => {
  const json = {
    ...content
  };
  if(meta.event) json['event'] = meta.event;
  if(meta.id) json['id'] = meta.id;
  if(meta.timestamp) json['timestamp'] = meta.timestamp;
  if(meta.sender) json['sender'] = meta.sender;
  const { error } = await client.from(topic).insert(json);
  if(error) ok.log('error', error);
  return error;
};

export const pub = (client: any, meta: any) => {
  return {
    transactions: async (content: transaction) => {
      return await createJsonAndPublish(client, meta, content, 'topic_transactions');
    },
    exchangeOrders: async (content: exchangeOrder) => {
      return await createJsonAndPublish(client, meta, content, 'topic_exchange');
    },
    userSubscriptions: async (content: userSubscription) => {
      return await createJsonAndPublish(client, meta, content, 'topic_userSubscriptions');
    },
    users: async (content: user) => {
      return await createJsonAndPublish(client, meta, content, 'topic_users');
    },
    exchangeOrder: async (content: exchangeOrder) => {
      return await createJsonAndPublish(client, meta, content, 'topic_exchange');
    },
    exchangeRates: async (content: exchangeRate) => {
      return await createJsonAndPublish(client, meta, content, 'topic_exchangeRates');
    },
    cards: async (content: card) => {
      return await createJsonAndPublish(client, meta, content, 'topic_cards');
    },
    paymentsPending: async (content: paymentsPending) => {
      return await createJsonAndPublish(client, meta, content, 'topic_paymentsPending');
    },
    linkedBankAccounts: async (content: linkedBankAccount) => {
      return await createJsonAndPublish(client, meta, content, 'topic_linkedBankAccounts');
    },
    requestAccess: async (content: requestAccess) => {
      return await createJsonAndPublish(client, meta, content, 'topic_requestAccess');
    },
    userDefinedFunds: async (content: userDefinedFund) => {
      return await createJsonAndPublish(client, meta, content, 'topic_userDefinedFunds');
    },
    autoInvest: async (content: autoInvest) => {
      return await createJsonAndPublish(client, meta, content, 'topic_autoInvest');
    }
  }
}

export const sub = (client: any, topic: any) => {
  return {
    entity: async (entity: any) => {
      const { data, error } = await client
        .from('topic_'+topic)
        .select()
        .eq('id', entity)
        .order('timestamp', { ascending: true })
      if(error) {
        return error
      } else {
        return ok.merge(data, 'id').single()
      }
    },
    read: async (service: any, id: any) => {
      const subscription = 'sub_'+topic+'_'+service
      const { error, data } = await client
        .from(subscription)
        .update({ read: true })
        .eq('event', id)
        .select()
      if(error) {
        ok.log('', error)
      } else {
        ok.log('', data)
      }
    }
  }
}