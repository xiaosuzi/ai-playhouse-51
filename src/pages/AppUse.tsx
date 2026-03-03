import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useApp } from "@/hooks/use-apps";

export default function AppUse() {
  const { id } = useParams<{ id: string }>();
  const { data: app, isLoading } = useApp(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-muted-foreground">
        加载中...
      </div>
    );
  }

  if (!app) {
    return (
      <div className="flex items-center justify-center h-screen text-muted-foreground">
        应用未找到
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)]">
      <div className="glass border-b border-border/50 px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <Link to={`/app/${app.id}`} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <span className="text-lg">{app.icon}</span>
        <span className="font-semibold truncate">{app.name}</span>
      </div>

      <div className="flex-1 bg-secondary/30">
        <iframe
          src={app.use_url}
          title={app.name}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}
