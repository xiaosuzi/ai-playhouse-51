import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import CategoriesPage from "./pages/CategoriesPage";
import AppDetail from "./pages/AppDetail";
import AppUse from "./pages/AppUse";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/app/:id" element={<AppDetail />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
          <Route path="/app/:id/use" element={<AppUse />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
