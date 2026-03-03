import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedApps } from "@/data/apps";

export function HeroBanner() {
  const featured = getFeaturedApps()[0];

  return (
    <div className="relative overflow-hidden rounded-2xl gradient-bg p-8 md:p-12">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-background rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
          <span className="text-sm font-medium text-primary-foreground/80">精选推荐</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-3 font-['Space_Grotesk']">
          探索AI应用的无限可能
        </h2>
        <p className="text-primary-foreground/70 text-sm md:text-base max-w-xl mb-6">
          发现最新、最强大的AI工具，从文本生成到图像创作，从数据分析到智能助手——一站式AI应用市场，助力你的工作与创造力。
        </p>
        {featured && (
          <Link to={`/app/${featured.id}`}>
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2">
              立即体验 {featured.name}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
