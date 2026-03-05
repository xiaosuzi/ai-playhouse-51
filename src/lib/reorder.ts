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

  const ids = sorted.map((it) => it.id);
  const sortOrders = sorted.map((_, i) => i);

  const { error } = await supabase.rpc("batch_update_sort_order", {
    p_table: table,
    p_ids: ids,
    p_sort_orders: sortOrders,
  });

  if (error) return { error: error.message };
  return {};
}
