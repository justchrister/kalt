<img src="https://ka.lt/images/github/intro-security-policy.svg" alt="" width="100%" height="auto">

## Overview
We are committed to maintaining the security of our software and protecting the privacy of our users. Since we store a lot of personal data, we have implemented a lot of different security measures in order to ensure none are leaked. 

Our commitment extends beyond mere compliance; it's about fostering a culture of security and privacy that permeates every aspect of our operations. Recognizing the dynamic nature of digital threats, we have established a multi-layered security strategy. This includes not only rigorous protocols and cutting-edge technology but also a proactive approach to potential vulnerabilities. Our comprehensive security measures are meticulously designed to protect our software and, more importantly, the privacy and integrity of our user data. In an era where digital information is both valuable and vulnerable, we strive to be a bastion of trust and reliability for our users, ensuring that their data is safeguarded with the highest standards of security.

## Zero trust model

At the core of our Zero Trust framework is the rigorous authentication and authorization of all users, devices, and network flows. We employ advanced identity verification methods and context-aware access controls that dynamically adapt to varying risk levels. This approach minimizes the attack surface and reduces the potential impact of insider threats. By implementing strict access controls and continuously monitoring network activity, we create a more resilient and responsive security posture that is crucial in defending against sophisticated cyber threats.

## Principle of least privilege

The principle of least priveledge is fundamental to our security architecture. It dictates that every module, user, and application is granted only the minimum levels of access — or permissions — needed to perform their functions. This principle is not just a guideline but an enforced practice in our system design and operations.

In practice, this means implementing stringent access controls and regularly reviewing and adjusting these permissions to align with the evolving roles and responsibilities within our organization. By limiting the access rights for any given resource to what is strictly necessary, we significantly reduce the risk of unauthorized access or accidental misuse of sensitive information. This approach not only tightens security but also enhances our system's overall performance by reducing the complexity and potential for error in our access structures. The Principle of Least Privilege is a critical component of our security strategy, reflecting our commitment to maintaining a secure and efficient operating environment.

## Secure storage
We use the Supabase SaaS offering to store all data. They are SOC2 Type 2 compliant, HIPAA compliant, and store all encrypted at rest with AES-256 and in transit via TLS.

For especially sensitive customer data, we apply an additional level of encryption, such as credit card information and know-your-customer data. The encryption keys are rotated at a 12 month interval. 

## Priveledged users (employees)

We maintain stringent protocols for managing privileged users — employees who are granted elevated access rights due to their role and responsibilities. Recognizing the sensitivity and potential risks associated with handling personal data, we ensure that all privileged users undergo a thorough verification process. This process is designed to assess and confirm their suitability and reliability in managing sensitive information.

It's important to note that only a select subset of these verified privileged users are granted direct access to personal data and the decryption keys. This selective access is governed by our strict internal policies and is continually monitored and audited to prevent any unauthorized or inappropriate access.

### Multi-factor authentication for all privileged users

We enforce multi-factor authentication for all privileged users without exception. Multi-factor authentication adds an additional layer of security by requiring two or more independent credentials for user authentication. This means that even if one credential is compromised, unauthorized access is still prevented by the additional authentication requirements. Implementing multi-factor authentication is a crucial part of our security strategy, significantly enhancing the protection against unauthorized access and ensuring the security of our users' data.


### Background check of priveledged users
All priveledged users are background checked, following a very standard process of; 
1. No criminal record
2. Close familiy and friends reference interviews
3. No financial problems
4. No connection to high-risk nation states (China, Iran, Russia)


### Fresh install policy
Every 12 months all computers are re-installed and re-configured, to ensure they have applied the latest security measures.

### Password policy

All priveledged users must use a different password for all users across all websites, both personal and Kalt based ones. 

#### Proton pass

To ensure you never have to store these password insecurily we use proton pass to simplify the application of unique passwords across services.

#### Have-i-been-pwned
All e-mails connected to priveledged users, both personal and Kalt, has to be registered at have i been pwned to get notified of potential password leaks. 

