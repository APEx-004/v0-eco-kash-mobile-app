import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    "https://mgzcvracvbsirjexdmbj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nemN2cmFjdmJzaXJqZXhkbWJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMzk0OTEsImV4cCI6MjA3NjYxNTQ5MX0.4LLNTkecDU12uaCQFFX29_crDqaG1u_HyQ5R9j9lCz0",
  )
}
