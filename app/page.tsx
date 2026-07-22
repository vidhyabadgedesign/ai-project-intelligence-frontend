import { redirect } from "next/navigation";

// Root route has no design of its own — it only routes into the Super Admin module
export default function RootPage() {
  redirect("/login");
}
