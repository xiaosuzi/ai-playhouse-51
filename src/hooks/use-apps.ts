import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type AppRow = Tables<"apps">;
export type CategoryRow = Tables<"categories">;

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return data as CategoryRow[];
    },
  });
}

export function useApps() {
  return useQuery({
    queryKey: ["apps"],
    queryFn: async () => {
      const { data, error } = await supabase.from("apps").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return data as AppRow[];
    },
  });
}

export function useFeaturedApps() {
  return useQuery({
    queryKey: ["apps", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("apps")
        .select("*")
        .eq("featured", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as AppRow[];
    },
  });
}

export function useAppsByCategory(categoryId: string | undefined) {
  return useQuery({
    queryKey: ["apps", "category", categoryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("apps")
        .select("*")
        .eq("category", categoryId!)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as AppRow[];
    },
    enabled: !!categoryId,
  });
}

export function useApp(id: string | undefined) {
  return useQuery({
    queryKey: ["apps", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("apps")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      return data as AppRow | null;
    },
    enabled: !!id,
  });
}

export function useSearchApps(query: string) {
  return useQuery({
    queryKey: ["apps", "search", query],
    queryFn: async () => {
      if (!query) return [];
      const q = `%${query}%`;
      const { data, error } = await supabase
        .from("apps")
        .select("*")
        .or(`name.ilike.${q},description.ilike.${q}`);
      if (error) throw error;
      return data as AppRow[];
    },
    enabled: !!query,
  });
}

export function formatDownloads(num: number): string {
  if (num >= 10000) return (num / 10000).toFixed(1) + "万";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
}
