import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { useCategories, useAppsByCategory } from "@/hooks/use-apps";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { data: categories = [] } = useCategories();
  const { data: appsInCategory = [], isLoading } = useAppsByCategory(id);
  const category = categories.find((c) => c.id === id);

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> 返回首页
      </Link>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
              cat.id === id
                ? "gradient-bg text-primary-foreground"
                : "glass text-muted-foreground hover:text-foreground"
            )}
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </div>

      {category && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-['Space_Grotesk']">
            {category.icon} {category.name}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{category.description}</p>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {appsInCategory.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}

      {!isLoading && appsInCategory.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          该分类暂无应用
        </div>
      )}
    </div>
  );
}
