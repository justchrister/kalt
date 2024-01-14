const exec = require('child_process').exec;
const fetch = require('node-fetch'); // Ensure this is installed

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

const sendSlackNotification = async (message) => {
  try {
    await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message }),
    });
  } catch (error) {
    console.error(`Error sending Slack notification: ${error}`);
  }
};

exec('npm audit --json', (error, stdout) => {
  if (error) {
    console.error(`NPM Audit Failure: ${error}`);
   // sendSlackNotification(`NPM Audit Failure: ${error}`);
    process.exit(1); // Exit with a failure code
  } else {
    const auditResults = JSON.parse(stdout);
    if (auditResults.metadata.vulnerabilities.total > 0) {
      // Customize your message based on auditResults
      const message = `NPM Audit: ${auditResults.metadata.vulnerabilities.total} vulnerabilities found.`;
     // sendSlackNotification(message);
    } else {
      console.log('NPM Audit Success: No issues found');
     // sendSlackNotification('NPM Audit Success: No issues found');
    }
  }
});