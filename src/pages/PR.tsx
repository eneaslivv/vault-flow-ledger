import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  CreditCard, 
  DollarSign,
  Gift,
  Search,
  User,
  Users,
  CalendarIcon,
  Filter,
  Eye,
  Plus
} from "lucide-react";

// Mock data for PRs
const prsData = [
  { 
    id: 1, 
    name: "Juan Martínez", 
    email: "juan.pr@example.com", 
    tokens: "5,000",
    usedTokens: "2,850",
    appBalance: "1,500",
    campaigns: "3",
    courtesies: "24",
    lastActivity: "2023-05-02",
    rank: "VIP"
  },
  { 
    id: 2, 
    name: "María López", 
    email: "maria.pr@example.com", 
    tokens: "3,500",
    usedTokens: "1,200",
    appBalance: "800",
    campaigns: "2",
    courtesies: "15",
    lastActivity: "2023-05-01",
    rank: "Standard"
  },
  { 
    id: 3, 
    name: "Carlos Rodríguez", 
    email: "carlos.pr@example.com", 
    tokens: "4,000",
    usedTokens: "3,750",
    appBalance: "2,000",
    campaigns: "4",
    courtesies: "32",
    lastActivity: "2023-05-02",
    rank: "Premium"
  },
  { 
    id: 4, 
    name: "Ana Fernández", 
    email: "ana.pr@example.com", 
    tokens: "2,500",
    usedTokens: "900",
    appBalance: "500",
    campaigns: "1",
    courtesies: "8",
    lastActivity: "2023-04-30",
    rank: "Standard"
  },
];

// Mock data for courtesies
const courtesiesData = [
  { 
    id: 1, 
    pr: "Juan Martínez", 
    product: "Vodka Red Bull", 
    recipient: "Mesa VIP 1", 
    bar: "El Alamo",
    type: "PR",
    date: "2023-05-02"
  },
  { 
    id: 2, 
    pr: "María López", 
    product: "Gin Tonic", 
    recipient: "Influencer @maria", 
    bar: "Bar Norte",
    type: "PR",
    date: "2023-05-01"
  },
  { 
    id: 3, 
    pr: "Carlos Rodríguez", 
    product: "Champagne", 
    recipient: "Cumpleaños Cliente", 
    bar: "Bar Central",
    type: "PR",
    date: "2023-05-02"
  },
  { 
    id: 4, 
    pr: "Juan Martínez", 
    product: "Whisky Premium", 
    recipient: "Cliente VIP ID 789", 
    bar: "Bar Sur",
    type: "PR",
    date: "2023-05-01"
  },
];

// Mock data for campaigns
const campaignsData = [
  { 
    id: 1, 
    name: "Lanzamiento Verano", 
    pr: "Juan Martínez", 
    tokens: "2,000", 
    usedTokens: "1,450",
    status: "Activa",
    startDate: "2023-04-15",
    endDate: "2023-06-15"
  },
  { 
    id: 2, 
    name: "Universitarios", 
    pr: "María López", 
    tokens: "1,500", 
    usedTokens: "800",
    status: "Activa",
    startDate: "2023-05-01",
    endDate: "2023-07-01"
  },
  { 
    id: 3, 
    name: "Fiesta Hallowen", 
    pr: "Carlos Rodríguez", 
    tokens: "1,000", 
    usedTokens: "950",
    status: "Finalizada",
    startDate: "2023-10-15",
    endDate: "2023-11-01"
  },
  { 
    id: 4, 
    name: "Promo Navidad", 
    pr: "Ana Fernández", 
    tokens: "2,500", 
    usedTokens: "900",
    status: "Programada",
    startDate: "2023-12-01",
    endDate: "2023-12-31"
  },
];

