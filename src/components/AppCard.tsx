import { Link } from "react-router-dom";
import { Star, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { AppRow } from "@/hooks/use-apps";
import { formatDownloads } from "@/hooks/use-apps";

interface AppCardProps {
  app: AppRow;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Link
      to={`/app/${app.id}`}
      className="group glass rounded-xl p-4 hover:border-primary/30 transition-all duration-300 hover:glow-primary block"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0 w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
          {app.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {app.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{app.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-xs text-amber-400">
              <Star className="h-3 w-3 fill-current" />
              <span>{app.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Download className="h-3 w-3" />
              <span>{formatDownloads(app.downloads)}</span>
            </div>
          </div>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {app.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
