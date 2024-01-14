const exec = require('child_process').exec;
const fetch = require('node-fetch'); // Ensure this is installed
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_SEC_ALERTS);

const sendSlackNotification = async (message) => {
  const { data, error } = await resend.emails.send({
    from: 'Kalt — Security alerts <onboarding@resend.dev>',
    to: [process.env.RESEND_SEC_ALERTS],
    subject: 'NPM Audit Failure',
    html: message,
  });
  if (error) {
    console.error(`Error sending Slack notification: ${error}`);
  } else {
    console.log('Slack notification sent');
  }
};

exec('npm audit --json', (error, stdout) => {
  if (error) {
    console.error(`NPM Audit Failure: ${error}`);
    sendSlackNotification(`NPM Audit Failure: ${error}`);
    process.exit(1); // Exit with a failure code
  } else {
    const auditResults = JSON.parse(stdout);
    if (auditResults.metadata.vulnerabilities.total > 0) {
      const message = `NPM Audit: ${auditResults.metadata.vulnerabilities.total} vulnerabilities found.`;
      sendSlackNotification(message);
    } else {
      console.log('NPM Audit Success: No issues found');
      sendSlackNotification('NPM Audit Success: No issues found');
    }
  }
});