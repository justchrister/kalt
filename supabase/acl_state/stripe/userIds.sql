CREATE TABLE acl_stripe_user_ids (
    user_id          uuid        NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    stripe_user_id   text
);
ALTER TABLE acl_stripe_user_ids ENABLE ROW LEVEL SECURITY;