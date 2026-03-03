import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { useSearchApps } from "@/hooks/use-apps";
import { SearchBar } from "@/components/SearchBar";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { data: results = [], isLoading } = useSearchApps(query);

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> 返回首页
      </Link>

      <div className="max-w-md mb-6 md:hidden">
        <SearchBar />
      </div>

      {query && (
        <h1 className="text-xl font-bold mb-6 font-['Space_Grotesk']">
          搜索"{query}"的结果 ({results.length})
        </h1>
      )}

      {!query && (
        <div className="text-center py-20 text-muted-foreground">
          <SearchX className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>输入关键词搜索AI应用</p>
        </div>
      )}

      {query && !isLoading && results.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <SearchX className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>未找到相关应用，换个关键词试试</p>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}
