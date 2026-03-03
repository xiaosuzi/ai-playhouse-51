import { Grid3X3 } from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { useCategories } from "@/hooks/use-apps";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesPage() {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Grid3X3 className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold font-['Space_Grotesk']">全部分类</h1>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      )}
    </div>
  );
}
