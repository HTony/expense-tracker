"use client";

import { useSupabase } from "@/providers/SupabaseProvider";
import { useCallback } from "react";

const LoginWithGithub = () => {
  const { supabase } = useSupabase();
  const loginWithGithub = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  }, [supabase]);

  return (
    <button
      className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-slate-800"
      onClick={loginWithGithub}
    >
      Continue with GitHub
    </button>
  );
};

export default LoginWithGithub;
