
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { StockTransfers } from "@/components/bars/StockTransfers";
import { toast } from "sonner";
import { 
  BarChart,
  QrCode,
  ArrowRightLeft,
  CreditCard,
  DollarSign,
  BoxesIcon,
  Users,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

// Mock data para las barras
const barsData = [
  { 
    id: 1, 
    name: "Bar Central", 
    sales: "$82,350", 
    orders: 875, 
    qrCodes: 3, 
    staff: 5,
    stockItems: 42,
    status: "active",
    stockProducts: [
      { id: 1, name: "Cerveza Stella Artois", quantity: 120, unit: "unidades", state: "Cerrado" },
      { id: 2, name: "Gin Beefeater", quantity: 15, unit: "botellas", state: "Cerrado" },
      { id: 3, name: "Coca Cola 500ml", quantity: 200, unit: "unidades", state: "Cerrado" },
      { id: 4, name: "Fernet Branca", quantity: 25, unit: "botellas", state: "Cerrado" },
      { id: 5, name: "Agua Mineral 500ml", quantity: 150, unit: "unidades", state: "Cerrado" },
    ],
    salesByHour: [
      { hour: "19:00 - 20:00", orders: 56, amount: "$4,250" },
      { hour: "20:00 - 21:00", orders: 78, amount: "$6,420" },
      { hour: "21:00 - 22:00", orders: 125, amount: "$11,850" },
      { hour: "22:00 - 23:00", orders: 152, amount: "$14,250" },
      { hour: "23:00 - 00:00", orders: 175, amount: "$16,780" },
      { hour: "00:00 - 01:00", orders: 145, amount: "$13,800" },
    ],
    staffMembers: [
      { id: 1, name: "Juan García", role: "Bartender Principal", shift: "19:00 - 02:00", performance: "97%" },
      { id: 2, name: "Ana Martínez", role: "Bartender", shift: "19:00 - 02:00", performance: "95%" },
      { id: 3, name: "Carlos Ruiz", role: "Bartender Asistente", shift: "22:00 - 05:00", performance: "91%" },
      { id: 4, name: "Laura Sánchez", role: "Bartender Asistente", shift: "22:00 - 05:00", performance: "94%" },
      { id: 5, name: "Roberto Fernández", role: "Cajero", shift: "19:00 - 02:00", performance: "96%" },
    ],
    qrCodesData: [
      { id: 1, code: "QR-BAR-CENTRAL-01", location: "Barra Central (Entrada)", scans: 523, orders: 487, revenue: "$43,850" },
      { id: 2, code: "QR-BAR-CENTRAL-02", location: "Barra Central (VIP)", scans: 289, orders: 254, revenue: "$35,200" },
      { id: 3, code: "QR-BAR-CENTRAL-03", location: "Barra Central (General)", scans: 98, orders: 89, revenue: "$8,200" },
    ]
  },
  { 
    id: 2, 
    name: "Bar Norte", 
    sales: "$38,750", 
    orders: 412, 
    qrCodes: 2, 
    staff: 3,
    stockItems: 35,
    status: "active",
    stockProducts: [
      { id: 1, name: "Cerveza Stella Artois", quantity: 80, unit: "unidades", state: "Cerrado" },
      { id: 2, name: "Gin Beefeater", quantity: 10, unit: "botellas", state: "Cerrado" },
      { id: 3, name: "Coca Cola 500ml", quantity: 120, unit: "unidades", state: "Cerrado" },
      { id: 4, name: "Fernet Branca", quantity: 15, unit: "botellas", state: "Cerrado" },
    ],
    salesByHour: [
      { hour: "19:00 - 20:00", orders: 25, amount: "$2,100" },
      { hour: "20:00 - 21:00", orders: 40, amount: "$3,500" },
      { hour: "21:00 - 22:00", orders: 60, amount: "$5,800" },
      { hour: "22:00 - 23:00", orders: 82, amount: "$7,500" },
      { hour: "23:00 - 00:00", orders: 95, amount: "$8,900" },
      { hour: "00:00 - 01:00", orders: 70, amount: "$6,800" },
    ],
    staffMembers: [
      { id: 1, name: "María López", role: "Bartender", shift: "19:00 - 02:00", performance: "94%" },
      { id: 2, name: "Pedro Gómez", role: "Bartender Asistente", shift: "22:00 - 05:00", performance: "92%" },
      { id: 3, name: "Sofía Torres", role: "Cajero", shift: "19:00 - 02:00", performance: "95%" },
    ],
    qrCodesData: [
      { id: 1, code: "QR-BAR-NORTE-01", location: "Barra Norte (General)", scans: 478, orders: 412, revenue: "$38,750" },
      { id: 2, code: "QR-BAR-NORTE-02", location: "Barra Norte (VIP)", scans: 65, orders: 55, revenue: "$5,200" },
    ]
  },
  { 
    id: 3, 
    name: "Bar Sur", 
    sales: "$24,800", 
    orders: 265, 
    qrCodes: 1, 
    staff: 2,
    stockItems: 28,
    status: "active",
    stockProducts: [
      { id: 1, name: "Cerveza Stella Artois", quantity: 65, unit: "unidades", state: "Cerrado" },
      { id: 2, name: "Gin Beefeater", quantity: 8, unit: "botellas", state: "Cerrado" },
      { id: 3, name: "Coca Cola 500ml", quantity: 90, unit: "unidades", state: "Cerrado" },
    ],
    salesByHour: [
      { hour: "19:00 - 20:00", orders: 15, amount: "$1,200" },
      { hour: "20:00 - 21:00", orders: 30, amount: "$2,500" },
      { hour: "21:00 - 22:00", orders: 45, amount: "$4,100" },
      { hour: "22:00 - 23:00", orders: 60, amount: "$5,500" },
      { hour: "23:00 - 00:00", orders: 65, amount: "$5,900" },
      { hour: "00:00 - 01:00", orders: 50, amount: "$4,600" },
    ],
    staffMembers: [
      { id: 1, name: "Roberto Sánchez", role: "Bartender Principal", shift: "19:00 - 02:00", performance: "93%" },
      { id: 2, name: "Carmen Díaz", role: "Cajero", shift: "19:00 - 02:00", performance: "94%" },
    ],
    qrCodesData: [
      { id: 1, code: "QR-BAR-SUR-01", location: "Barra Sur (General)", scans: 298, orders: 265, revenue: "$24,800" },
    ]
  },
  { 
    id: 4, 
    name: "El Alamo", 
    sales: "$29,600", 
    orders: 320, 
    qrCodes: 1, 
    staff: 2,
    stockItems: 30,
    status: "active",
    stockProducts: [
      { id: 1, name: "Cerveza Stella Artois", quantity: 70, unit: "unidades", state: "Cerrado" },
      { id: 2, name: "Gin Beefeater", quantity: 9, unit: "botellas", state: "Cerrado" },
      { id: 3, name: "Coca Cola 500ml", quantity: 95, unit: "unidades", state: "Cerrado" },
      { id: 4, name: "Fernet Branca", quantity: 12, unit: "botellas", state: "Cerrado" },
    ],
    salesByHour: [
      { hour: "19:00 - 20:00", orders: 20, amount: "$1,800" },
      { hour: "20:00 - 21:00", orders: 35, amount: "$3,100" },
      { hour: "21:00 - 22:00", orders: 55, amount: "$5,200" },
      { hour: "22:00 - 23:00", orders: 70, amount: "$6,500" },
      { hour: "23:00 - 00:00", orders: 75, amount: "$7,000" },
      { hour: "00:00 - 01:00", orders: 65, amount: "$6,000" },
    ],
    staffMembers: [
      { id: 1, name: "Ana Martínez", role: "Bartender", shift: "19:00 - 02:00", performance: "95%" },
      { id: 2, name: "Luis Fernández", role: "Cajero", shift: "19:00 - 02:00", performance: "92%" },
    ],
    qrCodesData: [
      { id: 1, code: "QR-EL-ALAMO-01", location: "El Alamo (Entrada)", scans: 356, orders: 320, revenue: "$29,600" },
    ]
  },
];

const destinationBars = [
  { value: "1", label: "Bar Central" },
  { value: "2", label: "Bar Norte" },
  { value: "3", label: "Bar Sur" },
  { value: "4", label: "El Alamo" },
];

const BarDetail = () => {
  const { barId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("statistics");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [addStockDialogOpen, setAddStockDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  
  const form = useForm({
    defaultValues: {
      quantity: 0,
      destination: "",
      notes: "",
      transferType: "Permanente"
    }
  });

  const addStockForm = useForm({
    defaultValues: {
      productName: "",
      quantity: 0,
      unit: "unidades",
      state: "Cerrado"
    }
  });

  // Find the bar data using the barId parameter
  const barData = barsData.find(bar => bar.id === Number(barId));

  if (!barData) {
    return (
      <div className="container mx-auto p-6">
        <Button variant="outline" onClick={() => navigate('/bars')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Barras
        </Button>
        <Card>
          <CardContent className="flex items-center justify-center h-40">
            <p>Barra no encontrada</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleTransferStock = (productId: number) => {
    setSelectedProduct(productId);
    setTransferDialogOpen(true);
  };

  const handleAddStock = () => {
    setAddStockDialogOpen(true);
  };

  const handleDeleteProduct = (productId: number) => {
    setSelectedProduct(productId);
    setDeleteConfirmOpen(true);
  };

  const onSubmitTransfer = (data: any) => {
    console.log("Transferencia enviada:", data);
    setTransferDialogOpen(false);
    toast.success(`${data.quantity} unidades transferidas a ${destinationBars.find(b => b.value === data.destination)?.label}`);
    // Aquí iría la lógica para actualizar el stock
  };

  const onSubmitAddStock = (data: any) => {
    console.log("Stock agregado:", data);
    setAddStockDialogOpen(false);
    toast.success(`${data.quantity} ${data.unit} de ${data.productName} agregados al inventario`);
    // Aquí iría la lógica para actualizar el stock
  };

  const confirmDelete = () => {
    console.log("Producto eliminado:", selectedProduct);
    setDeleteConfirmOpen(false);
    toast.success("Producto eliminado del inventario");
    // Aquí iría la lógica para eliminar el producto
  };

  const selectedProductData = selectedProduct 
    ? barData.stockProducts.find(product => product.id === selectedProduct) 
    : null;

  return (
    <>
      <PageHeader 
        title={barData.name} 
        description={`Gestión detallada de ${barData.name}`}
      >
        <Button variant="outline" onClick={() => navigate('/bars')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Barras
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{barData.sales}</div>
              <div className="text-sm text-muted-foreground">Ventas Totales</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{barData.orders}</div>
              <div className="text-sm text-muted-foreground">Órdenes</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{barData.qrCodes}</div>
              <div className="text-sm text-muted-foreground">Códigos QR</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{barData.staff}</div>
              <div className="text-sm text-muted-foreground">Personal</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de {barData.name}</CardTitle>
          <CardDescription>Estadísticas, inventario y personal</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="statistics">Estadísticas</TabsTrigger>
              <TabsTrigger value="stock">Inventario</TabsTrigger>
              <TabsTrigger value="transfers">Transferencias</TabsTrigger>
              <TabsTrigger value="staff">Personal</TabsTrigger>
              <TabsTrigger value="qrcodes">Códigos QR</TabsTrigger>
            </TabsList>
            
            {/* Tab: Estadísticas */}
            <TabsContent value="statistics">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ventas por Hora</CardTitle>
                  <CardDescription>Análisis de ventas por hora del día</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Hora</TableHead>
                        <TableHead>Órdenes</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {barData.salesByHour.map((hour, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{hour.hour}</TableCell>
                          <TableCell>{hour.orders}</TableCell>
                          <TableCell>{hour.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tab: Inventario */}
            <TabsContent value="stock">
              <div className="flex justify-end mb-4">
                <Button onClick={handleAddStock}>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Stock
                </Button>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Inventario Actual</CardTitle>
                  <CardDescription>Productos disponibles en {barData.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Unidad</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {barData.stockProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{product.unit}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                              {product.state}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleTransferStock(product.id)}
                              >
                                <ArrowRightLeft className="mr-2 h-4 w-4" />
                                Transferir
                              </Button>
                              
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tab: Transferencias */}
            <TabsContent value="transfers">
              <StockTransfers selectedBar={barData.name} />
            </TabsContent>
            
            {/* Tab: Personal */}
            <TabsContent value="staff">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Asignado</CardTitle>
                  <CardDescription>Staff trabajando en {barData.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Turno</TableHead>
                        <TableHead>Performance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {barData.staffMembers.map((staff) => (
                        <TableRow key={staff.id}>
                          <TableCell className="font-medium">{staff.name}</TableCell>
                          <TableCell>{staff.role}</TableCell>
                          <TableCell>{staff.shift}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              {staff.performance}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tab: Códigos QR */}
            <TabsContent value="qrcodes">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Códigos QR</CardTitle>
                  <CardDescription>Performance de QRs en {barData.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Ubicación</TableHead>
                        <TableHead>Escaneos</TableHead>
                        <TableHead>Órdenes</TableHead>
                        <TableHead>Ingresos</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {barData.qrCodesData.map((qr) => (
                        <TableRow key={qr.id}>
                          <TableCell className="font-medium">{qr.code}</TableCell>
                          <TableCell>{qr.location}</TableCell>
                          <TableCell>{qr.scans}</TableCell>
                          <TableCell>{qr.orders}</TableCell>
                          <TableCell>{qr.revenue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialog para transferir stock */}
      <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transferir Stock</DialogTitle>
            <DialogDescription>
              Transferir stock de {selectedProductData?.name} a otra barra
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmitTransfer)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Cantidad a transferir</Label>
                <Input
                  id="quantity"
                  type="number"
                  max={selectedProductData?.quantity}
                  {...form.register("quantity", { 
                    valueAsNumber: true,
                    max: { 
                      value: selectedProductData?.quantity || 0, 
                      message: `No puedes transferir más de ${selectedProductData?.quantity} unidades` 
                    } 
                  })}
                />
                {form.formState.errors.quantity && (
                  <p className="text-red-500 text-sm">{form.formState.errors.quantity.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Barra de destino</Label>
                <Select
                  value={form.watch("destination")}
                  onValueChange={(value) => form.setValue("destination", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la barra de destino" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinationBars
                      .filter(db => db.value !== barId)
                      .map((bar) => (
                        <SelectItem key={bar.value} value={bar.value}>{bar.label}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transferType">Tipo de transferencia</Label>
                <Select
                  value={form.watch("transferType")}
                  onValueChange={(value) => form.setValue("transferType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de transferencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Permanente">Permanente</SelectItem>
                    <SelectItem value="Temporal">Temporal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notas</Label>
                <Input id="notes" {...form.register("notes")} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Transferir Stock</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog para agregar stock */}
      <Dialog open={addStockDialogOpen} onOpenChange={setAddStockDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Stock</DialogTitle>
            <DialogDescription>
              Agregar nuevo stock a {barData.name}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={addStockForm.handleSubmit(onSubmitAddStock)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Producto</Label>
                <Input id="productName" {...addStockForm.register("productName", { required: "El nombre del producto es requerido" })} />
                {addStockForm.formState.errors.productName && (
                  <p className="text-red-500 text-sm">{addStockForm.formState.errors.productName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Cantidad</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  min={1}
                  {...addStockForm.register("quantity", { 
                    valueAsNumber: true,
                    required: "La cantidad es requerida",
                    min: { value: 1, message: "La cantidad debe ser mayor a 0" }
                  })} 
                />
                {addStockForm.formState.errors.quantity && (
                  <p className="text-red-500 text-sm">{addStockForm.formState.errors.quantity.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unidad</Label>
                <Select
                  value={addStockForm.watch("unit")}
                  onValueChange={(value) => addStockForm.setValue("unit", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unidades">Unidades</SelectItem>
                    <SelectItem value="botellas">Botellas</SelectItem>
                    <SelectItem value="cajas">Cajas</SelectItem>
                    <SelectItem value="litros">Litros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Select
                  value={addStockForm.watch("state")}
                  onValueChange={(value) => addStockForm.setValue("state", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cerrado">Cerrado</SelectItem>
                    <SelectItem value="Abierto">Abierto</SelectItem>
                    <SelectItem value="Parcial">Parcial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Agregar Stock</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog para confirmar eliminación */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente {selectedProductData?.name} del inventario de {barData.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BarDetail;
