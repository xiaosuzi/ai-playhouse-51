import { useState } from "react";
import { useCategories } from "@/hooks/use-apps";
import type { CategoryRow } from "@/hooks/use-apps";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import SortControls from "@/components/SortControls";
import { reorderItems } from "@/lib/reorder";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type CategoryFormData = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

const emptyForm: CategoryFormData = {
  id: "",
  name: "",
  description: "",
  icon: "",
};

export default function CategoryManagement() {
  const { data: categories = [], isLoading } = useCategories();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<CategoryFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const openCreate = () => {
    setEditing(false);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (cat: CategoryRow) => {
    setEditing(true);
    setForm({ id: cat.id, name: cat.name, description: cat.description, icon: cat.icon });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.icon) {
      toast({ title: "请填写名称和图标", variant: "destructive" });
      return;
    }
    setSaving(true);

    const payload: Record<string, unknown> = {
      name: form.name,
      description: form.description,
      icon: form.icon,
    };

    let error;
    if (editing) {
      ({ error } = await supabase.from("categories").update(payload).eq("id", form.id));
    } else {
      ({ error } = await supabase.from("categories").insert(payload as any));
    }

    setSaving(false);
    if (error) {
      toast({ title: "保存失败", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: editing ? "更新成功" : "创建成功" });
    setDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("categories").delete().eq("id", deleteId);
    if (error) {
      toast({ title: "删除失败", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "删除成功" });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
    setDeleteId(null);
  };

  return (
    <>
      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>分类管理</CardTitle>
          <Button size="sm" className="gradient-bg" onClick={openCreate}>
            <Plus className="w-4 h-4 mr-1" />
            新增分类
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">加载中...</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>分类</TableHead>
                    <TableHead className="hidden md:table-cell">描述</TableHead>
                    <TableHead className="hidden md:table-cell">应用数</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{cat.icon}</span>
                          <p className="font-medium text-foreground">{cat.name}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {cat.description}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{cat.count}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(cat)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteId(cat.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "编辑分类" : "新增分类"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">名称 *</label>
              <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="分类名称" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">图标 (emoji) *</label>
              <Input value={form.icon} onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))} placeholder="📝" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">描述</label>
              <Input value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="分类描述" />
            </div>
            <Button className="w-full gradient-bg" onClick={handleSave} disabled={saving}>
              {saving ? "保存中..." : "保存"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>此操作不可撤销，确定要删除这个分类吗？</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>删除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
