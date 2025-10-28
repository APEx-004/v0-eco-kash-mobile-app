-- Create notifications table
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  message text not null,
  type text not null check (type in ('deposit', 'transfer', 'donation', 'payment', 'reward', 'system')),
  read boolean default false,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.notifications enable row level security;

-- RLS Policies for notifications
create policy "Users can view their own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users can update their own notifications"
  on public.notifications for update
  using (auth.uid() = user_id);

create policy "Users can delete their own notifications"
  on public.notifications for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists notifications_user_id_idx on public.notifications(user_id);
create index if not exists notifications_created_at_idx on public.notifications(created_at desc);
