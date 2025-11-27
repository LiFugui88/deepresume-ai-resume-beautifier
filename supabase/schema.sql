
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  is_admin boolean default false,
  subscription_status text default 'free', -- 'free', 'pro'
  subscription_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for resumes
create table resumes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text,
  content jsonb, -- Stores the parsed resume data
  style text, -- 'rio', 'tokyo', etc.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table resumes enable row level security;

create policy "Users can view own resumes." on resumes
  for select using (auth.uid() = user_id);

create policy "Users can insert own resumes." on resumes
  for insert with check (auth.uid() = user_id);

create policy "Users can update own resumes." on resumes
  for update using (auth.uid() = user_id);

create policy "Users can delete own resumes." on resumes
  for delete using (auth.uid() = user_id);

-- Create a table for analytics (tracks anonymous usage)
create table analytics (
  id uuid default uuid_generate_v4() primary key,
  event_type text not null, -- 'page_view', 'resume_generate', 'pdf_download'
  event_date date default current_date not null,
  template text, -- for resume_generate events
  is_logged_in boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for faster date-based queries
create index analytics_event_date_idx on analytics(event_date);
create index analytics_event_type_idx on analytics(event_type);

alter table analytics enable row level security;

-- Anyone can insert analytics (for tracking anonymous users)
create policy "Anyone can insert analytics." on analytics
  for insert with check (true);

-- Only admins can view analytics
create policy "Admins can view analytics." on analytics
  for select using (exists (select 1 from profiles where id = auth.uid() and is_admin = true));

-- Create a table for payment orders
create table payment_orders (
  id uuid default uuid_generate_v4() primary key,
  order_id text unique not null, -- PayPal order ID
  user_id uuid references auth.users,
  email text,
  plan text not null, -- 'pro_monthly', 'pro_yearly'
  amount text not null,
  currency text default 'USD',
  status text default 'CREATED', -- 'CREATED', 'APPROVED', 'COMPLETED', 'DENIED', 'REFUNDED'
  provider text default 'paypal',
  payer_email text,
  payer_id text,
  capture_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for faster queries
create index payment_orders_order_id_idx on payment_orders(order_id);
create index payment_orders_user_id_idx on payment_orders(user_id);
create index payment_orders_status_idx on payment_orders(status);

alter table payment_orders enable row level security;

-- Users can view their own orders
create policy "Users can view own orders." on payment_orders
  for select using (auth.uid() = user_id);

-- Only service role can insert/update (via webhook)
create policy "Service role can insert orders." on payment_orders
  for insert with check (true);

create policy "Service role can update orders." on payment_orders
  for update using (true);

-- Admins can view all orders
create policy "Admins can view all orders." on payment_orders
  for select using (exists (select 1 from profiles where id = auth.uid() and is_admin = true));

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
