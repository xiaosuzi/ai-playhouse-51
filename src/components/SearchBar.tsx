import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch?: () => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onSearch?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索AI应用..."
        className="pl-9 bg-secondary/50 border-border/50 focus:border-primary/50 h-9"
      />
    </form>
  );
}
