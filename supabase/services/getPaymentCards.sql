--- create the table, with default values
CREATE TABLE "getPaymentCards" (
  "userId"            uuid        NOT NULL, 
  "cardId"            uuid        NOT NULL  DEFAULT uuid_generate_v4(),
  "lastFourDigits"    CHAR(4),
  "year"              CHAR(2),
  "month"             CHAR(2),
  "status"            text,
  "default"           boolean,
  "number"            CHAR(16),
  "cvc"               CHAR(3),
  PRIMARY KEY (userId, card_id)
);


ALTER TABLE "getPaymentCards" ENABLE ROW LEVEL SECURITY;


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = '"getPaymentCards"'
      AND policyname = 'SELF — Select'
  ) THEN
    CREATE POLICY "SELF — Select" ON public."getPaymentCards"
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (auth.uid() = "userId");
  END IF;
END
$$;

CREATE OR REPLACE FUNCTION set_default_card()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW."default" THEN
        UPDATE "getPaymentCards"
        SET "default" = false
        WHERE userId = NEW.userId AND card_id <> NEW.card_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_default_card_trigger
BEFORE INSERT OR UPDATE OF "default" ON "getPaymentCards"
FOR EACH ROW
EXECUTE FUNCTION set_default_card();