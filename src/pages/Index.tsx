import { HeroBanner } from "@/components/HeroBanner";
import { CategoryCard } from "@/components/CategoryCard";
import { AppCard } from "@/components/AppCard";
import { categories, getFeaturedApps, apps } from "@/data/apps";

const Index = () => {
  const featured = getFeaturedApps();

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 space-y-10">
      <HeroBanner />

      {/* Categories */}
      <section>
        <h2 className="text-xl font-bold mb-4 font-['Space_Grotesk']">应用分类</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section>
        <h2 className="text-xl font-bold mb-4 font-['Space_Grotesk']">🔥 热门推荐</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </section>

      {/* All Apps */}
      <section>
        <h2 className="text-xl font-bold mb-4 font-['Space_Grotesk']">全部应用</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
