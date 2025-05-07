
import { useState } from "react";
import { StockTransfersList } from "@/components/stock/StockTransfersList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowRightLeft, AlertCircle } from "lucide-react";
import { MultiSelectBarsField } from "@/components/bars/MultiSelectBarsField";

// Mock data for bar stock items - would be replaced with real data from API
const barStockItems = [
  { id: 1, product: "Vodka Absolut 750ml", category: "Alcoholico", quantity: 12, status: "En Stock" },
  { id: 2, product: "Cerveza", category: "Alcoholico", quantity: 48, status: "En Stock" },
  { id: 3, product: "Agua Mineral 500ml", category: "No Alcoholico", quantity: 36, status: "En Stock" },
  { id: 4, product: "Red Bull 250ml", category: "Energéticas", quantity: 24, status: "En Stock" },
  { id: 5, product: "Gin Beefeater 750ml", category: "Alcoholico", quantity: 8, status: "En Stock" },
  { id: 6, product: "Whicky Johnnie Walker", category: "Alcoholico", quantity: 6, status: "En Stock" },
];

export const StockTransfers = ({ selectedBar }: { selectedBar: string }) => {
  const [selectedItems, setSelectedItems] = useState<{[key: number]: boolean}>({});
  const [transferQuantities, setTransferQuantities] = useState<{[key: number]: number}>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDestinationBars, setSelectedDestinationBars] = useState<string[]>([]);
  
  // Filter stock items for the selected bar, for a real app this would use the selectedBar param
  const filteredStockItems = barStockItems;
  
  const handleSelectItem = (itemId: number) => {
    setSelectedItems(prev => ({
      ...prev, 
      [itemId]: !prev[itemId]
    }));
    
    // Initialize quantity to 1 if selecting, or remove if deselecting
    setTransferQuantities(prev => {
      if (!prev[itemId] || prev[itemId] === undefined) {
        return { ...prev, [itemId]: 1 };
      } else if (!selectedItems[itemId]) {
        const newQuantities = { ...prev };
        delete newQuantities[itemId];
        return newQuantities;
      }
      return prev;
    });
  };
  
  const handleQuantityChange = (itemId: number, quantity: string) => {
    const numericQuantity = parseInt(quantity);
    if (isNaN(numericQuantity) || numericQuantity <= 0) return;
    
    const maxStock = filteredStockItems.find(item => item.id === itemId)?.quantity || 0;
    
    if (numericQuantity > maxStock) {
      toast.error("No puedes transferir más unidades que el stock disponible");
      return;
    }
    
    setTransferQuantities(prev => ({
      ...prev,
      [itemId]: numericQuantity
    }));
  };
  
  const handleSelectAll = () => {
    // If all are selected, unselect all. Otherwise, select all
    const allSelected = filteredStockItems.every(item => selectedItems[item.id]);
    
    if (allSelected) {
      setSelectedItems({});
      setTransferQuantities({});
    } else {
      const newSelectedItems: {[key: number]: boolean} = {};
      const newQuantities: {[key: number]: number} = {};
      
      filteredStockItems.forEach(item => {
        newSelectedItems[item.id] = true;
        newQuantities[item.id] = 1;
      });
      
      setSelectedItems(newSelectedItems);
      setTransferQuantities(newQuantities);
    }
  };
  
  const handleTransfer = () => {
    // Here you would implement the actual transfer logic
    const selectedItemsCount = Object.keys(selectedItems).filter(key => selectedItems[Number(key)]).length;
    
    if (selectedItemsCount === 0) {
      toast.error("Selecciona al menos un producto para transferir");
      return;
    }
    
    if (selectedDestinationBars.length === 0) {
      toast.error("Selecciona al menos una barra destino");
      return;
    }
    
    // Process transfer
    toast.success(`Se ha transferido stock exitosamente a ${selectedDestinationBars.length} barras`);
    
    // Reset state
    setSelectedItems({});
    setTransferQuantities({});
    setSelectedDestinationBars([]);
    setDialogOpen(false);
  };
  
  const getSelectedItemsCount = () => {
    return Object.keys(selectedItems).filter(key => selectedItems[Number(key)]).length;
  };

  const handleDestinationBarsChange = (bars: string[]) => {
    setSelectedDestinationBars(bars);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium">Transferencias de Stock {selectedBar !== "all" ? `- ${selectedBar}` : ""}</h2>
          <p className="text-sm text-muted-foreground">Gestiona transferencias entre barras</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleSelectAll}
          >
            <Checkbox checked={filteredStockItems.every(item => selectedItems[item.id])} />
            Seleccionar todos
          </Button>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                disabled={getSelectedItemsCount() === 0}
                onClick={() => setDialogOpen(true)}
              >
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                Transferir seleccionados ({getSelectedItemsCount()})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Transferir productos</DialogTitle>
                <DialogDescription>
                  Selecciona las barras destino para transferir los productos seleccionados
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="mb-4">
                  <label className="text-sm font-medium">Barras destino</label>
                  <MultiSelectBarsField 
                    onSelectionChange={handleDestinationBarsChange}
                    placeholder="Seleccionar barras destino"
                  />
                </div>
                
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>Cantidad</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStockItems
                        .filter(item => selectedItems[item.id])
                        .map(item => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.product}</TableCell>
                            <TableCell>{transferQuantities[item.id] || 1}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
                
                {getSelectedItemsCount() === 0 && (
                  <div className="flex items-center justify-center p-4 text-amber-600">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>No hay productos seleccionados</span>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleTransfer}>
                  Confirmar transferencia
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Stock Actual</TableHead>
                <TableHead>Cantidad a Transferir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStockItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">
                    <Checkbox 
                      checked={selectedItems[item.id] || false}
                      onCheckedChange={() => handleSelectItem(item.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {item.quantity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Input
                      className="w-20"
                      type="number"
                      min={1}
                      max={item.quantity}
                      value={transferQuantities[item.id] || ""}
                      disabled={!selectedItems[item.id]}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Historial de Transferencias</CardTitle>
          <CardDescription>Registro de todas las transferencias realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <StockTransfersList selectedBar={selectedBar} />
        </CardContent>
      </Card>
    </div>
  );
};
