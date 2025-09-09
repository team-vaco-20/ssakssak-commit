import SideNav from "@/app/ui/layout/side-nav";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/auth-options";
import { ReportHistoryProvider } from "@/stores/report-history/report-history-provider";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session;

  return (
    <ReportHistoryProvider>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav isLoggedIn={isLoggedIn}></SideNav>
        </div>

        <main className="flex-grow md:overflow-y-auto md:px-12 md:pt-12">
          {children}
        </main>
      </div>
    </ReportHistoryProvider>
  );
}
