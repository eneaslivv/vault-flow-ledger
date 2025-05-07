
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Finances from "./pages/Finances";
import Stock from "./pages/Stock";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Bars from "./pages/Bars";
import BarDetail from "./pages/BarDetail";
import Users from "./pages/Users";
import PR from "./pages/PR";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="finances" element={<Finances />} />
            <Route path="stock" element={<Stock />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<ProductDetail />} />
            <Route path="bars" element={<Bars />} />
            <Route path="bars/:barId" element={<BarDetail />} />
            <Route path="users" element={<Users />} />
            <Route path="pr" element={<PR />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
