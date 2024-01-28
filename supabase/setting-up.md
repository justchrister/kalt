# Setting up a new instance
1. Enable the HTTP extension (databases->extensions->toggle http)
2. Disable confirm email (auth->providers->expand email)
3. Add redirect URL (localhost for dev and ka.lt for prod)
4. Add site URL (localhost for dev and ka.lt for prod)
5. Change email templates (see below)
6. Run types.sql
7. Run sys/*.sql
8. Run topics/*.sql
9. Run sub/*.sql 
10. Run services/*.sql
11. Run acl/*/*.sql
12. Create webhooks (see below)
11. [Enable SSL enforcement](https://supabase.com/docs/guides/platform/ssl-enforcement) 

## Encryption
1. Enable pgsodium `create extension pgsodium;`

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

Name: webhook_transactions_exchange_autoOrder
URL: https://ka.lt/api/exchange/autoOrder
Table: sub_transactions_exchange_autoOrder

Name: webhook_transactions_acl_stripe
URL: https://ka.lt/api/acl/stripe/webhooks/transactions
Table: sub_transactions_acl_stripe

Name: webhook_users_acl_stripe
URL: https://ka.lt/api/acl/stripe/webhooks/users
Table: sub_users_acl_stripe

Name: webhook_auth_users
URL: https://ka.lt/api/users/initialize
Table: auth.users

Name: webhook_auth_invites
URL: https://ka.lt/api/invites/initialize
Table: auth.users

Name: webhook_exchange_match
URL: https://ka.lt/api/exchange/match
Table: sub_exchange_match
