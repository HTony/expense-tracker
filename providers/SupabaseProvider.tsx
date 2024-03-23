"use client";

import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type SupabaseContextProps = {
  supabase: SupabaseClient;
};

const SupabaseContext = createContext<SupabaseContextProps | null>(null);

type Props = {
  children: React.ReactNode;
};
const SupabaseProvider = ({ children }: Props) => {
  const [supabase] = useState<SupabaseClient>(createClient());
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(() => router.refresh());

    return () => data.subscription.unsubscribe();
  }, [router, supabase]);

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);

  if (!context) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};

export default SupabaseProvider;
