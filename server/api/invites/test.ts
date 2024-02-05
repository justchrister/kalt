export default defineEventHandler(async (event) => {

  const secretCronKey = 'Bearer ' + process.env.CRON_SECRET;
  const secretWebhookKey = 'Bearer ' + process.env.WEBHOOK_SECRET;
  const headers = event.node.req.headers
  const incomingKey = headers['authorization'];

  return {
    incomingKey,
    secretCronKey,
    secretWebhookKey,
    headers
  }
});