CREATE TABLE acl_stripe_card_ids (
    card_id          uuid        NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    stripe_card_id   text
);
ALTER TABLE acl_stripe_card_ids ENABLE ROW LEVEL SECURITY;