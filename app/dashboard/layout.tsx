import DashboardBanner from "./components/DashboardBanner";
import DesktopNav from "./components/DesktopNav";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();

  if (!data?.session) {
    redirect("/");
  }
  return (
    <main
      id="dashboard-main"
      className="h-screen w-screen flex flex-col md:flex-row"
    >
      <div className="hidden md:block w-3/12 h-full py-5 bg-gray-100">
        <DesktopNav />
      </div>
      <div className="sticky w-full md:hidden">
        <DashboardBanner />
      </div>
      <div className="w-full pb-20 md:w-9/12 md:pb-0">{children}</div>
      <div className="fixed bottom-0 h-20 w-full bg-green-500 md:hidden "></div>
    </main>
  );
}
