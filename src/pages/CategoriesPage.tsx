import { Link } from "react-router-dom";
import { Grid3X3 } from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { categories } from "@/data/apps";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Grid3X3 className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold font-['Space_Grotesk']">全部分类</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}
