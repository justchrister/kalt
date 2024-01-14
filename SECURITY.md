<img src="https://ka.lt/media/intro-security-policy.svg" alt="" width="100%" height="auto">

## Overview
We are committed to maintaining the security of our software and protecting the privacy of our users. Since we store a lot of personal data, we have implemented a lot of different security measures in order to ensure none are leaked. 

Our commitment extends beyond mere compliance; it's about fostering a culture of security and privacy that permeates every aspect of our operations. Recognizing the dynamic nature of digital threats, we have established a multi-layered security strategy. This includes not only rigorous protocols and cutting-edge technology but also a proactive approach to potential vulnerabilities. Our comprehensive security measures are meticulously designed to protect our software and, more importantly, the privacy and integrity of our user data. In an era where digital information is both valuable and vulnerable, we strive to be a bastion of trust and reliability for our users, ensuring that their data is safeguarded with the highest standards of security.

## Zero trust model

At the core of our Zero Trust framework is the rigorous authentication and authorization of all users, devices, and network flows. We employ advanced identity verification methods and context-aware access controls that dynamically adapt to varying risk levels. This approach minimizes the attack surface and reduces the potential impact of insider threats. By implementing strict access controls and continuously monitoring network activity, we create a more resilient and responsive security posture that is crucial in defending against sophisticated cyber threats.

## Principle of least privilege

The principle of least priveledge is fundamental to our security architecture. It dictates that every module, user, and application is granted only the minimum levels of access — or permissions — needed to perform their functions. This principle is not just a guideline but an enforced practice in our system design and operations.

In practice, this means implementing stringent access controls and regularly reviewing and adjusting these permissions to align with the evolving roles and responsibilities within our organization. By limiting the access rights for any given resource to what is strictly necessary, we significantly reduce the risk of unauthorized access or accidental misuse of sensitive information. This approach not only tightens security but also enhances our system's overall performance by reducing the complexity and potential for error in our access structures. The Principle of Least Privilege is a critical component of our security strategy, reflecting our commitment to maintaining a secure and efficient operating environment.

### Priveledged users (employees)

we maintain stringent protocols for managing privileged users — employees who are granted elevated access rights due to their role and responsibilities. Recognizing the sensitivity and potential risks associated with handling personal data, we ensure that all privileged users undergo a thorough verification process. This process is designed to assess and confirm their suitability and reliability in managing sensitive information.

It's important to note that only a select subset of these verified privileged users are granted direct access to personal data and the decryption keys. This selective access is governed by our strict internal policies and is continually monitored and audited to prevent any unauthorized or inappropriate access.

We enforce multi-factor authentication for all privileged users without exception. Multi-factor authentication adds an additional layer of security by requiring two or more independent credentials for user authentication. This means that even if one credential is compromised, unauthorized access is still prevented by the additional authentication requirements. Implementing MFA is a crucial part of our security strategy, significantly enhancing the protection against unauthorized access and ensuring the security of our users' data.

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
