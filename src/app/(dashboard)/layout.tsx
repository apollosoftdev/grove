import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { SiteFooter } from "@/components/layout/site-footer";
import { requireUser } from "@/lib/guards";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // First line of authorization: every route in this group requires a session.
  const session = await requireUser();
  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={session.user} />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col md:flex-row">
        <aside className="border-b border-black/10 md:w-56 md:shrink-0 md:border-b-0 md:border-r dark:border-white/10">
          <DashboardSidebar isAdmin={isAdmin} />
        </aside>
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>

      <SiteFooter />
    </div>
  );
}
