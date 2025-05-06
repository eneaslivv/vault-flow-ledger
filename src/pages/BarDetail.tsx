
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StockTransfers } from "@/components/bars/StockTransfers";
import { StockAdjustment } from "@/components/stock/StockAdjustment";
import { StockAdjustmentHistory } from "@/components/stock/StockAdjustmentHistory";
import {
  ArrowLeft,
  BarChart,
  QrCode,
  Users,
  PieChart,
  ArrowRightLeft,
  PackagePlus,
  Clock,
  ChevronRight,
  Box
} from "lucide-react";

// Mock data for bars
const barsData = [
  { 
    id: 1, 
    name: "Bar Central", 
    sales: "$82,350", 
    orders: 875, 
    qrCodes: 3, 
    staff: 5,
    stockItems: 42,
    status: "active"
  },
  { 
    id: 2, 
    name: "Bar Norte", 
    sales: "$38,750", 
    orders: 412, 
    qrCodes: 2, 
    staff: 3,
    stockItems: 35,
    status: "active"
  },
  { 
    id: 3, 
    name: "Bar Sur", 
    sales: "$24,800", 
    orders: 265, 
    qrCodes: 1, 
    staff: 2,
    stockItems: 28,
    status: "active"
  },
  { 
    id: 4, 
    name: "El Alamo", 
    sales: "$29,600", 
    orders: 320, 
    qrCodes: 1, 
    staff: 2,
    stockItems: 30,
    status: "active"
  },
];

// Mock data for stock items
const barStockItems = [
  { id: 1, product: "Vodka Absolut 750ml", category: "Alcoholico", quantity: 12, status: "En Stock" },
  { id: 2, product: "Cerveza", category: "Alcoholico", quantity: 48, status: "En Stock" },
  { id: 3, product: "Agua Mineral 500ml", category: "No Alcoholico", quantity: 36, status: "En Stock" },
  { id: 4, product: "Red Bull 250ml", category: "Energéticas", quantity: 24, status: "En Stock" },
  { id: 5, product: "Gin Beefeater 750ml", category: "Alcoholico", quantity: 8, status: "En Stock" },
  { id: 6, product: "Whicky Johnnie Walker", category: "Alcoholico", quantity: 6, status: "En Stock" },
];

