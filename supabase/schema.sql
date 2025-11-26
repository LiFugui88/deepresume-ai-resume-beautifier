
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

-- Create a table for app configuration (Admin only)
create table app_config (
  key text primary key,
  value text,
  description text
);

alter table app_config enable row level security;

create policy "Admins can view config." on app_config
  for select using (exists (select 1 from profiles where id = auth.uid() and is_admin = true));

create policy "Admins can update config." on app_config
  for update using (exists (select 1 from profiles where id = auth.uid() and is_admin = true));

create policy "Admins can insert config." on app_config
  for insert with check (exists (select 1 from profiles where id = auth.uid() and is_admin = true));

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
