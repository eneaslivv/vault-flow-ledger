import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MultipleTransfer } from "@/components/stock/MultipleTransfer";
import { 
  ArrowRight, 
  Box, 
  Search,
  Filter,
  ArrowRightLeft
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for transfers
const transfersData = [
  { 
    id: 1, 
    product: "Agua Mineral 500ml", 
    quantity: 50, 
    fromBar: "Bar Central", 
    toBar: "El Alamo", 
    date: "2023-05-02", 
    status: "Completada",
    approvedBy: "Admin Central",
    motive: "Reposición de stock"
  },
  { 
    id: 2, 
    product: "Red Bull 250ml", 
    quantity: 24, 
    fromBar: "Bar Norte", 
    toBar: "Bar Sur", 
    date: "2023-05-01", 
    status: "Pendiente",
    approvedBy: "Admin Norte",
    motive: "Préstamo por evento"
  },
  { 
    id: 3, 
    product: "Vodka Absolut 750ml", 
    quantity: 5, 
    fromBar: "Bar Central", 
    toBar: "Bar Norte", 
    date: "2023-04-30", 
    status: "Completada",
    approvedBy: "Admin Central",
    motive: "Urgencia"
  },
  { 
    id: 4, 
    product: "Gin Beefeater 750ml", 
    quantity: 3, 
    fromBar: "Bar Sur", 
    toBar: "El Alamo", 
    date: "2023-04-29", 
    status: "Completada",
    approvedBy: "Admin Sur",
    motive: "Devolución préstamo"
  },
  { 
    id: 5, 
    product: "Whisky Johnnie Walker 750ml", 
    quantity: 2, 
    fromBar: "El Alamo", 
    toBar: "Bar Central", 
    date: "2023-04-28", 
    status: "Completada",
    approvedBy: "Admin Alamo",
    motive: "Devolución préstamo"
  },
];

// Mock data for pending returns
const pendingReturnsData = [
  { 
    id: 1, 
    product: "Red Bull 250ml", 
    quantity: 24, 
    fromBar: "Bar Norte", 
    toBar: "Bar Sur", 
    dueDate: "2023-05-15", 
    status: "Pendiente" 
  },
  { 
    id: 2, 
    product: "Agua Mineral 500ml", 
    quantity: 20, 
    fromBar: "Bar Central", 
    toBar: "El Alamo", 
    dueDate: "2023-05-20", 
    status: "Parcial" 
  },
];

const bars = ["Todos", "Bar Central", "Bar Norte", "Bar Sur", "El Alamo"];
const statuses = ["Todos", "Completada", "Pendiente", "Parcial"];

const Transfers = () => {
  const [selectedBar, setSelectedBar] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [multipleTransferOpen, setMultipleTransferOpen] = useState(false);
  
  // Filter transfers data based on selection
  const filteredTransfers = transfersData.filter(item => {
    const matchesBar = selectedBar === "Todos" || item.fromBar === selectedBar || item.toBar === selectedBar;
    const matchesStatus = selectedStatus === "Todos" || item.status === selectedStatus;
    const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.motive.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBar && matchesStatus && matchesSearch;
  });

  const handleMultipleTransferSuccess = (data: any) => {
    console.log("Nueva transferencia creada:", data);
    // Aquí iría la lógica para actualizar la lista de transferencias
  };
  
  return (
    <>
      <PageHeader 
        title="Transferencias entre Bares" 
        description="Gestión de movimientos internos de stock"
      >
        <Button onClick={() => setMultipleTransferOpen(true)}>
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Nueva Transferencia
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Transferencias</CardTitle>
            <CardDescription>Último mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">79</div>
            <p className="text-sm text-muted-foreground">5 pendientes de devolución</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Productos Transferidos</CardTitle>
            <CardDescription>Último mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">325</div>
            <p className="text-sm text-muted-foreground">Valor estimado: $48,750</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Devoluciones Pendientes</CardTitle>
            <CardDescription>A la fecha</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">44</div>
            <p className="text-sm text-muted-foreground">2 préstamos activos</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Historial de Transferencias</CardTitle>
          <CardDescription>Movimientos entre bares y locales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar transferencias..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedBar} onValueChange={setSelectedBar}>
                <SelectTrigger className="w-full md:w-[180px]">
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
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Origen</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransfers.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.fromBar}</TableCell>
                  <TableCell>{item.toBar}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.motive}</TableCell>
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
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Devoluciones Pendientes</CardTitle>
          <CardDescription>Transferencias que requieren devolución</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Prestado por</TableHead>
                <TableHead>Prestado a</TableHead>
                <TableHead>Fecha límite</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingReturnsData.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.fromBar}</TableCell>
                  <TableCell>{item.toBar}</TableCell>
                  <TableCell>{item.dueDate}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className="bg-amber-50 text-amber-700 border-amber-200"
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Registrar Devolución
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Dialog para transferencia múltiple */}
      <Dialog open={multipleTransferOpen} onOpenChange={setMultipleTransferOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <MultipleTransfer 
            onClose={() => setMultipleTransferOpen(false)}
            onSuccess={handleMultipleTransferSuccess} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Transfers;
