import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Download, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAppById, formatDownloads } from "@/data/apps";

export default function AppDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const app = id ? getAppById(id) : undefined;

  if (!app) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">应用未找到</p>
        <Link to="/" className="text-primary text-sm mt-2 inline-block">返回首页</Link>
      </div>
    );
  }

  const handleUse = () => {
    if (app.useType === 'external') {
      window.open(app.useUrl, '_blank');
    } else {
      navigate(`/app/${app.id}/use`);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> 返回
      </Link>

      {/* App Header */}
      <div className="glass rounded-2xl p-6 md:p-8 mb-6">
        <div className="flex items-start gap-5">
          <div className="text-5xl w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0">
            {app.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk']">{app.name}</h1>
            <p className="text-muted-foreground text-sm mt-1">{app.developer}</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-semibold">{app.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Download className="h-4 w-4" />
                <span>{formatDownloads(app.downloads)} 下载</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6">
          <Button onClick={handleUse} className="flex-1 gradient-bg text-primary-foreground gap-2 hover:opacity-90">
            {app.useType === 'external' ? <ExternalLink className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            在线使用
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Download className="h-4 w-4" />
            下载
          </Button>
        </div>
      </div>

      {/* Description */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h2 className="font-semibold mb-3 font-['Space_Grotesk']">应用介绍</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{app.longDescription}</p>
        <div className="flex gap-2 mt-4 flex-wrap">
          {app.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="glass rounded-2xl p-6">
        <h2 className="font-semibold mb-3 font-['Space_Grotesk']">应用信息</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            { label: '版本', value: app.version },
            { label: '大小', value: app.size },
            { label: '开发者', value: app.developer },
            { label: '使用方式', value: app.useType === 'iframe' ? '在线内嵌' : '外链跳转' },
          ].map((info) => (
            <div key={info.label}>
              <p className="text-muted-foreground text-xs">{info.label}</p>
              <p className="font-medium mt-1">{info.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
