import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import Sidebar
from "@/components/dashboard/Sidebar";

import LogoutButton
from "@/components/auth/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex">
      <div className="flex flex-col">
        <Sidebar />
        <LogoutButton />
      </div>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}