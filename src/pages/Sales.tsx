
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Banknote,
  DollarSign,
  Search,
  ShoppingCart,
  ArrowDown,
  ArrowUp,
  Download 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for sales
const salesData = [
  { 
    id: 1, 
    product: "Vodka Red Bull", 
    price: "$800", 
    paymentType: "Efectivo",
    bar: "Bar Central",
    user: "Usuario ID 123",
    status: "Completada",
    date: "2023-05-02",
    time: "21:45"
  },
  { 
    id: 2, 
    product: "Gin Tonic", 
    price: "$750", 
    paymentType: "NFC",
    bar: "Bar Norte",
    user: "Usuario ID 456",
    status: "Completada",
    date: "2023-05-02",
    time: "22:15"
  },
  { 
    id: 3, 
    product: "Whisky", 
    price: "$950", 
    paymentType: "App",
    bar: "El Alamo",
    user: "Usuario ID 789",
    status: "Completada",
    date: "2023-05-02",
    time: "22:30"
  },
  { 
    id: 4, 
    product: "Agua Mineral", 
    price: "$350", 
    paymentType: "PR Token",
    bar: "Bar Sur",
    user: "Usuario ID 101",
    status: "Sin retirar",
    date: "2023-05-01",
    time: "23:00"
  },
  { 
    id: 5, 
    product: "Champagne", 
    price: "$1,800", 
    paymentType: "Efectivo",
    bar: "Bar Central",
    user: "Usuario ID 112",
    status: "Completada",
    date: "2023-05-01",
    time: "23:15"
  },
  { 
    id: 6, 
    product: "Fernet Cola", 
    price: "$650", 
    paymentType: "NFC",
    bar: "El Alamo",
    user: "Usuario ID 131",
    status: "Completada",
    date: "2023-05-01",
    time: "23:30"
  },
];

const paymentTypes = ["Todos", "Efectivo", "NFC", "App", "PR Token", "Cortesía"];
const bars = ["Todos", "Bar Central", "Bar Norte", "Bar Sur", "El Alamo"];
const statuses = ["Todos", "Completada", "Sin retirar", "Cortesía"];

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaymentType, setSelectedPaymentType] = useState("Todos");
  const [selectedBar, setSelectedBar] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  
  // Filter sales data based on selection
  const filteredSales = salesData.filter(item => {
    const matchesSearch = 
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPaymentType = selectedPaymentType === "Todos" || item.paymentType === selectedPaymentType;
    const matchesBar = selectedBar === "Todos" || item.bar === selectedBar;
    const matchesStatus = selectedStatus === "Todos" || item.status === selectedStatus;
    
    return matchesSearch && matchesPaymentType && matchesBar && matchesStatus;
  });
  
  return (
    <>
      <PageHeader 
        title="Gestión de Ventas" 
        description="Transacciones, ingresos y reportes"
      >
        <Button variant="outline" className="mr-2">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
        <Button>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Nueva Venta
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Ventas Totales</CardTitle>
            <CardDescription>Último mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$145,550</div>
            <div className="flex items-center text-green-600 text-sm">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>12.5% vs mes anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Efectivo</CardTitle>
            <CardDescription>Último mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$58,200</div>
            <div className="flex items-center text-green-600 text-sm">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>8.3% vs mes anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">NFC / App</CardTitle>
            <CardDescription>Último mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$76,850</div>
            <div className="flex items-center text-green-600 text-sm">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>15.2% vs mes anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">PR Tokens</CardTitle>
            <CardDescription>Último mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$10,500</div>
            <div className="flex items-center text-red-600 text-sm">
              <ArrowDown className="h-4 w-4 mr-1" />
              <span>3.1% vs mes anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Ventas</CardTitle>
          <CardDescription>Transacciones y pagos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por producto o usuario..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={selectedPaymentType} onValueChange={setSelectedPaymentType}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Tipo de pago" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedBar} onValueChange={setSelectedBar}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Bar" />
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
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Estado" />
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
                <TableHead>Precio</TableHead>
                <TableHead>Tipo de Pago</TableHead>
                <TableHead>Bar</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    {item.paymentType === "Efectivo" && (
                      <div className="flex items-center">
                        <Banknote className="h-4 w-4 mr-2 text-green-600" />
                        {item.paymentType}
                      </div>
                    )}
                    {item.paymentType === "NFC" && (
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
                        {item.paymentType}
                      </div>
                    )}
                    {item.paymentType === "App" && (
                      <div className="flex items-center">
                        <ShoppingCart className="h-4 w-4 mr-2 text-purple-600" />
                        {item.paymentType}
                      </div>
                    )}
                    {item.paymentType === "PR Token" && (
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-amber-600" />
                        {item.paymentType}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{item.bar}</TableCell>
                  <TableCell>{item.user}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        item.status === "Completada" 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : item.status === "Sin retirar"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
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

export default Sales;
