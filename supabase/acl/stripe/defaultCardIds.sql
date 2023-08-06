CREATE TABLE "acl_stripe_defaultCardIds" (
    "userId"          uuid    NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "stripeCardId"    text
);
ALTER TABLE "acl_stripe_defaultCardIds" ENABLE ROW LEVEL SECURITY;