const BarDetail = () => {
  const { barId } = useParams<{ barId: string }>();
  const id = parseInt(barId || "1");
  const bar = barsData.find(b => b.id === id) || barsData[0];
  
  const [activeTab, setActiveTab] = useState("overview");
  const [stockAdjustmentOpen, setStockAdjustmentOpen] = useState(false);
  const [productToAdjust, setProductToAdjust] = useState("");

  const handleAdjustStock = (productName: string = "") => {
    setProductToAdjust(productName);
    setStockAdjustmentOpen(true);
  };

  const handleStockReingress = (data: any) => {
    console.log("Reingreso procesado:", data);
    // Aquí iría la lógica para actualizar el stock
  };

  const handleStockLoss = (data: any) => {
    console.log("Pérdida registrada:", data);
    // Aquí iría la lógica para actualizar el stock
  };

  return (
    <>
      <PageHeader 
        title={bar.name} 
        description={`Control y análisis detallado de ${bar.name}`}
        breadcrumb={
          <div className="flex items-center text-sm text-muted-foreground">
            <Link to="/bars" className="hover:text-primary">Barras</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>{bar.name}</span>
          </div>
        }
      >
        <Button variant="outline" className="mr-2" asChild>
          <Link to="/bars">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
        <Button className="mr-2" onClick={() => handleAdjustStock()}>
          <PackagePlus className="mr-2 h-4 w-4" />
          Ajustar Stock
        </Button>
        <Button>
          <Box className="mr-2 h-4 w-4" />
          Añadir Stock
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bar.sales}</div>
            <p className="text-xs text-muted-foreground mt-1">Último mes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bar.orders}</div>
            <p className="text-xs text-muted-foreground mt-1">Último mes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bar.stockItems}</div>
            <p className="text-xs text-muted-foreground mt-1">En stock</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bar.staff}</div>
            <p className="text-xs text-muted-foreground mt-1">Empleados activos</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de {bar.name}</CardTitle>
          <CardDescription>Stock, ventas, pedidos y más</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-1 md:grid-cols-5 w-full">
              <TabsTrigger value="overview">
                <BarChart className="h-4 w-4 mr-2" />
                Resumen
              </TabsTrigger>
              <TabsTrigger value="stock">
                <Box className="h-4 w-4 mr-2" />
                Inventario
              </TabsTrigger>
              <TabsTrigger value="transfers">
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Transferencias
              </TabsTrigger>
              <TabsTrigger value="adjustments">
                <PackagePlus className="h-4 w-4 mr-2" />
                Ajustes de Stock
              </TabsTrigger>
              <TabsTrigger value="staff">
                <Users className="h-4 w-4 mr-2" />
                Personal
              </TabsTrigger>
            </TabsList>
            
            {/* Overview tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Rendimiento Reciente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                      <PieChart className="h-8 w-8 text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">Gráfico de rendimiento</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <h4 className="font-medium">Categorías más vendidas</h4>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li className="flex justify-between">
                            <span>Bebidas alcohólicas</span>
                            <span className="font-medium">64%</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Bebidas sin alcohol</span>
                            <span className="font-medium">21%</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Energizantes</span>
                            <span className="font-medium">15%</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">Productos top</h4>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li className="flex justify-between">
                            <span>Gin Tonic</span>
                            <span className="font-medium">145</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Cerveza</span>
                            <span className="font-medium">132</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Fernet con Coca</span>
                            <span className="font-medium">98</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Información de la Barra</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Códigos QR</h4>
                        <div className="flex items-center mt-1">
                          <QrCode className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{bar.qrCodes} códigos activos</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {Array.from({ length: bar.qrCodes }).map((_, i) => (
                            <div key={i} className="bg-muted/20 p-2 rounded text-center text-sm">
                              QR #{i+1}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="font-medium">Personal</h4>
                        <div className="flex items-center mt-1">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{bar.staff} empleados activos</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2 mt-2">
                          <div className="flex justify-between items-center bg-muted/20 p-2 rounded text-sm">
                            <span>Encargado: Juan Pérez</span>
                            <Badge>Principal</Badge>
                          </div>
                          <div className="flex justify-between items-center bg-muted/20 p-2 rounded text-sm">
                            <span>Barman: Laura Gómez</span>
                            <Badge variant="outline">Activo</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="font-medium">Horas de Operación</h4>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Jueves a Domingo: 21:00 - 05:00</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Stock tab */}
            <TabsContent value="stock">
              <div className="flex justify-end mb-4">
                <Button size="sm" className="ml-auto" onClick={() => handleAdjustStock()}>
                  <PackagePlus className="mr-2 h-4 w-4" />
                  Ajustar Stock
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {barStockItems.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleAdjustStock(item.product)}
                          >
                            <PackagePlus className="mr-2 h-4 w-4" />
                            Ajustar
                          </Button>
                          <Link to="/stock">
                            <Button variant="ghost" size="sm">Ver en Stock</Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Transfers tab */}
            <TabsContent value="transfers">
              <StockTransfers selectedBar={bar.name} />
            </TabsContent>
            
            {/* Adjustments tab */}
            <TabsContent value="adjustments">
              <StockAdjustmentHistory selectedBar={bar.name} />
            </TabsContent>
            
            {/* Staff tab */}
            <TabsContent value="staff">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Personal Asignado a {bar.name}</h3>
                  <Button size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Asignar Personal
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Juan Pérez</TableCell>
                      <TableCell>Encargado</TableCell>
                      <TableCell>
                        <Badge>Principal</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Ver Perfil</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Laura Gómez</TableCell>
                      <TableCell>Barman</TableCell>
                      <TableCell>
                        <Badge variant="outline">Activo</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Ver Perfil</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Carlos Rodríguez</TableCell>
                      <TableCell>Asistente</TableCell>
                      <TableCell>
                        <Badge variant="outline">Activo</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Ver Perfil</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Modal para ajustar stock */}
      <StockAdjustment 
        open={stockAdjustmentOpen}
        onOpenChange={setStockAdjustmentOpen}
        initialProduct={productToAdjust}
        onSubmitReingress={handleStockReingress}
        onSubmitLoss={handleStockLoss}
      />
    </>
  );
};

export default BarDetail;
