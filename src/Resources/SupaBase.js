import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database 
export const supabase = createClient("https://ugvgtfkmbdhlmpfirxxr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjQxMTcyMCwiZXhwIjoxOTQ3OTg3NzIwfQ.cKd-AXK9o_QzcXS4RB0kStqPt8zu5hWGQIHGH_qaocc")