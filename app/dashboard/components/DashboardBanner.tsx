import LogoutButton from "@/components/LogoutButton";

export default function DashboardBanner() {
  return (
    <div className="flex justify-between items-center h-20">
      <div className="flex justify-center items-center gap-4">
        <div className="h-12 w-12 border border-solid border-slate-600 rounded-3xl flex justify-center items-center">
          T
        </div>
        <span className="text-xl text-black">User name</span>
      </div>
      <LogoutButton />
    </div>
  );
}
