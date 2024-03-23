import LogoutButton from "@/components/LogoutButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = createClient();

  const { data } = await supabase.auth.getSession();

  if (!data?.session) {
    redirect("/");
  }

  return (
    <div>
      <LogoutButton />
      <pre>{JSON.stringify(data.session, null, 2)}</pre>
    </div>
  );
}
