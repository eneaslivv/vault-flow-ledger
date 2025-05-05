
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    transferType: "Permanente",
    productState: "Cerrado"
  },
  { 
    id: 2, 
    product: "Red Bull 250ml", 
    quantity: 24, 
    fromBar: "Bar Norte", 
    toBar: "Bar Sur", 
    date: "2023-05-01", 
    status: "Pendiente",
    transferType: "Temporal",
    productState: "Cerrado"
  },
  { 
    id: 3, 
    product: "Vodka Absolut 750ml", 
    quantity: 5, 
    fromBar: "Bar Central", 
    toBar: "Bar Norte", 
    date: "2023-04-30", 
    status: "Completada",
    transferType: "Permanente",
    productState: "Cerrado"
  },
  { 
    id: 4, 
    product: "Gin Beefeater 750ml", 
    quantity: 3, 
    fromBar: "Bar Norte", 
    toBar: "Bar VIP", 
    date: "2023-04-30", 
    status: "Completada",
    transferType: "Permanente",
    productState: "Cerrado"
  },
  { 
    id: 5, 
    product: "Vino Malbec 750ml", 
    quantity: 1, 
    fromBar: "Bar Central", 
    toBar: "Bar VIP", 
    date: "2023-04-29", 
    status: "Completada",
    transferType: "Temporal",
    productState: "Abierto (3/4)"
  },
  { 
    id: 6, 
    product: "Whisky Johnnie Walker 750ml", 
    quantity: 2, 
    fromBar: "Bar Central", 
    toBar: "El Alamo", 
    date: "2023-04-29", 
    status: "Completada",
    transferType: "Permanente",
    productState: "Cerrado"
  },
];

// Filter options
const transferTypeOptions = ["Todos", "Permanente", "Temporal"];
const statusOptions = ["Todos", "Completada", "Pendiente", "En tránsito"];

export const StockTransfers = ({ selectedBar }: { selectedBar: string }) => {
  const [transferType, setTransferType] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");
  
  // Filter logic
  const filteredTransfers = transfersData.filter(transfer => {
    const matchesBar = selectedBar === "all" || 
                      transfer.fromBar.toLowerCase().includes(selectedBar.replace(/([A-Z])/g, ' $1').trim().toLowerCase()) || 
                      transfer.toBar.toLowerCase().includes(selectedBar.replace(/([A-Z])/g, ' $1').trim().toLowerCase());
    const matchesType = transferType === "Todos" || transfer.transferType === transferType;
    const matchesStatus = statusFilter === "Todos" || transfer.status === statusFilter;
    
    return matchesBar && matchesType && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select value={transferType} onValueChange={setTransferType}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Tipo de transferencia" />
          </SelectTrigger>
          <SelectContent>
            {transferTypeOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="ml-auto">
          <Button>
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Nueva Transferencia
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Transferencias entre Barras</CardTitle>
          <CardDescription>Movimiento de productos entre barras</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Origen</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado Producto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransfers.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell className="font-medium">{transfer.product}</TableCell>
                  <TableCell>{transfer.quantity}</TableCell>
                  <TableCell>{transfer.fromBar}</TableCell>
                  <TableCell>{transfer.toBar}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        transfer.transferType === "Permanente"
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }
                    >
                      {transfer.transferType}
                    </Badge>
                  </TableCell>
                  <TableCell>{transfer.productState}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        transfer.status === "Completada" 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }
                    >
                      {transfer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
