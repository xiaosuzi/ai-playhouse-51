
CREATE OR REPLACE FUNCTION public.batch_update_sort_order(
  p_table text,
  p_ids text[],
  p_sort_orders int[]
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_table = 'apps' THEN
    UPDATE public.apps
    SET sort_order = data.new_order
    FROM unnest(p_ids, p_sort_orders) AS data(item_id, new_order)
    WHERE apps.id = data.item_id;
  ELSIF p_table = 'categories' THEN
    UPDATE public.categories
    SET sort_order = data.new_order
    FROM unnest(p_ids, p_sort_orders) AS data(item_id, new_order)
    WHERE categories.id = data.item_id;
  ELSE
    RAISE EXCEPTION 'Invalid table: %', p_table;
  END IF;
END;
$$;
