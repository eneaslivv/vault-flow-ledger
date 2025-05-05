
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  CreditCard,
  DollarSign,
  ShoppingCart,
  ArrowRight,
  Box,
  User,
  Transfer,
} from "lucide-react";

// Mock data
const salesData = [
  { name: "Ene", total: 876 },
  { name: "Feb", total: 1200 },
  { name: "Mar", total: 1450 },
  { name: "Abr", total: 1350 },
  { name: "May", total: 1672 },
  { name: "Jun", total: 1580 },
  { name: "Jul", total: 1890 },
];

const stockData = [
  { name: "Alcohol", value: 540 },
  { name: "Energéticas", value: 350 },
  { name: "Aguas", value: 420 },
  { name: "Otros", value: 200 },
];

const Dashboard = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const colSpan = isMobile ? "col-span-12" : "col-span-3";

  return (
    <>
      <PageHeader 
        title="Dashboard VARES" 
        description="Vista general del sistema"
      />

      <div className="grid grid-cols-12 gap-4">
        <StatsCard
          title="Ventas Totales"
          value="$95,400"
          description="Este mes"
          trend={{ value: 12, positive: true }}
          icon={<DollarSign className="h-4 w-4" />}
          className={colSpan}
        />
        <StatsCard
          title="Usuarios Activos"
          value="2,851"
          description="Últimos 30 días"
          trend={{ value: 8, positive: true }}
          icon={<User className="h-4 w-4" />}
          className={colSpan}
        />
        <StatsCard
          title="Stock Total"
          value="4,320"
          description="Productos en inventario"
          trend={{ value: 3, positive: false }}
          icon={<Box className="h-4 w-4" />}
          className={colSpan}
        />
        <StatsCard
          title="Transferencias"
          value="235"
          description="Últimos 30 días"
          trend={{ value: 16, positive: true }}
          icon={<Transfer className="h-4 w-4" />}
          className={colSpan}
        />

        <Card className="col-span-12 md:col-span-8">
          <CardHeader>
            <CardTitle>Resumen de Ingresos</CardTitle>
            <CardDescription>Detalle de ingresos por tipo de moneda</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="money">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="money">Efectivo</TabsTrigger>
                <TabsTrigger value="nfc">NFC</TabsTrigger>
                <TabsTrigger value="transfer">Transferencias</TabsTrigger>
                <TabsTrigger value="tokens">PR Tokens</TabsTrigger>
              </TabsList>
              <TabsContent value="money" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Line dataKey="total" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="nfc" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData.map(d => ({ ...d, total: d.total * 0.65 }))}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Line dataKey="total" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="transfer" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData.map(d => ({ ...d, total: d.total * 0.45 }))}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Line dataKey="total" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="tokens" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData.map(d => ({ ...d, total: d.total * 0.25 }))}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Line dataKey="total" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-4">
          <CardHeader>
            <CardTitle>Distribución de Stock</CardTitle>
            <CardDescription>Por categoría de producto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas actividades en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-vares-100 p-2">
                  <Box className="h-4 w-4 text-vares-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Transferencia de stock</p>
                  <p className="text-xs text-muted-foreground">50 unidades de agua transferidas de Bar Central a El Alamo</p>
                </div>
                <div className="text-sm text-muted-foreground">Hace 2h</div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-vares-100 p-2">
                  <DollarSign className="h-4 w-4 text-vares-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Ingreso sin retiro</p>
                  <p className="text-xs text-muted-foreground">3 productos comprados pero no retirados en Bar Norte</p>
                </div>
                <div className="text-sm text-muted-foreground">Hace 4h</div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-vares-100 p-2">
                  <User className="h-4 w-4 text-vares-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Cortesía entregada</p>
                  <p className="text-xs text-muted-foreground">PR Juan otorgó 2 cortesías para mesa VIP en El Alamo</p>
                </div>
                <div className="text-sm text-muted-foreground">Hace 5h</div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-vares-100 p-2">
                  <CreditCard className="h-4 w-4 text-vares-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Saldo cargado</p>
                  <p className="text-xs text-muted-foreground">$3,500 de saldo NFC cargados para usuario ID 456</p>
                </div>
                <div className="text-sm text-muted-foreground">Hace 6h</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
