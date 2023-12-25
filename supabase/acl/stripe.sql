CREATE TABLE "acl_stripe" (
    "userId"          uuid    NOT NULL   PRIMARY KEY,
    "stripeUserId"    text,
    "stripeCardId"    text
);
ALTER TABLE "acl_stripe" ENABLE ROW LEVEL SECURITY;