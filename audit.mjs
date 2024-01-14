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
exec('npm audit --json', (error, stdout, stderr) => {
  if (error) {
    console.error(`NPM Audit Failure: ${error}`);
    console.error('Audit Error Output:', stderr);
    sendSlackNotification(`NPM Audit Failure: ${stderr}`);
    if (!test) process.exit(1);
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