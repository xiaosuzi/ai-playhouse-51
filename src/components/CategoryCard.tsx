import { Link } from "react-router-dom";
import type { AppCategory } from "@/data/apps";

interface CategoryCardProps {
  category: AppCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/category/${category.id}`}
      className="glass rounded-xl p-5 hover:border-primary/30 transition-all duration-300 hover:glow-primary group block"
    >
      <div className="text-3xl mb-3">{category.icon}</div>
      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
        {category.name}
      </h3>
      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{category.description}</p>
      <p className="text-xs text-primary mt-2">{category.count} 个应用</p>
    </Link>
  );
}
