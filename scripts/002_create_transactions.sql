-- Create transactions table
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('deposit', 'transfer', 'donation', 'payment', 'reward')),
  amount decimal(10, 2) not null,
  description text not null,
  recipient text,
  status text default 'completed' check (status in ('pending', 'completed', 'failed')),
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.transactions enable row level security;

-- RLS Policies for transactions
create policy "Users can view their own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists transactions_user_id_idx on public.transactions(user_id);
create index if not exists transactions_created_at_idx on public.transactions(created_at desc);
