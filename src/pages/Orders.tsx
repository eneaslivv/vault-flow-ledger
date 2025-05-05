
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/StatsCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  ClipboardCheck, 
  Clock, 
  History, 
  BarChart as ChartIcon, 
  LucideLayoutGrid 
} from "lucide-react";

// Mock data for real-time orders
const realTimeOrdersData = [
  { id: 1, table: "Mesa 5", products: "2x Gin Tonic, 1x Agua", bar: "Bar Central", status: "Preparando", assignedTo: "Mozo 1", time: "Hace 2 min" },
  { id: 2, table: "Mesa 12", products: "1x Cerveza, 2x Fernet", bar: "Bar Norte", status: "Listo", assignedTo: "Mozo 3", time: "Hace 5 min" },
  { id: 3, table: "VIP 2", products: "1x Champagne, 4x Energéticas", bar: "Bar VIP", status: "Entregado", assignedTo: "PR Juan", time: "Hace 10 min" },
  { id: 4, table: "Mesa 8", products: "3x Vodka Tonic", bar: "Bar Central", status: "Cancelado", assignedTo: "Mozo 2", time: "Hace 15 min" },
  { id: 5, table: "Barra", products: "2x Whisky", bar: "Bar Norte", status: "Preparando", assignedTo: "Barman", time: "Hace 1 min" },
];

// Mock data for order history
const orderHistoryData = [
  { id: 101, date: "2023-05-15", table: "Mesa 3", products: "4x Cerveza, 2x Nachos", bar: "Bar Central", total: "$5,200", status: "Completado" },
  { id: 102, date: "2023-05-15", table: "VIP 1", products: "1x Champagne", bar: "Bar VIP", total: "$12,500", status: "Completado" },
  { id: 103, date: "2023-05-14", table: "Mesa 7", products: "2x Gin Tonic, 1x Agua", bar: "Bar Norte", total: "$3,800", status: "Cancelado" },
  { id: 104, date: "2023-05-14", table: "Mesa 10", products: "3x Fernet, 3x Coca-Cola", bar: "Bar Central", total: "$4,900", status: "Completado" },
  { id: 105, date: "2023-05-13", table: "Barra", products: "2x Vodka", bar: "Bar Norte", total: "$2,400", status: "Completado" },
];

// Mock data for order statistics
const orderStatsByBar = [
  { bar: "Bar Central", totalOrders: 156, avgTime: "8 min", topProduct: "Gin Tonic" },
  { bar: "Bar Norte", totalOrders: 98, avgTime: "10 min", topProduct: "Fernet" },
  { bar: "Bar VIP", totalOrders: 42, avgTime: "5 min", topProduct: "Champagne" },
  { bar: "Bar Sur", totalOrders: 85, avgTime: "12 min", topProduct: "Cerveza" },
];

const Orders = () => {
  const isMobile = useIsMobile();
  const colSpan = isMobile ? "col-span-12" : "col-span-3";
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Preparando": return "bg-amber-100 text-amber-800";
      case "Listo": return "bg-blue-100 text-blue-800";
      case "Entregado": return "bg-green-100 text-green-800";
      case "Cancelado": return "bg-red-100 text-red-800";
      case "Completado": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <>
      <PageHeader 
        title="Gestión de Pedidos" 
        description="Monitoreo y control de órdenes en tiempo real"
      >
        <Button>Nuevo Pedido</Button>
      </PageHeader>

      <div className="grid grid-cols-12 gap-4 mb-6">
        <StatsCard
          title="Pedidos Activos"
          value="15"
          description="En preparación o listos"
          icon={<ClipboardCheck className="h-4 w-4" />}
          className={colSpan}
        />
        <StatsCard
          title="Tiempo Promedio"
          value="8 min"
          description="De preparación"
          icon={<Clock className="h-4 w-4" />}
          className={colSpan}
        />
        <StatsCard
          title="Pedidos Hoy"
          value="124"
          description="68 completados, 56 en proceso"
          icon={<History className="h-4 w-4" />}
          className={colSpan}
        />
        <StatsCard
          title="Mesas Activas"
          value="18"
          description="4 VIP, 14 regulares"
          icon={<LucideLayoutGrid className="h-4 w-4" />}
          className={colSpan}
        />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Gestión de Pedidos</CardTitle>
          <CardDescription>Monitoreo y control de órdenes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="realtime">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="realtime">Tiempo Real</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
              <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            </TabsList>
            
            {/* Pedidos en Tiempo Real */}
            <TabsContent value="realtime">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Mesa</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead>Barra</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Asignado a</TableHead>
                    <TableHead>Tiempo</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {realTimeOrdersData.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>{order.table}</TableCell>
                      <TableCell>{order.products}</TableCell>
                      <TableCell>{order.bar}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell>{order.assignedTo}</TableCell>
                      <TableCell>{order.time}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Ver</Button>
                          <Button variant="outline" size="sm">Cambiar estado</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Historial de Pedidos */}
            <TabsContent value="history">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Mesa</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead>Barra</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderHistoryData.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.table}</TableCell>
                      <TableCell>{order.products}</TableCell>
                      <TableCell>{order.bar}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Detalles</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Estadísticas de Pedidos */}
            <TabsContent value="stats">
              <h3 className="text-lg font-medium mb-4">Rendimiento por Barra</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Barra</TableHead>
                    <TableHead>Total Pedidos</TableHead>
                    <TableHead>Tiempo Promedio</TableHead>
                    <TableHead>Producto Más Vendido</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderStatsByBar.map((stat) => (
                    <TableRow key={stat.bar}>
                      <TableCell>{stat.bar}</TableCell>
                      <TableCell>{stat.totalOrders}</TableCell>
                      <TableCell>{stat.avgTime}</TableCell>
                      <TableCell>{stat.topProduct}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <ChartIcon className="h-4 w-4 mr-2" />
                          Ver detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Mesas</CardTitle>
          <CardDescription>Asignación, liberación y estado de mesas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Ejemplo de tarjetas de mesas */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Mesa 5</CardTitle>
                <CardDescription>Bar Central</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Estado:</span>
                    <Badge className="bg-green-100 text-green-800">Ocupada</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Asignada a:</span>
                    <span>Mozo 1</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pedidos activos:</span>
                    <span>2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tiempo:</span>
                    <span>45 min</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="w-full">Ver Pedidos</Button>
                    <Button size="sm" className="w-full">Liberar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">VIP 2</CardTitle>
                <CardDescription>Bar VIP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Estado:</span>
                    <Badge className="bg-green-100 text-green-800">Ocupada</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Asignada a:</span>
                    <span>PR Juan</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pedidos activos:</span>
                    <span>1</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tiempo:</span>
                    <span>1h 20m</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="w-full">Ver Pedidos</Button>
                    <Button size="sm" className="w-full">Liberar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Mesa 12</CardTitle>
                <CardDescription>Bar Norte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Estado:</span>
                    <Badge className="bg-green-100 text-green-800">Ocupada</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Asignada a:</span>
                    <span>Mozo 3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pedidos activos:</span>
                    <span>0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tiempo:</span>
                    <span>30 min</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="w-full">Ver Pedidos</Button>
                    <Button size="sm" className="w-full">Liberar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Mesa 8</CardTitle>
                <CardDescription>Bar Central</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Estado:</span>
                    <Badge className="bg-amber-100 text-amber-800">Reservada</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Asignada a:</span>
                    <span>Mozo 2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pedidos activos:</span>
                    <span>0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Hora reserva:</span>
                    <span>22:30</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="w-full">Ocupar</Button>
                    <Button size="sm" className="w-full">Cancelar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Orders;
