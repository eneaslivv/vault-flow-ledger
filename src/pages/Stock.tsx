import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { StockTransfers } from "@/components/bars/StockTransfers";
import { StockAdjustment } from "@/components/stock/StockAdjustment";
import { StockAdjustmentHistory } from "@/components/stock/StockAdjustmentHistory";
import { MultipleTransfer } from "@/components/stock/MultipleTransfer";
import { CustomDrinks } from "@/components/products/CustomDrinks";
import { ArrowRight, Box, Search, ShoppingCart, ArrowRightLeft, PackagePlus, PackageX, Plus, Trash, Filter } from "lucide-react";
import { ProductDetailModal } from "@/components/products/ProductDetailModal";

// Mock data for stock
const stockData = [{
  id: 1,
  product: "Agua Mineral 500ml",
  category: "No Alcoholico",
  quantity: 250,
  bar: "Bar Central",
  status: "En Stock"
}, {
  id: 2,
  product: "Red Bull 250ml",
  category: "Energéticas",
  quantity: 180,
  bar: "Bar Central",
  status: "En Stock"
}, {
  id: 3,
  product: "Vodka Absolut 750ml",
  category: "Alcoholico",
  quantity: 45,
  bar: "Bar Norte",
  status: "En Stock"
}, {
  id: 4,
  product: "Gin Beefeater 750ml",
  category: "Alcoholico",
  quantity: 38,
  bar: "Bar Sur",
  status: "En Stock"
}, {
  id: 5,
  product: "Whisky Johnnie Walker 750ml",
  category: "Alcoholico",
  quantity: 20,
  bar: "El Alamo",
  status: "En Stock"
}, {
  id: 6,
  product: "Champagne Moët & Chandon",
  category: "Alcoholico",
  quantity: 15,
  bar: "Bar Central",
  status: "En Stock"
}];

