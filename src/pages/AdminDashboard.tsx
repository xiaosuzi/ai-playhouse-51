import { useState } from "react";
import { useApps, useCategories } from "@/hooks/use-apps";
import type { AppRow, CategoryRow } from "@/hooks/use-apps";
import { supabase } from "@/integrations/supabase/client";
import { signOut } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, LogOut, LayoutDashboard } from "lucide-react";
import SortControls from "@/components/SortControls";
import { reorderItems } from "@/lib/reorder";
import CategoryManagement from "@/components/CategoryManagement";
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

type AppFormData = {
  id: string;
  name: string;
  description: string;
  long_description: string;
  icon: string;
  category: string;
  developer: string;
  version: string;
  size: string;
  use_type: string;
  use_url: string;
  featured: boolean;
  tags: string;
  rating: number;
  downloads: number;
};

const emptyForm: AppFormData = {
  id: "",
  name: "",
  description: "",
  long_description: "",
  icon: "",
  category: "",
  developer: "",
  version: "1.0.0",
  size: "0MB",
  use_type: "iframe",
  use_url: "",
  featured: false,
  tags: "",
  rating: 0,
  downloads: 0,
};

function appToForm(app: AppRow): AppFormData {
  return {
    ...app,
    tags: app.tags?.join(", ") ?? "",
  };
}

export default function AdminDashboard() {
  const { data: apps = [], isLoading } = useApps();
  const { data: categories = [] } = useCategories();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<AppFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const openCreate = () => {
    setEditing(false);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (app: AppRow) => {
    setEditing(true);
    setForm(appToForm(app));
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.category) {
      toast({ title: "请填写必填字段", variant: "destructive" });
      return;
    }
    setSaving(true);

    const payload: Record<string, unknown> = {
      name: form.name,
      description: form.description,
      long_description: form.long_description,
      icon: form.icon,
      category: form.category,
      developer: form.developer,
      version: form.version,
      size: form.size,
      use_type: form.use_type,
      use_url: form.use_url,
      featured: form.featured,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      rating: form.rating,
      downloads: form.downloads,
    };

    let error;
    if (editing) {
      ({ error } = await supabase.from("apps").update(payload).eq("id", form.id));
    } else {
      ({ error } = await supabase.from("apps").insert(payload as any));
    }

    setSaving(false);
    if (error) {
      toast({ title: "保存失败", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: editing ? "更新成功" : "创建成功" });
    setDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["apps"] });
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("apps").delete().eq("id", deleteId);
    if (error) {
      toast({ title: "删除失败", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "删除成功" });
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    }
    setDeleteId(null);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const updateField = <K extends keyof AppFormData>(key: K, value: AppFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              管理后台
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1" />
            退出
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{apps.length}</p>
              <p className="text-sm text-muted-foreground">应用总数</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{categories.length}</p>
              <p className="text-sm text-muted-foreground">分类数</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{apps.filter((a) => a.featured).length}</p>
              <p className="text-sm text-muted-foreground">推荐应用</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {apps.reduce((s, a) => s + a.downloads, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">总下载</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="apps" className="space-y-4">
          <TabsList>
            <TabsTrigger value="apps">应用管理</TabsTrigger>
            <TabsTrigger value="categories">分类管理</TabsTrigger>
          </TabsList>

          <TabsContent value="apps">
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>应用管理</CardTitle>
                <Button size="sm" className="gradient-bg" onClick={openCreate}>
                  <Plus className="w-4 h-4 mr-1" />
                  新增应用
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
                          <TableHead>应用</TableHead>
                          <TableHead className="hidden md:table-cell">分类</TableHead>
                          <TableHead className="hidden md:table-cell">评分</TableHead>
                          <TableHead className="hidden md:table-cell">推荐</TableHead>
                          <TableHead className="text-right">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {apps.map((app) => (
                          <TableRow key={app.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{app.icon}</span>
                                <div>
                                  <p className="font-medium text-foreground">{app.name}</p>
                                  <p className="text-xs text-muted-foreground line-clamp-1">{app.description}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge variant="secondary">{app.category}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{app.rating}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {app.featured && <Badge className="gradient-bg">推荐</Badge>}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button variant="ghost" size="icon" onClick={() => openEdit(app)}>
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => setDeleteId(app.id)}>
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
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManagement />
          </TabsContent>
        </Tabs>
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "编辑应用" : "新增应用"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">名称 *</label>
              <Input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="我的应用" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">简介</label>
              <Input value={form.description} onChange={(e) => updateField("description", e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">详细描述</label>
              <Textarea value={form.long_description} onChange={(e) => updateField("long_description", e.target.value)} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">图标 (emoji)</label>
                <Input value={form.icon} onChange={(e) => updateField("icon", e.target.value)} placeholder="🤖" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">分类 *</label>
                <Select value={form.category} onValueChange={(v) => updateField("category", v)}>
                  <SelectTrigger><SelectValue placeholder="选择分类" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">开发者</label>
                <Input value={form.developer} onChange={(e) => updateField("developer", e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">版本</label>
                <Input value={form.version} onChange={(e) => updateField("version", e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">大小</label>
                <Input value={form.size} onChange={(e) => updateField("size", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">使用方式</label>
                <Select value={form.use_type} onValueChange={(v) => updateField("use_type", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iframe">iframe 内嵌</SelectItem>
                    <SelectItem value="external">外部链接</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">使用链接</label>
                <Input value={form.use_url} onChange={(e) => updateField("use_url", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">评分</label>
                <Input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => updateField("rating", parseFloat(e.target.value) || 0)} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">下载数</label>
                <Input type="number" value={form.downloads} onChange={(e) => updateField("downloads", parseInt(e.target.value) || 0)} />
              </div>
              <div className="flex items-end gap-2 pb-1">
                <Switch checked={form.featured} onCheckedChange={(v) => updateField("featured", v)} />
                <label className="text-sm font-medium">推荐</label>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">标签 (逗号分隔)</label>
              <Input value={form.tags} onChange={(e) => updateField("tags", e.target.value)} placeholder="AI, 写作, 效率" />
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
            <AlertDialogDescription>此操作不可撤销，确定要删除这个应用吗？</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>删除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
