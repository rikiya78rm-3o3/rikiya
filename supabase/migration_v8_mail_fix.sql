-- 1. Add participation_id to mail_jobs with CASCADE delete
ALTER TABLE public.mail_jobs 
ADD COLUMN participation_id uuid REFERENCES public.participations(id) ON DELETE CASCADE;

-- 2. Add smtp_from_name to tenants
ALTER TABLE public.tenants 
ADD COLUMN smtp_from_name text;

-- 3. Add index for performance on mail_jobs.participation_id
CREATE INDEX idx_mail_jobs_participation_id ON public.mail_jobs(participation_id);
