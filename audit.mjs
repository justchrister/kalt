import { config } from 'dotenv';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';
import { Resend } from 'resend';

config();
const exec = promisify(execCallback);
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

const test = true; // Set to false in production

const runAudit = async () => {
  try {
    const { stdout } = await exec('npm audit --json');
    const auditResults = JSON.parse(stdout);
    if (auditResults.metadata.vulnerabilities.total > 0 || test) {
      const message = `NPM Audit: ${test ? '1' : auditResults.metadata.vulnerabilities.total} vulnerability found.`;
      await sendSlackNotification(message);
      process.exit(1);
    } else {
      console.log('NPM Audit Success: No issues found');
    }
  } catch (error) {
    console.error(`NPM Audit Failure: ${error}`);
    await sendSlackNotification(`NPM Audit Failure: ${error}`);
    process.exit(1);
  }
};


runAudit();