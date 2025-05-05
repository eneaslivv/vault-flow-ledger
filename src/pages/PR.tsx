
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  DollarSign,
  Gift,
  Search,
  User,
  Users,
  CalendarIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for PRs
const prsData = [
  { 
    id: 1, 
    name: "Juan Martínez", 
    email: "juan.pr@example.com", 
    tokens: "5,000",
    usedTokens: "2,850",
    campaigns: "3",
    courtesies: "24",
    lastActivity: "2023-05-02"
  },
  { 
    id: 2, 
    name: "María López", 
    email: "maria.pr@example.com", 
    tokens: "3,500",
    usedTokens: "1,200",
    campaigns: "2",
    courtesies: "15",
    lastActivity: "2023-05-01"
  },
  { 
    id: 3, 
    name: "Carlos Rodríguez", 
    email: "carlos.pr@example.com", 
    tokens: "4,000",
    usedTokens: "3,750",
    campaigns: "4",
    courtesies: "32",
    lastActivity: "2023-05-02"
  },
  { 
    id: 4, 
    name: "Ana Fernández", 
    email: "ana.pr@example.com", 
    tokens: "2,500",
    usedTokens: "900",
    campaigns: "1",
    courtesies: "8",
    lastActivity: "2023-04-30"
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

const PR = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter PRs data based on search
  const filteredPRs = prsData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  
  return (
    <>
      <PageHeader 
        title="Dashboard de PR" 
        description="Gestión de PRs, tokens, cortesías y campañas"
      >
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Nuevo PR
        </Button>
      </PageHeader>

      <Card className="mb-6">
        <CardContent className="p-6">
          <Tabs defaultValue="prs">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="prs">PRs</TabsTrigger>
              <TabsTrigger value="courtesies">Cortesías</TabsTrigger>
              <TabsTrigger value="campaigns">Campañas</TabsTrigger>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tokens Total</TableHead>
                    <TableHead>Tokens Usados</TableHead>
                    <TableHead>Campañas</TableHead>
                    <TableHead>Cortesías</TableHead>
                    <TableHead>Última Actividad</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPRs.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.tokens}</TableCell>
                      <TableCell>{item.usedTokens}</TableCell>
                      <TableCell>{item.campaigns}</TableCell>
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
              <div className="flex justify-end mb-4">
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
                  {courtesiesData.map(item => (
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
                          <Gift className="h-4 w-4" />
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
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default PR;
