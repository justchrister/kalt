// @ts-nocheck
import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server';

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
const supabase = serverSupabaseServiceRole()
export const message = {
  get: async (messageEntityId) => {
    // create a view where you can get messageEntityId
    // Retrieve the account transaction messages related to the entityId
    // Combine messages and remove null values
    // Return the combined result
  },
  post: async (sender, topic, json) => {
    const snakeCaseTopic = toSnakeCase(topic);
    const snakeCaseJson = convertKeysToSnakeCase(json);

    const { data, error } = await supabase
      .from(snakeCaseTopic)
      .insert({
        'message_created': ok.timestamptz(),
        'message_id': ok.uuid(),
        'message_sender': sender,
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