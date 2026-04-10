import { signOut } from "@/auth";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/admin" });
      }}
    >
      <button
        type="submit"
        className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/60 transition hover:border-red-400/50 hover:text-red-300"
      >
        <LogOut className="h-3 w-3" />
        Sign out
      </button>
    </form>
  );
}
