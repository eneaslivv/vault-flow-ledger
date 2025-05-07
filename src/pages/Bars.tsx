import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BarChart, QrCode, ArrowRightLeft, CreditCard, DollarSign, Tag, BoxesIcon, Users, Plus } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { IncomePanel } from "@/components/bars/IncomePanel";
import { StockTransfers } from "@/components/bars/StockTransfers";
import { BarVisualization } from "@/components/bars/BarVisualization";
import { QRGenerator } from "@/components/bars/QRGenerator";
import { BarCreator } from "@/components/bars/BarCreator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock data for QR performance
const qrPerformanceData = [{
  id: 1,
  qrCode: "QR-BAR-CENTRAL-01",
  location: "Barra Central (Entrada)",
  scans: 523,
  orders: 487,
  revenue: "$43,850"
}, {
  id: 2,
  qrCode: "QR-BAR-CENTRAL-02",
  location: "Barra Central (VIP)",
  scans: 289,
  orders: 254,
  revenue: "$35,200"
}, {
  id: 3,
  qrCode: "QR-BAR-NORTE-01",
  location: "Barra Norte (General)",
  scans: 478,
  orders: 412,
  revenue: "$38,750"
}, {
  id: 4,
  qrCode: "QR-EL-ALAMO-01",
  location: "El Alamo (Entrada)",
  scans: 356,
  orders: 320,
  revenue: "$29,600"
}, {
  id: 5,
  qrCode: "QR-BAR-SUR-01",
  location: "Barra Sur (General)",
  scans: 298,
  orders: 265,
  revenue: "$24,800"
}];

