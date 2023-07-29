CREATE TABLE "acl_stripe_userIds" (
    "userId"          uuid        NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "stripeUserId"   text
);
ALTER TABLE "acl_stripe_userIds" ENABLE ROW LEVEL SECURITY;