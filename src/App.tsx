
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
import Transfers from "./pages/Transfers";
import Balances from "./pages/Balances";
import Users from "./pages/Users";
import PR from "./pages/PR";
import Bars from "./pages/Bars";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/finances" element={<Finances />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/balances" element={<Balances />} />
            <Route path="/users" element={<Users />} />
            <Route path="/pr" element={<PR />} />
            <Route path="/bars" element={<Bars />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
