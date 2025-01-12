-- Add new columns to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS fitness_goal TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS weekly_workout_days INTEGER;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_workout_time TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS fitness_level TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS health_conditions TEXT[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS target_weight DECIMAL;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS dietary_preferences TEXT[];
