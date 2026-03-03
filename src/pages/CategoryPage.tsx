import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { getAppsByCategory, getCategoryById, categories } from "@/data/apps";
import { cn } from "@/lib/utils";

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const category = id ? getCategoryById(id) : undefined;
  const appsInCategory = id ? getAppsByCategory(id) : [];

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> 返回首页
      </Link>

      {/* Category tabs */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {appsInCategory.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>

      {appsInCategory.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          该分类暂无应用
        </div>
      )}
    </div>
  );
}
