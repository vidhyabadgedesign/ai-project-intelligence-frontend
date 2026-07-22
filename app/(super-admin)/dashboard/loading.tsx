import { LoadingState } from "@/components/ui/loading-state";

export default function DashboardLoading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <LoadingState label="Loading dashboard…" />
    </div>
  );
}
