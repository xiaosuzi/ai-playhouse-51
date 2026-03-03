import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, Grid3X3, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBar } from "./SearchBar";
import { useState } from "react";

const navItems = [
  { path: "/", icon: Home, label: "首页" },
  { path: "/categories", icon: Grid3X3, label: "分类" },
  { path: "/search", icon: Search, label: "搜索" },
];

export function Layout() {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* PC Header */}
      <header className="hidden md:flex sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold gradient-text font-['Space_Grotesk']">AI Market</span>
          </Link>
          <nav className="flex items-center gap-6">
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="w-72">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 glass border-b border-border/50">
        <div className="flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold gradient-text font-['Space_Grotesk']">AI Market</span>
          </Link>
          <button onClick={() => setSearchOpen(!searchOpen)} className="text-muted-foreground">
            <Search className="h-5 w-5" />
          </button>
        </div>
        {searchOpen && (
          <div className="px-4 pb-3">
            <SearchBar onSearch={() => setSearchOpen(false)} />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pb-20 md:pb-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Tab */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === "/" 
              ? location.pathname === "/" 
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 text-xs transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
