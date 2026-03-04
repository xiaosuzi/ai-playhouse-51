import { Navigate } from "react-router-dom";
import { useIsAdmin } from "@/hooks/use-auth";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useIsAdmin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-2">
        <p className="text-xl font-semibold text-foreground">权限不足</p>
        <p className="text-muted-foreground">您的账号没有管理员权限</p>
      </div>
    </div>
  );

  return <>{children}</>;
}
