export default defineEventHandler(async (event) => {

  const secretCronKey = 'Bearer ' + process.env.CRON_SECRET;
  const secretWebhookKey = 'Bearer ' + process.env.WEBHOOK_SECRET;
  const incomingKey = event.node.req.headers['authorization'];

  return {
    incomingKey,
    secretCronKey,
    secretWebhookKey, 
    event
  }
});