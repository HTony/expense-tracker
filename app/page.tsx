import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AuthForm from "@/app/auth/components/AuthForm";

export default async function AuthPage() {
  const supabase = createClient();

  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    redirect("/dashboard");
  }

  return <AuthForm />;
}
