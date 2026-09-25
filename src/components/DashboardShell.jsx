import Sidebar from "./Sidebar";
import BottomTabBar from "./BottomTabBar";

export default function DashboardShell({ children }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-soft">
      <Sidebar />
      <main className="h-full flex-1 overflow-y-auto px-4 pb-24 pt-6 sm:px-6 md:px-10 md:pb-8 md:pt-8">
        {children}
      </main>
      <BottomTabBar />
    </div>
  );
}