// Mock data for unredeemed
const unredeemedStockData = [{
  id: 1,
  product: "Gin Tonic Beefeater",
  quantity: 2,
  bar: "Bar Norte",
  date: "2023-05-02",
  user: "Usuario ID 123"
}, {
  id: 2,
  product: "Vodka Tonic",
  quantity: 1,
  bar: "El Alamo",
  date: "2023-05-01",
  user: "Usuario ID 456"
}, {
  id: 3,
  product: "Whisky Johnnie Walker",
  quantity: 1,
  bar: "Bar Sur",
  date: "2023-05-01",
  user: "Usuario ID 789"
}];
const bars = ["Todos", "Bar Central", "Bar Norte", "Bar Sur", "El Alamo"];
const Stock = () => {
  const navigate = useNavigate();
  const [selectedBar, setSelectedBar] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("stock");
  const [assignStockDialogOpen, setAssignStockDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [stockAdjustmentOpen, setStockAdjustmentOpen] = useState(false);
  const [productToAdjust, setProductToAdjust] = useState("");
  const [multipleTransferOpen, setMultipleTransferOpen] = useState(false);
  const [selectedStockItems, setSelectedStockItems] = useState<number[]>([]);
  const [selectedUnredeemedItems, setSelectedUnredeemedItems] = useState<number[]>([]);
  const [showUnredeemed, setShowUnredeemed] = useState(false);
  const [productDetailOpen, setProductDetailOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const assignForm = useForm({
    defaultValues: {
      quantity: 0,
      destination: "",
      notes: ""
    }
  });
  const transferForm = useForm({
    defaultValues: {
      product: "",
      quantity: 0,
      fromBar: "",
      selectedBars: [],
      transferType: "Permanente",
      notes: ""
    }
  });

  // Filter stock data based on selection and unredeemed filter
  const filteredStock = stockData.filter(item => {
    const matchesBar = selectedBar === "Todos" || item.bar === selectedBar;
    const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBar && matchesSearch && !showUnredeemed;
  });

  // Combine with unredeemed items if the filter is active
  const displayItems = showUnredeemed ? unredeemedStockData : filteredStock;
  const handleAssignStock = (productId: number) => {
    setSelectedProduct(productId);
    setAssignStockDialogOpen(true);
  };
  const handleNewTransfer = () => {
    setTransferDialogOpen(true);
  };
  const handleMultipleTransfer = () => {
    setMultipleTransferOpen(true);
  };
  const handleAdjustStock = (productName: string = "") => {
    setProductToAdjust(productName);
    setStockAdjustmentOpen(true);
  };
  const toggleStockItemSelection = (itemId: number) => {
    setSelectedStockItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };
  const toggleAllStockItems = (checked: boolean) => {
    if (checked) {
      setSelectedStockItems(displayItems.map(item => item.id));
    } else {
      setSelectedStockItems([]);
    }
  };
  const toggleBarSelection = (barName: string) => {
    const currentBars = transferForm.getValues('selectedBars') || [];
    if (currentBars.includes(barName)) {
      transferForm.setValue('selectedBars', currentBars.filter(b => b !== barName));
    } else {
      transferForm.setValue('selectedBars', [...currentBars, barName]);
    }
  };
  const handleMultipleTransferSuccess = (data: any) => {
    console.log("Transferencia múltiple completada:", data);
    // Aquí iría la lógica para actualizar el stock
    toast.success("Transferencia múltiple completada correctamente");
    setSelectedStockItems([]);
  };
  const onSubmitAssign = (data: any) => {
    console.log("Stock asignado:", data);
    const product = stockData.find(item => item.id === selectedProduct);
    setAssignStockDialogOpen(false);
    toast.success(`${data.quantity} unidades de ${product?.product} asignadas a ${data.destination}`);
    // Aquí iría la lógica para actualizar el stock
  };
  const onSubmitTransfer = (data: any) => {
    console.log("Transferencia creada:", data);
    setTransferDialogOpen(false);

    // Get selected bars
    const selectedBars = data.selectedBars || [];
    if (selectedBars.length === 0) {
      toast.error("Debes seleccionar al menos una barra de destino");
      return;
    }

    // Show success message with all selected bars
    toast.success(`${data.quantity} unidades de ${data.product} transferidas de ${data.fromBar} a ${selectedBars.join(', ')}`);
    // Aquí iría la lógica para crear la transferencia
  };
  const handleStockReingress = (data: any) => {
    console.log("Reingreso procesado:", data);
    toast.success(`${data.quantity} unidades de ${data.product} reingresadas al stock`);
    // Aquí iría la lógica para actualizar el stock
  };
  const handleStockLoss = (data: any) => {
    console.log("Pérdida registrada:", data);
    toast.success(`${data.quantity} unidades de ${data.product} registradas como pérdida`);
    // Aquí iría la lógica para actualizar el stock
  };
  const viewProductDetail = product => {
    // Construct a product object from the item data
    const productData = {
      id: product.id,
      name: product.product,
      category: product.category,
      price: "$750",
      // Mock price
      stockAvailable: product.quantity,
      limitedStock: false,
      bars: [product.bar],
      isCourtesy: false,
      courtesyRules: null,
      isTokenProduct: false,
      tokenRanks: []
    };
    setCurrentProduct(productData);
    setProductDetailOpen(true);
  };
  const selectedProductData = selectedProduct ? stockData.find(product => product.id === selectedProduct) : null;
  const areAllStockItemsSelected = displayItems.length > 0 && displayItems.every(item => selectedStockItems.includes(item.id));
  const hasSelectedStockItems = selectedStockItems.length > 0;
  return <>
      <PageHeader title="Gestión de Stock Avanzado" description="Control de inventario y transferencias">
        <Button className="mr-2" onClick={handleMultipleTransfer}>
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Transferencia Múltiple
        </Button>
        <Button className="mr-2" onClick={handleNewTransfer}>
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Transferencia Simple
        </Button>
        <Button className="mr-2" onClick={() => handleAdjustStock()}>
          <PackagePlus className="mr-2 h-4 w-4" />
          Ajustar Stock
        </Button>
        <Button>
          <Box className="mr-2 h-4 w-4" />
          Añadir Stock
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Stock Total</CardTitle>
            <CardDescription>Productos disponibles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,480</div>
            <p className="text-sm text-gray-500">En todos los bares</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Transferencias</CardTitle>
            <CardDescription>Último mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">79</div>
            <p className="text-sm text-gray-500">Entre bares</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pendientes</CardTitle>
            <CardDescription>Sin retirar o en tránsito</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45</div>
            <p className="text-sm text-gray-500">Valor: $8,250</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventario Detallado</CardTitle>
          <CardDescription>Productos, transferencias, pendientes y ajustes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Buscar productos..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <Select value={selectedBar} onValueChange={setSelectedBar}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Seleccionar bar" />
              </SelectTrigger>
              <SelectContent>
                {bars.map(bar => <SelectItem key={bar} value={bar}>
                    {bar}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="unredeemedFilter" checked={showUnredeemed} onCheckedChange={() => setShowUnredeemed(!showUnredeemed)} />
                <Label htmlFor="unredeemedFilter">Mostrar solo productos no retirados</Label>
              </div>
              
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Más filtros
              </Button>
            </div>
            
            {hasSelectedStockItems && <div className="flex items-center space-x-2">
                <Badge variant="outline">{selectedStockItems.length} seleccionados</Badge>
                <Button variant="outline" size="sm" onClick={handleMultipleTransfer}>
                  <ArrowRightLeft className="h-4 w-4 mr-1" /> Transferir
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash className="h-4 w-4 mr-1" /> Eliminar
                </Button>
              </div>}
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stock">En Stock y Reasignaciones</TabsTrigger>
              <TabsTrigger value="custom">Tragos Personalizados</TabsTrigger>
              <TabsTrigger value="transfers">Transferencias</TabsTrigger>
              <TabsTrigger value="adjustments">Ajustes</TabsTrigger>
            </TabsList>
            
            {/* En Stock y Reasignaciones */}
            <TabsContent value="stock">              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[48px]">
                      <Checkbox checked={areAllStockItemsSelected} onCheckedChange={toggleAllStockItems} />
                    </TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Bar</TableHead>
                    <TableHead>Estado</TableHead>
                    {showUnredeemed && <TableHead>Fecha</TableHead>}
                    {showUnredeemed && <TableHead>Usuario</TableHead>}
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayItems.map(item => <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox checked={selectedStockItems.includes(item.id)} onCheckedChange={() => toggleStockItemSelection(item.id)} />
                      </TableCell>
                      <TableCell className="font-medium">
                        <Button variant="link" onClick={() => viewProductDetail(item)} className="p-0 h-auto font-medium text-orange-900">
                          {item.product}
                        </Button>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800" onClick={() => goToBarDetail(item.bar)}>
                          {item.bar}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={item.status === "En Stock" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      {showUnredeemed && <TableCell>{item.date}</TableCell>}
                      {showUnredeemed && <TableCell>{item.user}</TableCell>}
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => item.status === "En Stock" ? handleAssignStock(item.id) : handleAdjustStock(item.product)}>
                            {item.status === "En Stock" ? <>
                                <ArrowRightLeft className="mr-2 h-4 w-4" />
                                Asignar
                              </> : <>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Marcar retirado
                              </>}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleAdjustStock(item.product)}>
                            <PackagePlus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Tragos Personalizados */}
            <TabsContent value="custom">
              <CustomDrinks selectedBar={selectedBar.toLowerCase()} showCheckboxes={true} />
            </TabsContent>
            
            {/* Transferencias */}
            <TabsContent value="transfers">
              <StockTransfers selectedBar="all" />
            </TabsContent>
            
            {/* Ajustes de Stock */}
            <TabsContent value="adjustments">
              <StockAdjustmentHistory />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialog para asignar stock */}
      <Dialog open={assignStockDialogOpen} onOpenChange={setAssignStockDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Asignar Stock a Barra</DialogTitle>
            <DialogDescription>
              Asignar unidades de {selectedProductData?.product} a una barra
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={assignForm.handleSubmit(onSubmitAssign)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Cantidad a asignar</Label>
                <Input id="quantity" type="number" max={selectedProductData?.quantity} {...assignForm.register("quantity", {
                valueAsNumber: true,
                max: {
                  value: selectedProductData?.quantity || 0,
                  message: `No puedes asignar más de ${selectedProductData?.quantity} unidades`
                }
              })} />
                {assignForm.formState.errors.quantity && <p className="text-red-500 text-sm">{assignForm.formState.errors.quantity.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Barra de destino</Label>
                <Select value={assignForm.watch("destination")} onValueChange={value => assignForm.setValue("destination", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la barra de destino" />
                  </SelectTrigger>
                  <SelectContent>
                    {bars.filter(bar => bar !== "Todos" && bar !== selectedProductData?.bar).map(bar => <SelectItem key={bar} value={bar}>{bar}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notas</Label>
                <Input id="notes" {...assignForm.register("notes")} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Asignar Stock</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog para nueva transferencia with multi-bar selection*/}
      <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nueva Transferencia</DialogTitle>
            <DialogDescription>
              Crear una nueva transferencia a múltiples barras
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={transferForm.handleSubmit(onSubmitTransfer)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="product">Producto</Label>
                <Input id="product" {...transferForm.register("product", {
                required: "El producto es requerido"
              })} />
                {transferForm.formState.errors.product && <p className="text-red-500 text-sm">{transferForm.formState.errors.product.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Cantidad</Label>
                <Input id="quantity" type="number" min={1} {...transferForm.register("quantity", {
                valueAsNumber: true,
                required: "La cantidad es requerida",
                min: {
                  value: 1,
                  message: "La cantidad debe ser mayor a 0"
                }
              })} />
                {transferForm.formState.errors.quantity && <p className="text-red-500 text-sm">{transferForm.formState.errors.quantity.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromBar">Barra de origen</Label>
                <Select value={transferForm.watch("fromBar")} onValueChange={value => transferForm.setValue("fromBar", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la barra de origen" />
                  </SelectTrigger>
                  <SelectContent>
                    {bars.filter(bar => bar !== "Todos").map(bar => <SelectItem key={bar} value={bar}>{bar}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Barras de destino</Label>
                <div className="grid grid-cols-2 gap-2 border rounded-md p-3">
                  {bars.filter(bar => bar !== "Todos" && bar !== transferForm.watch("fromBar")).map(bar => <div key={bar} className="flex items-center space-x-2">
                        <Checkbox id={`bar-${bar}`} checked={transferForm.watch("selectedBars")?.includes(bar) || false} onCheckedChange={() => toggleBarSelection(bar)} />
                        <Label htmlFor={`bar-${bar}`}>{bar}</Label>
                      </div>)}
                </div>
                {transferForm.watch("selectedBars")?.length === 0 && <p className="text-amber-500 text-sm">Selecciona al menos una barra de destino</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transferType">Tipo de transferencia</Label>
                <Select value={transferForm.watch("transferType")} onValueChange={value => transferForm.setValue("transferType", value)}>
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
                <Input id="notes" {...transferForm.register("notes")} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Crear Transferencia</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog para transferencia múltiple */}
      <Dialog open={multipleTransferOpen} onOpenChange={setMultipleTransferOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <MultipleTransfer onClose={() => setMultipleTransferOpen(false)} onSuccess={handleMultipleTransferSuccess} />
        </DialogContent>
      </Dialog>

      {/* Modal para ajustar stock */}
      <StockAdjustment open={stockAdjustmentOpen} onOpenChange={setStockAdjustmentOpen} initialProduct={productToAdjust} onSubmitReingress={handleStockReingress} onSubmitLoss={handleStockLoss} />
      
      {/* Product Detail Modal */}
      <ProductDetailModal open={productDetailOpen} onOpenChange={setProductDetailOpen} product={currentProduct} />
    </>;
};
function goToBarDetail(barName: string) {
  const bar = bars.findIndex(b => b === barName);
  if (bar > 0) {
    // Skipping "Todos"
    window.location.href = `/bars/${bar}`;
  }
}
export default Stock;