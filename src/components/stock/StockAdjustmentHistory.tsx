
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PackagePlus, PackageX, Filter } from "lucide-react";

// Mock data for stock reingress
const reingresData = [
  { id: 1, date: "2025-05-01", product: "Vodka Absolut 750ml", quantity: 1, reason: "Devolución completa (no se consumió)", bar: "Bar Central", status: "Procesado", cost: "$0", isOpened: false },
  { id: 2, date: "2025-05-01", product: "Cerveza", quantity: 3, reason: "Error de carga / descuento", bar: "Bar Norte", status: "Procesado", cost: "$0", isOpened: false },
  { id: 3, date: "2025-04-29", product: "Red Bull 250ml", quantity: 2, reason: "Transferido y no usado", bar: "Bar Sur", status: "Procesado", cost: "$0", isOpened: false },
  { id: 4, date: "2025-04-28", product: "Gin Beefeater 750ml", quantity: 1, reason: "Reutilizable (abierto, usable)", bar: "Bar Central", status: "Procesado", cost: "$200", isOpened: true },
];

// Mock data for stock losses
const lossesData = [
  { id: 1, date: "2025-05-02", product: "Champagne Moët & Chandon", quantity: 1, reason: "Botella rota / recipiente dañado", bar: "Bar VIP", status: "Procesado", previouslyRegistered: true },
  { id: 2, date: "2025-05-01", product: "Fernet", quantity: 1, reason: "Preparación fallida / mal hecho", bar: "Bar Norte", status: "Procesado", previouslyRegistered: true },
  { id: 3, date: "2025-04-30", product: "Vodka Absolut 750ml", quantity: 1, reason: "Robo o pérdida desconocida", bar: "Bar Sur", status: "Procesado", previouslyRegistered: true },
  { id: 4, date: "2025-04-28", product: "Agua Mineral 500ml", quantity: 6, reason: "Producto vencido", bar: "Bar Central", status: "Procesado", previouslyRegistered: true },
];

interface StockAdjustmentHistoryProps {
  className?: string;
  selectedBar?: string;
}

export function StockAdjustmentHistory({ className, selectedBar = "all" }: StockAdjustmentHistoryProps) {
  const [activeTab, setActiveTab] = useState("reingress");
  const [filterBar, setFilterBar] = useState(selectedBar);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter data based on bar and search term
  const filteredReingresData = reingresData.filter(item => {
    const matchesBar = filterBar === "all" || item.bar.toLowerCase().includes(filterBar.toLowerCase());
    const matchesSearch = 
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBar && matchesSearch;
  });
  
  const filteredLossesData = lossesData.filter(item => {
    const matchesBar = filterBar === "all" || item.bar.toLowerCase().includes(filterBar.toLowerCase());
    const matchesSearch = 
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBar && matchesSearch;
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Historial de Ajustes de Stock</CardTitle>
        <CardDescription>Registro de reingresos y pérdidas de inventario</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              placeholder="Buscar por producto o motivo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {selectedBar === "all" && (
            <Select value={filterBar} onValueChange={setFilterBar}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Seleccionar bar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los bares</SelectItem>
                <SelectItem value="Bar Central">Bar Central</SelectItem>
                <SelectItem value="Bar Norte">Bar Norte</SelectItem>
                <SelectItem value="Bar Sur">Bar Sur</SelectItem>
                <SelectItem value="Bar VIP">Bar VIP</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        
        <Tabs defaultValue="reingress" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reingress" className="flex items-center">
              <PackagePlus className="mr-2 h-4 w-4" />
              Reingresos
            </TabsTrigger>
            <TabsTrigger value="losses" className="flex items-center">
              <PackageX className="mr-2 h-4 w-4" />
              Pérdidas
            </TabsTrigger>
          </TabsList>
          
          {/* Reingresos */}
          <TabsContent value="reingress">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Bar</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Detalles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReingresData.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.reason}</TableCell>
                    <TableCell>{item.bar}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-muted-foreground">
                          Costo: {item.cost}
                        </div>
                        {item.isOpened && (
                          <Badge variant="outline" className="text-amber-600 border-amber-600 text-xs">
                            Abierto
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredReingresData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      No hay reingresos que coincidan con los filtros
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          {/* Pérdidas */}
          <TabsContent value="losses">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Bar</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Detalles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLossesData.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.reason}</TableCell>
                    <TableCell>{item.bar}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-muted-foreground">
                          {item.previouslyRegistered ? "Previamente registrado" : "No registrado en sistema"}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredLossesData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      No hay pérdidas que coincidan con los filtros
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
