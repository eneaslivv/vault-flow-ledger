
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Search,
  User,
  ShoppingCart,
  Filter,
  Download
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for users
const usersData = [
  { 
    id: 1, 
    user: "Usuario ID 123", 
    name: "Juan Pérez", 
    email: "juan@example.com", 
    consumo: "Si",
    appBalance: "$1,500", 
    nfcBalance: "$800", 
    visits: "12",
    lastActivity: "2023-05-02"
  },
  { 
    id: 2, 
    user: "Usuario ID 456", 
    name: "María López", 
    email: "maria@example.com", 
    consumo: "Si",
    appBalance: "$2,800", 
    nfcBalance: "$1,500", 
    visits: "8",
    lastActivity: "2023-05-01"
  },
  { 
    id: 3, 
    user: "Usuario ID 789", 
    name: "Carlos Rodríguez", 
    email: "carlos@example.com", 
    consumo: "No",
    appBalance: "$950", 
    nfcBalance: "$300", 
    visits: "5",
    lastActivity: "2023-05-02"
  },
  { 
    id: 4, 
    user: "Usuario ID 101", 
    name: "Ana Martínez", 
    email: "ana@example.com", 
    consumo: "Si",
    appBalance: "$3,200", 
    nfcBalance: "$2,000", 
    visits: "15",
    lastActivity: "2023-04-30"
  },
  { 
    id: 5, 
    user: "Usuario ID 112", 
    name: "Pedro González", 
    email: "pedro@example.com", 
    consumo: "No",
    appBalance: "$750", 
    nfcBalance: "$0", 
    visits: "3",
    lastActivity: "2023-05-01"
  },
];

// Mock data for visits without consumption
const noConsumptionData = [
  { 
    id: 1, 
    user: "Usuario ID 789", 
    name: "Carlos Rodríguez", 
    bar: "Bar Norte",
    entry: "Entrada Libre",
    date: "2023-05-02",
    time: "21:45"
  },
  { 
    id: 2, 
    user: "Usuario ID 112", 
    name: "Pedro González", 
    bar: "El Alamo",
    entry: "Entrada Libre",
    date: "2023-05-01",
    time: "22:30"
  },
  { 
    id: 3, 
    user: "Usuario ID 543", 
    name: "Laura Sánchez", 
    bar: "Bar Sur",
    entry: "Entrada Libre",
    date: "2023-05-01",
    time: "23:15"
  },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter users data based on search
  const filteredUsers = usersData.filter(item => {
    const matchesSearch = 
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  
  return (
    <>
      <PageHeader 
        title="Gestión de Usuarios" 
        description="Clientes, consumos y entradas"
      >
        <Button variant="outline" className="mr-2">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
        <Button variant="outline" className="mr-2">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
        <Button>
          <User className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </Button>
      </PageHeader>

      <Card className="mb-6">
        <CardContent className="p-6">
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">Todos los Usuarios</TabsTrigger>
              <TabsTrigger value="consumption">Con Consumo</TabsTrigger>
              <TabsTrigger value="no-consumption">Sin Consumo</TabsTrigger>
            </TabsList>
            
            <div className="relative mb-6">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuarios por ID, nombre o email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Todos los Usuarios */}
            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Consumo</TableHead>
                    <TableHead>Saldo App</TableHead>
                    <TableHead>Saldo NFC</TableHead>
                    <TableHead>Visitas</TableHead>
                    <TableHead>Última Actividad</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.user}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={item.consumo === "Si" 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-amber-50 text-amber-700 border-amber-200"
                          }
                        >
                          {item.consumo}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.appBalance}</TableCell>
                      <TableCell>{item.nfcBalance}</TableCell>
                      <TableCell>{item.visits}</TableCell>
                      <TableCell>{item.lastActivity}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <User className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <CreditCard className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Con Consumo */}
            <TabsContent value="consumption">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Saldo App</TableHead>
                    <TableHead>Saldo NFC</TableHead>
                    <TableHead>Visitas</TableHead>
                    <TableHead>Última Actividad</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers
                    .filter(item => item.consumo === "Si")
                    .map(item => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.user}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.appBalance}</TableCell>
                        <TableCell>{item.nfcBalance}</TableCell>
                        <TableCell>{item.visits}</TableCell>
                        <TableCell>{item.lastActivity}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <User className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Sin Consumo */}
            <TabsContent value="no-consumption">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Bar</TableHead>
                    <TableHead>Tipo de Entrada</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {noConsumptionData.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.user}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.bar}</TableCell>
                      <TableCell>{item.entry}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.time}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Registrar Consumo
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
    </>
  );
};

export default Users;
