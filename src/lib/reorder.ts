import { supabase } from "@/integrations/supabase/client";

type SortableItem = { id: string; sort_order: number };

export async function reorderItems(
  table: "apps" | "categories",
  items: SortableItem[],
  index: number,
  direction: "up" | "down" | "top" | "bottom"
): Promise<{ error?: string }> {
  const sorted = [...items];
  const [item] = sorted.splice(index, 1);

  let newIndex: number;
  switch (direction) {
    case "up":
      newIndex = index - 1;
      break;
    case "down":
      newIndex = index + 1;
      break;
    case "top":
      newIndex = 0;
      break;
    case "bottom":
      newIndex = sorted.length;
      break;
  }

  sorted.splice(newIndex, 0, item);

  // Batch update sort_order for affected items
  const updates = sorted.map((it, i) => ({ id: it.id, sort_order: i }));

  for (const u of updates) {
    const { error } = await supabase
      .from(table)
      .update({ sort_order: u.sort_order } as any)
      .eq("id", u.id);
    if (error) return { error: error.message };
  }

  return {};
}
