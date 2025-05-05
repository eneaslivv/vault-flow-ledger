import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/StatsCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Banknote, CreditCard, ArrowRightLeft, User, Archive } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock data for the financial sources
const financialSourcesData = [
  { id: 1, type: "Efectivo", amount: "$45,500", user: "Admin Central", bar: "Bar Central", date: "2023-05-02" },
  { id: 2, type: "NFC", amount: "$28,350", user: "Admin Norte", bar: "Bar Norte", date: "2023-05-02" },
  { id: 3, type: "Transferencia", amount: "$12,800", user: "Admin Sur", bar: "Bar Sur", date: "2023-05-01" },
  { id: 4, type: "PR Token", amount: "$8,750", user: "PR Juan", bar: "El Alamo", date: "2023-05-01" },
  { id: 5, type: "Efectivo", amount: "$32,200", user: "Admin Central", bar: "Bar Central", date: "2023-04-30" },
];

// Mock data for special transfers
const specialTransfersData = [
  { id: 1, product: "Agua Mineral", quantity: 50, fromBar: "Bar Central", toBar: "El Alamo", date: "2023-05-02", status: "Completada" },
  { id: 2, product: "Red Bull", quantity: 24, fromBar: "Bar Norte", toBar: "Bar Sur", date: "2023-05-01", status: "Pendiente" },
  { id: 3, product: "Vodka Premium", quantity: 5, fromBar: "Bar Central", toBar: "Bar Norte", date: "2023-04-30", status: "Completada" },
];

// Mock data for unredeemed purchases
const unredeemedPurchasesData = [
  { id: 1, product: "Gin Tonic", price: "$800", user: "Usuario ID 123", bar: "Bar Norte", date: "2023-05-02" },
  { id: 2, product: "Vodka Tonic", price: "$750", user: "Usuario ID 456", bar: "El Alamo", date: "2023-05-01" },
  { id: 3, product: "Whisky", price: "$950", user: "Usuario ID 789", bar: "Bar Sur", date: "2023-05-01" },
];

// Mock data for courtesies
const courtesiesData = [
  { id: 1, product: "Vodka Red Bull", type: "PR", givenBy: "PR Juan", user: "Mesa VIP", bar: "El Alamo", date: "2023-05-02" },
  { id: 2, product: "Champagne", type: "Admin", givenBy: "Admin Central", user: "Cliente Premium", bar: "Bar Central", date: "2023-05-01" },
  { id: 3, product: "Gin Tonic", type: "Evento", givenBy: "Sistema", user: "Promoción", bar: "Bar Norte", date: "2023-04-30" },
];

const Finances = () => {
  const isMobile = useIsMobile();
  const colSpan = isMobile ? "col-span-12" : "col-span-3";
  
  return (
    <>
      <PageHeader 
        title="Finanzas Internas" 
        description="Gestión centralizada de fondos, transferencias e ingresos"
      >
        <Button>Exportar Datos</Button>
      </PageHeader>

      <div className="grid grid-cols-12 gap-4 mb-6">
        <StatsCard
          title="Ingresos Totales"
          value="$127,600"
          description="Último mes"
          icon={<Banknote className="h-4 w-4" />}
          className={colSpan}
        />
        <StatsCard
          title="Transferencias Especiales"
          value="79"
          description="Valor estimado: $15,800"
          icon={<Transfer className="h-4 w-4" />}
          className={colSpan}
        />
        <StatsCard
          title="Ingresos sin Retiro"
          value="$8,250"
          description="45 productos"
          icon={<Archive className="h-4 w-4" />}
          className={colSpan}
        />
        <StatsCard
          title="Cortesías"
          value="124"
          description="Valor: $24,800"
          icon={<User className="h-4 w-4" />}
          className={colSpan}
        />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Finanzas Detalladas</CardTitle>
          <CardDescription>Orígenes de fondos, transferencias y movimientos</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sources">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="sources">Orígenes del Dinero</TabsTrigger>
              <TabsTrigger value="transfers">Transferencias Especiales</TabsTrigger>
              <TabsTrigger value="unredeemed">Ingresos sin Retiro</TabsTrigger>
              <TabsTrigger value="courtesies">Cortesías</TabsTrigger>
            </TabsList>
            
            {/* Orígenes del Dinero */}
            <TabsContent value="sources">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Cargado por</TableHead>
                    <TableHead>Bar</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialSourcesData.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>{item.user}</TableCell>
                      <TableCell>{item.bar}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <CreditCard className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Transferencias Especiales */}
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
                  {specialTransfersData.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.fromBar}</TableCell>
                      <TableCell>{item.toBar}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <span className={item.status === "Completada" ? "text-green-600" : "text-amber-600"}>
                          {item.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Ingresos sin Retiro */}
            <TabsContent value="unredeemed">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Bar</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unredeemedPurchasesData.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.user}</TableCell>
                      <TableCell>{item.bar}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Marcar como retirado</Button>
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
                    <TableHead>Tipo de Cortesía</TableHead>
                    <TableHead>Otorgado por</TableHead>
                    <TableHead>Destinatario</TableHead>
                    <TableHead>Bar</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courtesiesData.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.givenBy}</TableCell>
                      <TableCell>{item.user}</TableCell>
                      <TableCell>{item.bar}</TableCell>
                      <TableCell>{item.date}</TableCell>
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

export default Finances;