[Have i been pwned FAQ ↗](https://haveibeenpwned.com/FAQs)

### E-mail obfuscation
For solutions like our e-mail service, cloudflare account and other critical solutions, we use e-mail obfuscation to ensure even if there is a leak, it will be harder to see that the account is linked to Kalt. Giving us an additional grace period to ensure we are compromised. 

#### Proton pass

Proton Pass is more than a tool to securely save passwords and automate logging in. It's also an identity manager that generates unique email aliases, preventing your true email address from being used to track you, exposed in data breaches, or targeted for spam.

### Turn off devices when travelling
When travelling, no matter where, turn off the computer entirely and disable any network connectivity. There has been numerous attempts at stealing data at security checkpoints at airports and other border crossings. 

To ensure no dataleaks at border crossings: 
1. Disable wifi
2. Disable bluetooth
3. Turn all devices off

### Computer security hardening measures on priveledged users
All computers used by priveledged users are hardened to ensure they are never compromised, currently this process has only been applied to Macbooks, and follow these simple steps:

### VPN on all priveledged users computers
All priveleded users has to have Proton VPN turned on at all times, using the secure core and kill switch functionality. No matter if they are on their home network or at a café.

Proton VPN establishes an encrypted tunnel between your computer and any one of our VPN servers around the world. This encrypted tunnel is secured with AES-256, and will successfully prevent an adversary who has control over the internet connection that you are using from being able to snoop on your traffic. This means you can safely browse even on public internet networks.

[Learn more about Proton VPN’s threat model ↗](https://protonvpn.com/blog/threat-model/)

#### Displaying file extension names
1. Open terminal
2. Run `defaults write NSGlobalDomain AppleShowAllExtensions -bool true;`

#### Enable encryption
1.  → System settings → Privacy & Security → file vault
2. Enable file vault

#### Disable spotlight suggestions 
1.  → System settings → Spotlight

#### Lock mac after 1 minute of inactivity
1.  → System settings → Privacy & Security
2. Select advanced (at bottom) 
3. Select `Log out automatically after inactivity`
4. Adjust to 1 minute

#### Require admin account to change settings
1.  → System settings → Privacy & Security → General tab → Advanced
2. Select `Require an administrator password to access system-wide preferences`

#### Enable firewall
1.  → System settings → Privacy & Security → Firewall tab
2. Select `Turn On Firewall`
3. Select `Then select ‘Firewall Options…`
4. Ensure these three tick boxes are toggled:
5. Automatically allow built-in software to receive incoming connection: `[ OFF ]`
6. Automatically allow downloaded signed software to receive incoming connections: `[ OFF ]`
7. Enable stealth mode: `[ ON ]`

#### Verify that you are on the latest Mac OS
1.  → System settings → General
3. Select software update
2. Check that you are on the latest version of macOS

#### Remove DNS providers
Manually configuring your device’s global DNS settings to use a third-party DNS service, such as Google Public DNS, Cloudflare, or OpenNIC, increases the chance of something going wrong, as it is possible the custom settings will override [Proton's DNS leak prevention measures ↗](https://protonvpn.com/support/dns-leaks-privacy/). 


#### Disable automatically joining networks
1.  → System settings → Network
2. Toggle ask to join networks `[ OFF ]`
2. Toggle ask to join hotspots `[ OFF ]`

## Web application firewall
As our first line of defence, we have added a web application firewall from Cloudflare, it helps protect against common attack patterns and strategies. 

**Global threat intelligence** through Cloudflare's global network, which processes trillions of requests daily. This massive data pool sharpens our threat detection capabilities, ensuring we're equipped to counter emerging cyber threats efficiently.

**Machine learning** adds powerful rulesets that stop threats including newly discovered "zero days", as well as bypasses and attack variations. With custom rules you can configure our web application firewall to protect against any threat.

1. Cloudflare managed rules offer advanced zero-day vulnerability protections.
2. Core OWASP rules block familiar “Top 10” attack techniques.
3. Custom rulesets deliver tailored protections to block any threat.
4. WAF Machine Learning complements WAF rulesets by detecting bypasses and attack variations of RCE, XSS and SQLi attacks.
5. Exposed credential checks monitor and block use of stolen/exposed credentials for account takeover. 
6. Sensitive data detection alerts on responses containing sensitive data.
7. Advanced rate limiting prevents abuse, DDoS, brute force attempts along with API-centric controls.
8. Flexible response options allow for blocking, logging, rate limiting or challenging.

<br>

**We chose Cloudflare since:**
- Cloudflare was named a 2022 Gartner® Peer Insights™ Customers’ Choice for web application firewalls.
- Cloudflare is a leader in the Forrester Wave™: Web Application Firewalls, Q3 2022 report.
- Cloudflare is a leader in the 2022 Gartner® Magic Quadrant™ for Web Application and API Protection (WAAP)
- Cloudflare has an advanced toolset at our disposal to handle all sorts of attacks.

## Encryption

We implement state-of-the-art encryption methods to safeguard our customers' payment information and personal data. Our system employs `AES-256-CBC` encryption, recognized for its robustness and security.

On the server side, we utilize the `Node.js` `crypto` module for both encryption and decryption. During encryption, a unique initialization vector is generated for each session, enhancing security by adding an additional layer of randomness. The text is encrypted using the secret key and initialization vector, resulting in a secure, non-readable format. Conversely, for decryption, the encrypted text is processed alongside the initialization vector and the secret key to retrieve the original data.

For client-side operations, we leverage the `Web Crypto API`, ensuring that the encryption and decryption processes align with the security standards of modern web browsers. This includes the conversion of hex string keys to formats compatible with the `Web Crypto API` and the use of `window.crypto` for generating IVs and processing encryption and decryption tasks.

By implementing these rigorous encryption standards, both server-side and client-side, we ensure the highest level of security for sensitive data, reflecting our commitment to protecting our customers' privacy and security.

## DevOps

### NPM Dependencies
To ensure we have no security issues in the app, we audit all NPM dependencies pre-build using the built in npm audit feature, the results are then posted to a Slack channel that is monitored 24/7. 

### API security
All PostgREST API requests to our Supabase instance is direected through our WAF. All these API's are authenticated using [Supabase Auth](https://supabase.com/docs/guides/auth), no shared "service accounts" or similar is in use. 

#### Webhooks
All webhooks should use the authorization header with a 4096 bit `WEBHOOK_SECRET` key. 

#### Cron jobs
The Vercel CRON jobs should be secured with a 4096 bit `CRON_SECRET` key. 

### Row-level security
All tables has to have [RLS policies ↗](https://supabase.com/docs/guides/auth/row-level-security) applied to ensure users can only access their own data make the requests

### Environment variables and secret management

#### Dev
Variables should always be stored in .env files and should never be included in commits.

##### Sharing secrets
Secrets should only be shared using Proton Pass, never:
1. In Slack
2. In Notion
3. In code.
4. Anywhere but Proton Pass 

[Read more about password sharing with end-to-end encryption ↗](https://proton.me/pass/password-sharing)

Additionally Supabase has [partnered with GitHub ↗](https://github.blog/changelog/2022-03-28-supabase-is-now-a-github-secret-scanning-partner/) to ensure no secrets are leaked through GitHubs [secret scanning programme ↗](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning).


#### Test/prod
All environment variables and secrets should be stored in [Vercels Environment Variables ↗](https://vercel.com/docs/projects/environment-variables)


## Bug bounty program
To encourage the identification and reporting of security vulnerabilities, we have established a Bug Bounty Program. If you discover a security vulnerability in our code, we invite you to report it through our Bug Bounty Program. By responsibly disclosing security issues, you help us improve our software and keep our users safe.

### Guidelines
To participate in our Bug Bounty Program, please follow these guidelines:

- **Responsible disclosure:** Report vulnerabilities privately and give us a reasonable amount of time to address the issue before disclosing it publicly.
- **No unauthorized access:** Do not exploit the vulnerability beyond what is necessary to demonstrate its existence.
- **No data exposure:** Do not access, modify, or leak any sensitive user data or confidential information.
- **No disruption:** Do not use the vulnerability to disrupt, degrade, or damage our services, systems, or networks.

### Reporting
To report a security vulnerability, please email us at sec@ka.lt with the following information:

- A clear and concise description of the vulnerability
- Steps to reproduce the issue, including any relevant tools, scripts, or code
- Your name and contact information, if you would like to be acknowledged for your contribution

### Rewards
We offer financial rewards for qualifying vulnerability reports. The reward amount depends on the severity of the issue and the quality of the report. Our security team will evaluate each submission and determine the reward based on factors such as impact, exploitability, and report clarity.

Please note that we reserve the right to decide whether a vulnerability qualifies for a reward and to modify the Bug Bounty Program at any time.

We appreciate your efforts in helping us maintain the security of our software and protecting our users. Your responsible disclosure and participation in our Bug Bounty Program make a significant difference in ensuring the safety of our community.

## Penetration testing

We proactively safeguard our systems and data through rigorous and regular penetration testing, conducted quarterly by reputable third-party security firms. This vital aspect of our cybersecurity strategy involves simulating cyber attacks on our systems to identify vulnerabilities and assess the effectiveness of our current security measures. These tests are meticulously planned and executed to mimic a range of attack scenarios, from surface-level web application attacks to deep, system-level intrusions. By engaging external experts, we benefit from an unbiased perspective and specialized expertise, ensuring a comprehensive evaluation of our defenses. The findings from these penetration tests are thoroughly analyzed, and the insights gained are used to fortify our security posture. This practice not only helps us to stay ahead of evolving cyber threats but also demonstrates our commitment to continuous improvement and adherence to the highest standards of data security.

Do you want to pen test us? Go ahead. We appreciate if you let us know in advance, and especially if you have some insights to share: sec@ka.lt

## Incident response

The incident response plan is described in more detail in a seperate internal document, but the short version is: 

1. Triage the impact
2. Involve the right parties (external experts level 1)
3. Inform affected customers or partners
4. Contain
5. Resolve
6. Report

## Other documents of interest

- [Cloudflare data processing addendum (DPA) ↗](https://www.cloudflare.com/cloudflare-customer-dpa/)
- [What's New at Cloudflare ↗](https://www.cloudflare.com/whats-new/)
- [About Proton ↗](https://proton.me/about)
- [Security at Supabase ↗](https://supabase.com/security)