// @ts-nocheck
import { ok } from '~/composables/ok'

function toSnakeCase(str) {
  return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}
function convertKeysToSnakeCase(obj) {
  const result = {};
  for (const key in obj) {
    result[toSnakeCase(key)] = obj[key];
  }
  return result;
}
export const message = {
  post: async (supabase, topic, json) => {
    const snakeCaseTopic = toSnakeCase(topic);
    // remove null values
    const snakeCaseJson = convertKeysToSnakeCase(json);

    const { data, error } = await supabase
      .from(snakeCaseTopic)
      .insert({
        'message_created': ok.timestamptz(),
        'message_id': ok.uuid(),
        ...snakeCaseJson
      })
      .select()
    if(data) {
      ok.log('success', 'inserted on '+topic+': ', data)
      return data
    }
    if(error) {
      ok.log('error', 'failed to insert on '+topic+': ', error)
      return error
    }
  }
};

export const pub = async (supabase, topic, meta, json) => {
  if(!meta.messageSender) {
    return 'no message sender'
    ok.log('error', 'failed to insert on '+topic+': no messageSender')
  }
  let metaJson = {
    'message_id': meta.messageId || ok.uuid(),
    'message_entity_id': meta.messageEntityId || ok.uuid(),
    'message_created': meta.messageCreated || ok.timestamptz(),
    'message_sender': meta.messageSender
  }
  const snakeCaseTopic = toSnakeCase(topic);
  const snakeCaseJson = convertKeysToSnakeCase(json);
  const { data, error } = await supabase
    .from(snakeCaseTopic)
    .insert({
      ...metaJson,
      ...snakeCaseJson
    })
    .select()
  if(data) {
    ok.log('success', 'inserted on '+topic+': ', data)
    return data
  }
  if(error) {
    ok.log('error', 'failed to insert on '+topic+': ', error)
    return error
  }
};