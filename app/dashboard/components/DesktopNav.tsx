import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import DesktopNavLink from "@/app/dashboard/components/DesktopNavLink";

const links = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
];

export default function DesktopNav() {
  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-black text-2xl text-center pb-5">
        Expense Tracker App
      </h1>
      <div className="flex-grow flex flex-col gap-3 pt-5">
        {links.map((link) => (
          <DesktopNavLink
            key={link.name}
            label={link.name}
            href={link.href}
            icon={link.icon}
          />
        ))}
      </div>
      <div className="w-6/12 mx-auto flex justify-center">
        <LogoutButton />
      </div>
    </div>
  );
}
