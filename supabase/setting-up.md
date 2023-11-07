# Setting up a new instance
1. Enable the HTTP extension (databases->extensions->toggle http)
2. Disable confirm email (auth->providers->expand email)
3. Add redirect URL (localhost for dev, test.ka.lt for test, and ka.lt for prod)
4. Add site URL (localhost for dev, test.ka.lt for test, and ka.lt for prod)
5. Change email templates (see below)
6. Run types.sql
7. Run sys/*.sql
8. Run topics/*.sql
9. Run sub/*.sql 
10. Run services/*.sql
11. Run acl/*/*.sql
12. Create webhooks (see below)
11. [Enable SSL enforcement](https://supabase.com/docs/guides/platform/ssl-enforcement) 

## Email templates

### Confirm signup
Subject: Kalt — Welcome

```
<h2>Welcome to Kalt </h2><br>
<p>
<strong> Make money, make a difference </strong>
<br>
<br>
The next steps:<br>
<a href="{{ .ConfirmationURL }}/subscription">1. Set up a subscription</a><br>
<a href="{{ .ConfirmationURL }}/profile">2. Verify your identity</a><br>
<a href="{{ .ConfirmationURL }}/portfolio">3. Earn money</a><br>
<br><br>
——&nbsp;<br>
Sincerely, Christer<br>
CEO @ Kalt<br>
<br><br>
<a href="mailto:christer@ka.lt">christer@ka.lt</a>
</p>
```
### Invite user
Subject: Kalt — Invitation

```
<h2>You have been invited</h2>

<p>You have been invited to create a user on {{ .SiteURL }}. Follow this link to accept the invite:</p>
<p><a href="{{ .ConfirmationURL }}">Accept the invite</a></p>

```

### Magic link 
Subject: Kalt — Magic link

```
<h2>Magic Link</h2>

<p>Follow this link to login:</p>
<p><a href="{{ .ConfirmationURL }}">Log In</a></p>
```

### Change email address
Subject: Kalt — Change email

```
<h2>Confirm Change of Email</h2>

<p>Follow this link to confirm the update of your email from {{ .Email }} to {{ .NewEmail }}:</p>
<p><a href="{{ .ConfirmationURL }}">Change Email</a></p>
```

###  Reset Password
Subject: Kalt — Password reset

```
<h2>Forgot your password? No problem</h2>

<p>Simply follow this link to reset your password:</p>
<p><a href="{{ .ConfirmationURL }}">Reset password</a></p>
```


## Create the following webhooks:

Name: webhook_accountTransactions_autoVest
URL: https://ka.lt/api/autoVest/webhooks/accountTransactions
Table: sub_accountTransactions_autoVest

Name: webhook_accountTransactions_payments
URL: https://ka.lt/api/payments/webhooks/accountTransactions
Table: sub_accountTransactions_payments

Name: webhook_exchangeOrders_autoMatchOrders
URL: https://ka.lt/api/autoMatchOrders/webhooks/exchangeOrders
Table: sub_exchangeOrders_autoMatchOrders

Name: webhook_exchangeOrders_payRevenue
URL: https://ka.lt/api/payRevenue/webhooks/exchangeOrders
Table: sub_exchangeOrders_payRevenue

Name: webhook_paymentCards_acl_stripe
URL: https://ka.lt/api/acl/stripe/webhooks/paymentCards
Table: sub_paymentCards_acl_stripe

Name: webhook_paymentsPending_acl_stripe
URL: https://ka.lt/api/acl/stripe/webhooks/paymentsPending
Table: sub_paymentsPending_acl_stripe

Name: webhook_revenueTransactions_payRevenue
URL: https://ka.lt/api/payRevenue/webhooks/revenueTransactions
Table: sub_revenueTransactions_payRevenue

Name: webhook_users_acl_stripe
URL: https://ka.lt/api/acl/stripe/webhooks/users
Table: sub_users_acl_stripe

Name: webhook_payments_initiatePayments
URL: https://ka.lt/api/payments/initiatePayments
Table: payments

Name: webhook_autoMatchOrders_match
URL: https://ka.lt/api/autoMatchOrders/match
Table: autoMatchOrders
