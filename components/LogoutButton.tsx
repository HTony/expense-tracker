"use client";

import { useSupabase } from "@/providers/SupabaseProvider";

const LogoutButton = () => {
  const { supabase } = useSupabase();

  return (
    <button
      className="bg-black text-white px-4 py-2 rounded-lg"
      onClick={async () => {
        await supabase.auth.signOut();
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
