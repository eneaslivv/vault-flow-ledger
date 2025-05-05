
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CreditCard, 
  DollarSign,
  Search,
  User,
  Users
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for user balances
const userBalancesData = [
  { 
    id: 1, 
    user: "Usuario ID 123", 
    appBalance: "$1,500", 
    nfcBalance: "$800", 
    prTokens: "0", 
    courtesyTokens: "2",
    lastActivity: "2023-05-02"
  },
  { 
    id: 2, 
    user: "Usuario ID 456", 
    appBalance: "$2,800", 
    nfcBalance: "$1,500", 
    prTokens: "200", 
    courtesyTokens: "0",
    lastActivity: "2023-05-01"
  },
  { 
    id: 3, 
    user: "Usuario ID 789", 
    appBalance: "$950", 
    nfcBalance: "$300", 
    prTokens: "0", 
    courtesyTokens: "5",
    lastActivity: "2023-05-02"
  },
  { 
    id: 4, 
    user: "Usuario ID 101", 
    appBalance: "$3,200", 
    nfcBalance: "$2,000", 
    prTokens: "500", 
    courtesyTokens: "3",
    lastActivity: "2023-04-30"
  },
  { 
    id: 5, 
    user: "Usuario ID 112", 
    appBalance: "$750", 
    nfcBalance: "$0", 
    prTokens: "0", 
    courtesyTokens: "1",
    lastActivity: "2023-05-01"
  },
];

// Mock data for PR tokens
const prTokensData = [
  { 
    id: 1, 
    pr: "PR Juan", 
    totalTokens: "5,000", 
    usedTokens: "2,850", 
    availableTokens: "2,150",
    campaigns: "3",
    lastActivity: "2023-05-02"
  },
  { 
    id: 2, 
    pr: "PR María", 
    totalTokens: "3,500", 
    usedTokens: "1,200", 
    availableTokens: "2,300",
    campaigns: "2",
    lastActivity: "2023-05-01"
  },
  { 
    id: 3, 
    pr: "PR Carlos", 
    totalTokens: "4,000", 
    usedTokens: "3,750", 
    availableTokens: "250",
    campaigns: "4",
    lastActivity: "2023-05-02"
  },
];

// Mock data for bar transfers
const barTransfersData = [
  { 
    id: 1, 
    bar: "Bar Central", 
    totalSent: "135", 
    totalReceived: "45", 
    pendingIn: "10",
    pendingOut: "5",
    balance: "+40"
  },
  { 
    id: 2, 
    bar: "Bar Norte", 
    totalSent: "85", 
    totalReceived: "120", 
    pendingIn: "5",
    pendingOut: "15",
    balance: "-35"
  },
  { 
    id: 3, 
    bar: "Bar Sur", 
    totalSent: "95", 
    totalReceived: "75", 
    pendingIn: "15",
    pendingOut: "5",
    balance: "+20"
  },
  { 
    id: 4, 
    bar: "El Alamo", 
    totalSent: "60", 
    totalReceived: "135", 
    pendingIn: "0",
    pendingOut: "25",
    balance: "-75"
  },
];

const balanceTypes = ["Todos", "App", "NFC", "PR Tokens", "Cortesías"];

const Balances = () => {
  const [selectedBalanceType, setSelectedBalanceType] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter user balances data based on selection
  const filteredUserBalances = userBalancesData.filter(item => {
    const matchesSearch = item.user.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  
  return (
    <>
      <PageHeader 
        title="Gestión de Monedas y Saldos" 
        description="Control de diferentes tipos de saldo en el sistema"
      >
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          Añadir Saldo
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Saldo App</CardTitle>
            <CardDescription>Total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$240,500</div>
            <p className="text-sm text-muted-foreground">En 3,450 usuarios</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Saldo NFC</CardTitle>
            <CardDescription>Total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$128,750</div>
            <p className="text-sm text-muted-foreground">En 1,850 usuarios</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">PR Tokens</CardTitle>
            <CardDescription>Disponibles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">15,400</div>
            <p className="text-sm text-muted-foreground">Repartidos: 35,000</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Cortesías</CardTitle>
            <CardDescription>Activas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">980</div>
            <p className="text-sm text-muted-foreground">En 450 usuarios</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Gestión de Saldos</CardTitle>
          <CardDescription>Usuarios, PRs y bares</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="prs">PRs</TabsTrigger>
              <TabsTrigger value="bars">Bares</TabsTrigger>
            </TabsList>
            
            {/* Usuarios */}
            <TabsContent value="users">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar usuarios..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedBalanceType} onValueChange={setSelectedBalanceType}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Tipo de saldo" />
                  </SelectTrigger>
                  <SelectContent>
                    {balanceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Saldo App</TableHead>
                    <TableHead>Saldo NFC</TableHead>
                    <TableHead>PR Tokens</TableHead>
                    <TableHead>Cortesías</TableHead>
                    <TableHead>Última Actividad</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUserBalances.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.user}</TableCell>
                      <TableCell>{item.appBalance}</TableCell>
                      <TableCell>{item.nfcBalance}</TableCell>
                      <TableCell>{item.prTokens}</TableCell>
                      <TableCell>{item.courtesyTokens}</TableCell>
                      <TableCell>{item.lastActivity}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <CreditCard className="h-4 w-4" />
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
            </TabsContent>
            
            {/* PRs */}
            <TabsContent value="prs">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar PRs..."
                    className="pl-8"
                  />
                </div>
                <Button>
                  <DollarSign className="mr-2 h-4 w-4" />
                  Asignar Tokens
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PR</TableHead>
                    <TableHead>Total Tokens</TableHead>
                    <TableHead>Tokens Usados</TableHead>
                    <TableHead>Tokens Disponibles</TableHead>
                    <TableHead>Campañas Activas</TableHead>
                    <TableHead>Última Actividad</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prTokensData.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.pr}</TableCell>
                      <TableCell>{item.totalTokens}</TableCell>
                      <TableCell>{item.usedTokens}</TableCell>
                      <TableCell>{item.availableTokens}</TableCell>
                      <TableCell>{item.campaigns}</TableCell>
                      <TableCell>{item.lastActivity}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <DollarSign className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Users className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Bares */}
            <TabsContent value="bars">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bar</TableHead>
                    <TableHead>Productos Enviados</TableHead>
                    <TableHead>Productos Recibidos</TableHead>
                    <TableHead>Pendientes de Recibir</TableHead>
                    <TableHead>Pendientes de Enviar</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {barTransfersData.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.bar}</TableCell>
                      <TableCell>{item.totalSent}</TableCell>
                      <TableCell>{item.totalReceived}</TableCell>
                      <TableCell>{item.pendingIn}</TableCell>
                      <TableCell>{item.pendingOut}</TableCell>
                      <TableCell>
                        <span className={item.balance.startsWith("+") ? "text-green-600" : "text-red-600"}>
                          {item.balance}
                        </span>
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default Balances;
