// @ts-nocheck
import { ok } from '~/composables/ok'
  
export const pub = (client, meta: messageMeta) => {
  return {
    accountTransaction: async (content: accountTransaction) => {
      const json = {
        'id': meta.id || ok.uuid(),
        'entity': meta.entity || ok.uuid(),
        'sent': meta.sent || ok.timestamptz(),
        'sender': meta.sender,
        ...content
      }
      const { data, error } = await client.from('topic_accountTransaction').insert(json).select()
      if(data) {
        ok.log('success', 'inserted on accountTransaction: ', data)
        return data
      }
      if(error) {
        ok.log('error', 'failed to insert accountTransaction: '+error.message)
        return error
      }
    },
    exchangeOrder: async (content: exchangeOrder) => {
      const json = {
        'id': meta.id || ok.uuid(),
        'entity': meta.entity || ok.uuid(),
        'sent': meta.sent || ok.timestamptz(),
        'sender': meta.sender,
        ...content
      }
      const { data, error } = await client.from(topic_exchangeOrder).insert(json).select()
      if(data) {
        ok.log('success', 'inserted on exchangeOrder: ', data)
        return data
      }
      if(error) {
        ok.log('error', 'failed to insert exchangeOrder: '+error.message)
        return error
      }
    },
  }
}