// Mock data for PR token usage history
const tokenUsageData = [
  { 
    id: 1, 
    pr: "Juan Martínez", 
    product: "Vodka Red Bull", 
    amount: "150 tokens", 
    paymentMethod: "PR Tokens",
    bar: "Bar VIP",
    date: "2023-05-02",
    time: "23:45"
  },
  { 
    id: 2, 
    pr: "María López", 
    product: "Gin Tonic", 
    amount: "120 tokens", 
    paymentMethod: "PR Tokens",
    bar: "Bar Norte",
    date: "2023-05-01",
    time: "22:30"
  },
  { 
    id: 3, 
    pr: "Carlos Rodríguez", 
    product: "Champagne", 
    amount: "$3,500", 
    paymentMethod: "App Balance",
    bar: "Bar Central",
    date: "2023-05-02",
    time: "21:15"
  },
  { 
    id: 4, 
    pr: "Juan Martínez", 
    product: "Whisky Premium", 
    amount: "0", 
    paymentMethod: "Cortesía",
    bar: "Bar Sur",
    date: "2023-05-01",
    time: "23:10"
  },
];

// Add Balance form schema
const addBalanceSchema = z.object({
  prId: z.string().min(1, "Seleccione un PR"),
  balanceType: z.string().min(1, "Seleccione un tipo de saldo"),
  amount: z.string().min(1, "Ingrese un monto"),
  reason: z.string().optional(),
});

