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
const removeNullValues = (message) => {
  const json = Object.entries(message).reduce((acc, [key, value]) => {
    if (value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});
  return json
}
export const message = {
  get: async (messageEntityId) => {
    // create a view where you can get messageEntityId
    // Retrieve the account transaction messages related to the entityId
    // Combine messages and remove null values
    // Return the combined result
  },
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