create table if not exists weight_entries (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users not null,
    weight decimal(4,1) not null,
    date date not null default current_date,
    note text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    
    constraint weight_entries_weight_check check (weight >= 20 and weight <= 300)
);

-- Create RLS policies
alter table weight_entries enable row level security;

create policy "Users can view their own weight entries"
    on weight_entries for select
    using (auth.uid() = user_id);

create policy "Users can insert their own weight entries"
    on weight_entries for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own weight entries"
    on weight_entries for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete their own weight entries"
    on weight_entries for delete
    using (auth.uid() = user_id);

-- Create index for faster queries
create index weight_entries_user_id_date_idx on weight_entries(user_id, date);
