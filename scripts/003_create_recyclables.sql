-- Create recyclables table
create table if not exists public.recyclables (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  quantity integer not null,
  weight decimal(10, 2),
  tokens_earned decimal(10, 2) not null,
  location text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.recyclables enable row level security;

-- RLS Policies for recyclables
create policy "Users can view their own recyclables"
  on public.recyclables for select
  using (auth.uid() = user_id);

create policy "Users can insert their own recyclables"
  on public.recyclables for insert
  with check (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists recyclables_user_id_idx on public.recyclables(user_id);
create index if not exists recyclables_created_at_idx on public.recyclables(created_at desc);
