
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Box, 
  Gift, 
  Search,
  ShoppingCart,
  Transfer
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for stock
const stockData = [
  { id: 1, product: "Agua Mineral 500ml", category: "No Alcoholico", quantity: 250, bar: "Bar Central", status: "En Stock" },
  { id: 2, product: "Red Bull 250ml", category: "Energéticas", quantity: 180, bar: "Bar Central", status: "En Stock" },
  { id: 3, product: "Vodka Absolut 750ml", category: "Alcoholico", quantity: 45, bar: "Bar Norte", status: "En Stock" },
  { id: 4, product: "Gin Beefeater 750ml", category: "Alcoholico", quantity: 38, bar: "Bar Sur", status: "En Stock" },
  { id: 5, product: "Whisky Johnnie Walker 750ml", category: "Alcoholico", quantity: 20, bar: "El Alamo", status: "En Stock" },
  { id: 6, product: "Champagne Moët & Chandon", category: "Alcoholico", quantity: 15, bar: "Bar Central", status: "En Stock" },
];

// Mock data for courtesies
const courtesiesStockData = [
  { id: 1, product: "Vodka Red Bull", category: "Alcoholico", quantity: 5, bar: "El Alamo", givenBy: "PR Juan" },
  { id: 2, product: "Champagne Moët & Chandon", category: "Alcoholico", quantity: 2, bar: "Bar Central", givenBy: "Admin Central" },
  { id: 3, product: "Gin Tonic Beefeater", category: "Alcoholico", quantity: 3, bar: "Bar Norte", givenBy: "Sistema" },
];

// Mock data for transfers
const transfersStockData = [
  { id: 1, product: "Agua Mineral 500ml", quantity: 50, fromBar: "Bar Central", toBar: "El Alamo", date: "2023-05-02", status: "Completada" },
  { id: 2, product: "Red Bull 250ml", quantity: 24, fromBar: "Bar Norte", toBar: "Bar Sur", date: "2023-05-01", status: "Pendiente" },
  { id: 3, product: "Vodka Absolut 750ml", quantity: 5, fromBar: "Bar Central", toBar: "Bar Norte", date: "2023-04-30", status: "Completada" },
];

// Mock data for unredeemed
const unredeemedStockData = [
  { id: 1, product: "Gin Tonic Beefeater", quantity: 2, bar: "Bar Norte", date: "2023-05-02", user: "Usuario ID 123" },
  { id: 2, product: "Vodka Tonic", quantity: 1, bar: "El Alamo", date: "2023-05-01", user: "Usuario ID 456" },
  { id: 3, product: "Whisky Johnnie Walker", quantity: 1, bar: "Bar Sur", date: "2023-05-01", user: "Usuario ID 789" },
];

const bars = ["Todos", "Bar Central", "Bar Norte", "Bar Sur", "El Alamo"];

const Stock = () => {
  const [selectedBar, setSelectedBar] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter stock data based on selection
  const filteredStock = stockData.filter(item => {
    const matchesBar = selectedBar === "Todos" || item.bar === selectedBar;
    const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBar && matchesSearch;
  });
  
  return (
    <>
      <PageHeader 
        title="Gestión de Stock Avanzado" 
        description="Control de inventario, cortesías y transferencias"
      >
        <Button className="mr-2">
          <Transfer className="mr-2 h-4 w-4" />
          Nueva Transferencia
        </Button>
        <Button>
          <Box className="mr-2 h-4 w-4" />
          Añadir Stock
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Stock Total</CardTitle>
            <CardDescription>Productos disponibles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,480</div>
            <p className="text-sm text-muted-foreground">En todos los bares</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Transferencias</CardTitle>
            <CardDescription>Último mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">79</div>
            <p className="text-sm text-muted-foreground">Entre bares</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pendientes</CardTitle>
            <CardDescription>Sin retirar o en tránsito</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45</div>
            <p className="text-sm text-muted-foreground">Valor: $8,250</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventario Detallado</CardTitle>
          <CardDescription>Productos, cortesías, transferencias y pendientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedBar} onValueChange={setSelectedBar}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Seleccionar bar" />
              </SelectTrigger>
              <SelectContent>
                {bars.map((bar) => (
                  <SelectItem key={bar} value={bar}>
                    {bar}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Tabs defaultValue="stock">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stock">En Stock</TabsTrigger>
              <TabsTrigger value="courtesies">Cortesías</TabsTrigger>
              <TabsTrigger value="transfers">Transferencias</TabsTrigger>
              <TabsTrigger value="unredeemed">No Retirados</TabsTrigger>
            </TabsList>
            
            {/* En Stock */}
            <TabsContent value="stock">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Bar</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStock.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.bar}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Transfer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Gift className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Cortesías */}
            <TabsContent value="courtesies">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Bar</TableHead>
                    <TableHead>Otorgado por</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courtesiesStockData.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.bar}</TableCell>
                      <TableCell>{item.givenBy}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Transferencias */}
            <TabsContent value="transfers">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Bar Origen</TableHead>
                    <TableHead>Bar Destino</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transfersStockData.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.fromBar}</TableCell>
                      <TableCell>{item.toBar}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={item.status === "Completada" 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-amber-50 text-amber-700 border-amber-200"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* No Retirados */}
            <TabsContent value="unredeemed">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Bar</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unredeemedStockData.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.bar}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.user}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Marcar como retirado</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default Stock;
