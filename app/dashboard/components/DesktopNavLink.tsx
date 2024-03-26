"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export default function DesktopNavLink({ label, href, icon }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <div
      className={clsx("py-3 px-4 ml-2", {
        "border border-r-0 border-slate-500 rounded-l-xl shadow-[0_5px_0_0_rgba(25,25,35,0.3)] bg-white":
          pathname === href,
      })}
    >
      <Link href={href} className="flex items-center gap-4 w-3/5 mx-auto">
        {icon}
        <p>{label}</p>
      </Link>
    </div>
  );
}
