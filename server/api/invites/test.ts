import { ok } from '~/composables/ok'

export default defineEventHandler(async (event) => {

  const secretCronKey = 'Bearer ' + process.env.CRON_SECRET;
  const secretWebhookKey = 'Bearer ' + process.env.WEBHOOK_SECRET;
  const headers = event.node.req.headers
  const incomingKey = headers['authorization'];

  const keyPair = await ok.verifyKeyPair(event)
  return {
    keyPair,
    incomingKey,
    secretCronKey,
    secretWebhookKey,
    headers
  }
});