const PR = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedView, setSelectedView] = useState<string>("all");
  const [isAddBalanceOpen, setIsAddBalanceOpen] = useState(false);
  const [selectedPR, setSelectedPR] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string>("all");
  
  const addBalanceForm = useForm<z.infer<typeof addBalanceSchema>>({
    resolver: zodResolver(addBalanceSchema),
    defaultValues: {
      prId: "",
      balanceType: "",
      amount: "",
      reason: "",
    },
  });

  // Filter PRs data based on search
  const filteredPRs = prsData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Handle adding balance to PR account
  const handleAddBalance = (data: z.infer<typeof addBalanceSchema>) => {
    // Here you would implement the actual balance addition logic
    console.log("Adding balance:", data);
    setIsAddBalanceOpen(false);
    addBalanceForm.reset();
  };

  // Filter token usage data based on selected PR
  const filteredTokenUsage = tokenUsageData.filter(item => {
    if (selectedPR && selectedPR !== "all") {
      return item.pr === selectedPR;
    }
    return true;
  });
  
  return (
    <>
      <PageHeader 
        title="Dashboard de PR" 
        description="Gestión de PRs, tokens, cortesías y campañas"
      >
        <Button variant="outline" className="mr-2">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
        <Dialog open={isAddBalanceOpen} onOpenChange={setIsAddBalanceOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mr-2">
              <DollarSign className="mr-2 h-4 w-4" />
              Agregar Saldo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar Saldo a PR</DialogTitle>
            </DialogHeader>
            <Form {...addBalanceForm}>
              <form onSubmit={addBalanceForm.handleSubmit(handleAddBalance)} className="space-y-4">
                <FormField
                  control={addBalanceForm.control}
                  name="prId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seleccionar PR</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un PR" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {prsData.map(pr => (
                            <SelectItem key={pr.id} value={pr.id.toString()}>
                              {pr.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addBalanceForm.control}
                  name="balanceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Saldo</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione tipo de saldo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tokens">PR Tokens</SelectItem>
                          <SelectItem value="appBalance">Saldo App</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addBalanceForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monto</FormLabel>
                      <FormControl>
                        <Input placeholder="500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addBalanceForm.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motivo (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Campaña especial, bonus, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddBalanceOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Agregar Saldo
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Nuevo PR
        </Button>
      </PageHeader>

      <Card className="mb-6">
        <CardContent className="p-6">
          <Tabs defaultValue="prs">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="prs">PRs</TabsTrigger>
              <TabsTrigger value="courtesies">Cortesías</TabsTrigger>
              <TabsTrigger value="campaigns">Campañas</TabsTrigger>
              <TabsTrigger value="tokenUsage">Uso de Tokens</TabsTrigger>
            </TabsList>
            
            <div className="relative mb-6">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* PRs */}
            <TabsContent value="prs">
              <div className="mb-4 flex justify-between items-center">
                <Select value={selectedView} onValueChange={setSelectedView}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Ver todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los PRs</SelectItem>
                    <SelectItem value="vip">Solo VIP</SelectItem>
                    <SelectItem value="premium">Solo Premium</SelectItem>
                    <SelectItem value="standard">Solo Standard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rango</TableHead>
                    <TableHead>Tokens Total</TableHead>
                    <TableHead>Tokens Usados</TableHead>
                    <TableHead>Saldo App</TableHead>
                    <TableHead>Cortesías</TableHead>
                    <TableHead>Última Actividad</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPRs
                    .filter(item => {
                      if (selectedView === "all") return true;
                      return item.rank.toLowerCase() === selectedView.toLowerCase();
                    })
                    .map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            item.rank === "VIP" 
                              ? "bg-purple-50 text-purple-700 border-purple-200" 
                              : item.rank === "Premium"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        >
                          {item.rank}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.tokens}</TableCell>
                      <TableCell>{item.usedTokens}</TableCell>
                      <TableCell>${item.appBalance}</TableCell>
                      <TableCell>{item.courtesies}</TableCell>
                      <TableCell>{item.lastActivity}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <User className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <DollarSign className="h-4 w-4" />
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
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4">
                  <Select value={selectedPR || "all"} onValueChange={setSelectedPR}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Todos los PRs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los PRs</SelectItem>
                      {prsData.map(pr => (
                        <SelectItem key={pr.id} value={pr.name}>
                          {pr.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Todas las fechas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las fechas</SelectItem>
                      <SelectItem value="today">Hoy</SelectItem>
                      <SelectItem value="week">Esta semana</SelectItem>
                      <SelectItem value="month">Este mes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button>
                  <Gift className="mr-2 h-4 w-4" />
                  Nueva Cortesía
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PR</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Destinatario</TableHead>
                    <TableHead>Bar</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courtesiesData
                    .filter(item => {
                      if (selectedPR && selectedPR !== "all") {
                        return item.pr === selectedPR;
                      }
                      return true;
                    })
                    .map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.pr}</TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>{item.recipient}</TableCell>
                      <TableCell>{item.bar}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className="bg-vares-50 text-vares-700 border-vares-200"
                        >
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Campañas */}
            <TabsContent value="campaigns">
              <div className="flex justify-end mb-4">
                <Button>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Nueva Campaña
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>PR</TableHead>
                    <TableHead>Tokens Asignados</TableHead>
                    <TableHead>Tokens Usados</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha Inicio</TableHead>
                    <TableHead>Fecha Fin</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaignsData.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.pr}</TableCell>
                      <TableCell>{item.tokens}</TableCell>
                      <TableCell>{item.usedTokens}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            item.status === "Activa" 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : item.status === "Finalizada"
                                ? "bg-gray-50 text-gray-700 border-gray-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.startDate}</TableCell>
                      <TableCell>{item.endDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <CalendarIcon className="h-4 w-4" />
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
            
            {/* Token Usage */}
            <TabsContent value="tokenUsage">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4">
                  <Select value={selectedPR || "all"} onValueChange={setSelectedPR}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Todos los PRs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los PRs</SelectItem>
                      {prsData.map(pr => (
                        <SelectItem key={pr.id} value={pr.name}>
                          {pr.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Todas las fechas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las fechas</SelectItem>
                      <SelectItem value="today">Hoy</SelectItem>
                      <SelectItem value="week">Esta semana</SelectItem>
                      <SelectItem value="month">Este mes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PR</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Método de Pago</TableHead>
                    <TableHead>Bar</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTokenUsage.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.pr}</TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            item.paymentMethod === "PR Tokens" 
                              ? "bg-purple-50 text-purple-700 border-purple-200" 
                              : item.paymentMethod === "App Balance"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {item.paymentMethod}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.bar}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.time}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
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

export default PR;
