
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Box, 
  Briefcase,
  DollarSign,
  Search,
  Transfer,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for bars
const barsData = [
  { 
    id: 1, 
    name: "Bar Central", 
    location: "Centro, Ciudad",
    status: "Abierto",
    stockTotal: "548",
    sales: "$45,800",
    transfers: {
      in: "45",
      out: "135",
      balance: "-90"
    },
    staff: "12"
  },
  { 
    id: 2, 
    name: "Bar Norte", 
    location: "Zona Norte, Ciudad",
    status: "Abierto",
    stockTotal: "325",
    sales: "$32,400",
    transfers: {
      in: "120",
      out: "85",
      balance: "+35"
    },
    staff: "8"
  },
  { 
    id: 3, 
    name: "Bar Sur", 
    location: "Zona Sur, Ciudad",
    status: "Cerrado",
    stockTotal: "412",
    sales: "$28,600",
    transfers: {
      in: "75",
      out: "95",
      balance: "-20"
    },
    staff: "10"
  },
  { 
    id: 4, 
    name: "El Alamo", 
    location: "Zona Oeste, Ciudad",
    status: "Abierto",
    stockTotal: "380",
    sales: "$38,750",
    transfers: {
      in: "135",
      out: "60",
      balance: "+75"
    },
    staff: "15"
  },
];

// Mock data for bar activity
const barActivityData = [
  {
    id: 1,
    bar: "Bar Central",
    activity: "Transferencia saliente",
    details: "50 Agua Mineral a El Alamo",
    date: "2023-05-02",
    time: "14:30"
  },
  {
    id: 2,
    bar: "Bar Norte",
    activity: "Venta",
    details: "245 productos vendidos",
    date: "2023-05-02",
    time: "22:45"
  },
  {
    id: 3,
    bar: "El Alamo",
    activity: "Transferencia entrante",
    details: "50 Agua Mineral desde Bar Central",
    date: "2023-05-02",
    time: "15:15"
  },
  {
    id: 4,
    bar: "Bar Sur",
    activity: "Actualización de Stock",
    details: "Recepción de 120 unidades nuevas",
    date: "2023-05-01",
    time: "10:30"
  },
  {
    id: 5,
    bar: "Bar Central",
    activity: "Cortesía",
    details: "2 Champagne para mesa VIP",
    date: "2023-05-01",
    time: "21:15"
  },
];

const Bars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter bars data based on search
  const filteredBars = barsData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  
  // Filter activity data based on search
  const filteredActivity = barActivityData.filter(item => {
    return searchTerm === "" || item.bar.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  return (
    <>
      <PageHeader 
        title="Gestión de Bares" 
        description="Administración de locales, stock e inventario"
      >
        <Button>
          <Briefcase className="mr-2 h-4 w-4" />
          Nuevo Bar
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Bares</CardTitle>
            <CardDescription>Total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">3 activos, 1 inactivo</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Stock Total</CardTitle>
            <CardDescription>Todos los bares</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,665</div>
            <p className="text-sm text-muted-foreground">Valor: $245,800</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Ventas Totales</CardTitle>
            <CardDescription>Último mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$145,550</div>
            <p className="text-sm text-muted-foreground">3,245 transacciones</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Personal</CardTitle>
            <CardDescription>Total activo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45</div>
            <p className="text-sm text-muted-foreground">En todos los bares</p>
          </CardContent>
        </Card>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar bares..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Bares y Locales</CardTitle>
          <CardDescription>Información general de todos los locales</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Ventas</TableHead>
                <TableHead>Balance Transferencias</TableHead>
                <TableHead>Personal</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBars.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={item.status === "Abierto" 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.stockTotal}</TableCell>
                  <TableCell>{item.sales}</TableCell>
                  <TableCell>
                    <span className={
                      item.transfers.balance.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }>
                      {item.transfers.balance}
                    </span>
                  </TableCell>
                  <TableCell>{item.staff}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Box className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <DollarSign className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <User className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Últimas acciones en los bares</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bar</TableHead>
                <TableHead>Actividad</TableHead>
                <TableHead>Detalles</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivity.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.bar}</TableCell>
                  <TableCell>{item.activity}</TableCell>
                  <TableCell>{item.details}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>
                    {item.activity.includes("Transferencia") ? (
                      <Button variant="ghost" size="icon">
                        <Transfer className="h-4 w-4" />
                      </Button>
                    ) : item.activity.includes("Venta") ? (
                      <Button variant="ghost" size="icon">
                        <DollarSign className="h-4 w-4" />
                      </Button>
                    ) : item.activity.includes("Stock") ? (
                      <Button variant="ghost" size="icon">
                        <Box className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="icon">
                        <User className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default Bars;
