import { config } from 'dotenv';
import { exec } from 'child_process';
import { Resend } from 'resend';

config();
const resend = new Resend(process.env.RESEND_SEC_ALERTS);

const sendSlackNotification = async (message) => {
  const { data, error } = await resend.emails.send({
    from: 'Kalt — Security alerts <sec@ka.lt>',
    to: [process.env.SLACK_SEC_EMAIL],
    subject: 'NPM Audit Failure',
    html: message,
  });

  if (error) {
    console.error('Error sending Slack notification');
    console.log(error)
  } else {
    console.log('Slack notification sent');
  }
};

const test = false; // Set to false in production

exec('npm audit --json', (error, stdout) => {
  if (error || test) {
    console.error(`NPM Audit Failure: ${test ? 'Test Error' : error}`);
    sendSlackNotification(`NPM Audit Failure: ${test ? 'This is a test error message.' : error}`);
    if (!test) process.exit(1); // Exit with a failure code if not in test mode
  } else {
    const auditResults = JSON.parse(stdout);
    if (auditResults.metadata.vulnerabilities.total > 0 || test) {
      const message = `NPM Audit: ${test ? '1' : auditResults.metadata.vulnerabilities.total} vulnerability found.`;
      sendSlackNotification(message);
    } else {
      console.log('NPM Audit Success: No issues found');
      sendSlackNotification('NPM Audit Success: No issues found');
    }
  }
});