// Mock data for bar staff
const barStaffData = [{
  id: 1,
  name: "Juan García",
  role: "Bartender Principal",
  bar: "Bar Central",
  shift: "19:00 - 02:00",
  performance: "97%"
}, {
  id: 2,
  name: "María López",
  role: "Bartender",
  bar: "Bar Norte",
  shift: "19:00 - 02:00",
  performance: "94%"
}, {
  id: 3,
  name: "Carlos Ruiz",
  role: "Bartender Asistente",
  bar: "Bar Central",
  shift: "22:00 - 05:00",
  performance: "91%"
}, {
  id: 4,
  name: "Ana Martínez",
  role: "Bartender",
  bar: "El Alamo",
  shift: "19:00 - 02:00",
  performance: "95%"
}, {
  id: 5,
  name: "Roberto Sánchez",
  role: "Bartender Principal",
  bar: "Bar Sur",
  shift: "22:00 - 05:00",
  performance: "93%"
}];
const Bars = () => {
  const isMobile = useIsMobile();
  const colSpan = isMobile ? "col-span-12" : "col-span-3";
  const [selectedBar, setSelectedBar] = useState("all");
  const [activeTab, setActiveTab] = useState("management");
  const [qrGeneratorOpen, setQrGeneratorOpen] = useState(false);
  const [barCreatorOpen, setBarCreatorOpen] = useState(false);
  return <>
      <PageHeader title="Gestión de Barras & QRs" description="Control de barras, QRs, ingresos y transferencias">
        <Button onClick={() => setQrGeneratorOpen(true)} className="mr-2 bg-stone-900 hover:bg-stone-800">
          <QrCode className="mr-2 h-4 w-4" />
          Generar Nuevo QR
        </Button>
        <Button onClick={() => setBarCreatorOpen(true)} className="bg-stone-900 hover:bg-stone-800">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Barra
        </Button>
      </PageHeader>

      <div className="grid grid-cols-12 gap-4 mb-6">
        <StatsCard title="Total Ingresos" value="$172,200" description="Todas las barras" icon={<DollarSign className="h-4 w-4" />} className={colSpan} />
        <StatsCard title="Escaneos QR" value="1,944" description="Conversión: 89%" icon={<QrCode className="h-4 w-4" />} className={colSpan} />
        <StatsCard title="Transferencias" value="53" description="Entre barras" icon={<ArrowRightLeft className="h-4 w-4" />} className={colSpan} />
        <StatsCard title="Reingresos" value="28" description="Al stock disponible" icon={<BoxesIcon className="h-4 w-4" />} className={colSpan} />
      </div>

      {/* Visualización de barras */}
      <BarVisualization className="mb-6" />

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Barras</CardTitle>
          <CardDescription>Ingresos, stock, transferencias y personal</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="management">Gestión</TabsTrigger>
              <TabsTrigger value="qrs">QRs</TabsTrigger>
              <TabsTrigger value="bars">Barras</TabsTrigger>
              <TabsTrigger value="details">Detalle</TabsTrigger>
            </TabsList>
            
            {/* Gestión Tab */}
            <TabsContent value="management">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <Select value={selectedBar} onValueChange={setSelectedBar}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Seleccionar bar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las barras</SelectItem>
                    <SelectItem value="barCentral">Barra Central</SelectItem>
                    <SelectItem value="barNorte">Barra Norte</SelectItem>
                    <SelectItem value="barSur">Barra Sur</SelectItem>
                    <SelectItem value="elAlamo">El Alamo</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <Input placeholder="Buscar por QR, staff o producto..." />
                </div>
              </div>
            
              <Tabs defaultValue="income">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="income">Ingresos</TabsTrigger>
                  <TabsTrigger value="transfers">Transferencias</TabsTrigger>
                  <TabsTrigger value="details">Detalle de Barras</TabsTrigger>
                </TabsList>
                
                {/* Ingresos Panel */}
                <TabsContent value="income">
                  <IncomePanel selectedBar={selectedBar} />
                </TabsContent>
                
                {/* Transferencias Panel */}
                <TabsContent value="transfers">
                  <StockTransfers selectedBar={selectedBar} />
                </TabsContent>
                
                {/* Detalle de Barras */}
                <TabsContent value="details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Performance de QRs</CardTitle>
                        <CardDescription>Escaneos y conversión por código QR</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>QR</TableHead>
                              <TableHead>Ubicación</TableHead>
                              <TableHead>Escaneos</TableHead>
                              <TableHead>Pedidos</TableHead>
                              <TableHead>Ingresos</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {qrPerformanceData.filter(item => selectedBar === "all" || item.location.toLowerCase().includes(selectedBar.toLowerCase())).map(qr => <TableRow key={qr.id}>
                                  <TableCell className="font-medium">{qr.qrCode}</TableCell>
                                  <TableCell>{qr.location}</TableCell>
                                  <TableCell>{qr.scans}</TableCell>
                                  <TableCell>{qr.orders}</TableCell>
                                  <TableCell>{qr.revenue}</TableCell>
                                </TableRow>)}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Personal por Barra</CardTitle>
                        <CardDescription>Staff asignado a cada barra</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nombre</TableHead>
                              <TableHead>Rol</TableHead>
                              <TableHead>Barra</TableHead>
                              <TableHead>Turno</TableHead>
                              <TableHead>Performance</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {barStaffData.filter(item => selectedBar === "all" || item.bar.toLowerCase().includes(selectedBar.replace(/([A-Z])/g, ' $1').trim().toLowerCase())).map(staff => <TableRow key={staff.id}>
                                  <TableCell className="font-medium">{staff.name}</TableCell>
                                  <TableCell>{staff.role}</TableCell>
                                  <TableCell>{staff.bar}</TableCell>
                                  <TableCell>{staff.shift}</TableCell>
                                  <TableCell>
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                      {staff.performance}
                                    </Badge>
                                  </TableCell>
                                </TableRow>)}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            {/* QRs Tab */}
            <TabsContent value="qrs">
              <QRGenerator />
            </TabsContent>
            
            {/* Barras Tab */}
            <TabsContent value="bars">
              <BarCreator />
            </TabsContent>
            
            {/* Detalle Tab */}
            <TabsContent value="details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Performance de QRs</CardTitle>
                    <CardDescription>Escaneos y conversión por código QR</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>QR</TableHead>
                          <TableHead>Ubicación</TableHead>
                          <TableHead>Escaneos</TableHead>
                          <TableHead>Pedidos</TableHead>
                          <TableHead>Ingresos</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {qrPerformanceData.filter(item => selectedBar === "all" || item.location.toLowerCase().includes(selectedBar.toLowerCase())).map(qr => <TableRow key={qr.id}>
                              <TableCell className="font-medium">{qr.qrCode}</TableCell>
                              <TableCell>{qr.location}</TableCell>
                              <TableCell>{qr.scans}</TableCell>
                              <TableCell>{qr.orders}</TableCell>
                              <TableCell>{qr.revenue}</TableCell>
                            </TableRow>)}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Personal por Barra</CardTitle>
                    <CardDescription>Staff asignado a cada barra</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead>Barra</TableHead>
                          <TableHead>Turno</TableHead>
                          <TableHead>Performance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {barStaffData.filter(item => selectedBar === "all" || item.bar.toLowerCase().includes(selectedBar.replace(/([A-Z])/g, ' $1').trim().toLowerCase())).map(staff => <TableRow key={staff.id}>
                              <TableCell className="font-medium">{staff.name}</TableCell>
                              <TableCell>{staff.role}</TableCell>
                              <TableCell>{staff.bar}</TableCell>
                              <TableCell>{staff.shift}</TableCell>
                              <TableCell>
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                  {staff.performance}
                                </Badge>
                              </TableCell>
                            </TableRow>)}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Modals */}
      <Dialog open={qrGeneratorOpen} onOpenChange={setQrGeneratorOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Generador de Código QR</DialogTitle>
          </DialogHeader>
          <QRGenerator />
        </DialogContent>
      </Dialog>

      <Dialog open={barCreatorOpen} onOpenChange={setBarCreatorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nueva Barra</DialogTitle>
          </DialogHeader>
          <BarCreator />
        </DialogContent>
      </Dialog>
    </>;
};
export default Bars;