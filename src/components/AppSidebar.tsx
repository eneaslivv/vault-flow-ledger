
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { 
  ArrowRightLeft,
  BarChart,
  Briefcase,
  CreditCard,
  Database,
  DollarSign,
  Home,
  Settings,
  ShoppingCart,
  User,
  Users,
  ClipboardList,
  BookOpen,
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { title: "Inicio", icon: Home, path: "/" },
  { title: "Pedidos", icon: ClipboardList, path: "/orders" },
  { title: "Finanzas & Saldos", icon: DollarSign, path: "/finances" },
  { title: "Stock & Reasignaciones", icon: Database, path: "/stock" },
  { title: "Carta & Productos", icon: BookOpen, path: "/products" },
  { title: "Barras & QRs", icon: QrCode, path: "/bars" },
];

const managementNavItems = [
  { title: "Roles & Usuarios", icon: User, path: "/users" },
  { title: "Reportes & Métricas", icon: BarChart, path: "/reports" },
  { title: "Configuración", icon: Settings, path: "/settings" },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-white">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
            <span className="font-bold text-lg">V</span>
          </div>
          <span className="font-semibold text-xl text-gray-800">VARES</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500">Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => cn(
                        "text-gray-600 hover:bg-blue-50 hover:text-blue-700",
                        isActive && "bg-blue-50 text-blue-700 font-medium"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500">Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => cn(
                        "text-gray-600 hover:bg-blue-50 hover:text-blue-700",
                        isActive && "bg-blue-50 text-blue-700 font-medium"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">admin@vares.com</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
