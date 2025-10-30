-- Function to update wallet balance
CREATE OR REPLACE FUNCTION public.update_wallet_balance(
  p_user_id UUID,
  p_amount DECIMAL(10, 2)
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET wallet_balance = wallet_balance + p_amount,
      updated_at = NOW()
  WHERE id = p_user_id;
END;
$$;

-- Function to create transaction with balance update
CREATE OR REPLACE FUNCTION public.create_transaction(
  p_user_id UUID,
  p_type TEXT,
  p_amount DECIMAL(10, 2),
  p_description TEXT,
  p_recipient_id UUID DEFAULT NULL,
  p_recipient_name TEXT DEFAULT NULL,
  p_solana_signature TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_transaction_id UUID;
BEGIN
  -- Insert transaction
  INSERT INTO public.transactions (user_id, type, amount, description, recipient_id, recipient_name, solana_signature)
  VALUES (p_user_id, p_type, p_amount, p_description, p_recipient_id, p_recipient_name, p_solana_signature)
  RETURNING id INTO v_transaction_id;

  -- Update wallet balance based on transaction type
  IF p_type IN ('deposit', 'collection') THEN
    PERFORM public.update_wallet_balance(p_user_id, p_amount);
  ELSIF p_type IN ('withdrawal', 'transfer', 'payment', 'donation', 'bin_payment') THEN
    PERFORM public.update_wallet_balance(p_user_id, -p_amount);
  END IF;

  -- If transfer, update recipient balance
  IF p_type = 'transfer' AND p_recipient_id IS NOT NULL THEN
    PERFORM public.update_wallet_balance(p_recipient_id, p_amount);
  END IF;

  RETURN v_transaction_id;
END;
$$;
