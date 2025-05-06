import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { StockAdjustment } from "@/components/stock/StockAdjustment";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BookOpen, Plus, Edit, Trash, Eye, Filter, PackagePlus, PackageX, Gift, Coins, MoreVertical } from "lucide-react";
import { CustomDrinks } from "@/components/products/CustomDrinks";

// Mock data for products
const productsData = [{
  id: 1,
  name: "Gin Tonic",
  category: "Bebidas",
  price: "$800",
  stockAvailable: 120,
  limitedStock: false,
  bars: ["Bar Central", "Bar Norte", "Bar VIP"],
  isCourtesy: true,
  courtesyRules: {
    maxPerNight: 10,
    allowedRanks: ["VIP", "Premium"]
  },
  isTokenProduct: true,
  tokenRanks: ["VIP", "Premium"]
}, {
  id: 2,
  name: "Vodka Tonic",
  category: "Bebidas",
  price: "$750",
  stockAvailable: 85,
  limitedStock: false,
  bars: ["Bar Central", "Bar Norte"],
  isCourtesy: true,
  courtesyRules: {
    maxPerNight: 8,
    allowedRanks: ["VIP", "Premium", "Standard"]
  },
  isTokenProduct: true,
  tokenRanks: ["VIP", "Premium", "Standard"]
}, {
  id: 3,
  name: "Cerveza",
  category: "Bebidas",
  price: "$500",
  stockAvailable: 200,
  limitedStock: false,
  bars: ["Bar Central", "Bar Norte", "Bar Sur"],
  isCourtesy: false,
  courtesyRules: null,
  isTokenProduct: true,
  tokenRanks: ["VIP", "Premium", "Standard"]
}, {
  id: 4,
  name: "Fernet con Coca",
  category: "Bebidas",
  price: "$700",
  stockAvailable: 150,
  limitedStock: false,
  bars: ["Bar Central", "Bar Norte", "Bar Sur"],
  isCourtesy: true,
  courtesyRules: {
    maxPerNight: 6,
    allowedRanks: ["VIP"]
  },
  isTokenProduct: true,
  tokenRanks: ["VIP"]
}, {
  id: 5,
  name: "Champagne",
  category: "Bebidas Premium",
  price: "$12500",
  stockAvailable: 25,
  limitedStock: true,
  bars: ["Bar VIP"],
  isCourtesy: true,
  courtesyRules: {
    maxPerNight: 2,
    allowedRanks: ["VIP"]
  },
  isTokenProduct: false,
  tokenRanks: []
}, {
  id: 6,
  name: "Nachos",
  category: "Comidas",
  price: "$600",
  stockAvailable: 35,
  limitedStock: true,
  bars: ["Bar Central", "Bar Norte"],
  isCourtesy: false,
  courtesyRules: null,
  isTokenProduct: true,
  tokenRanks: ["VIP", "Premium", "Standard"]
}, {
  id: 7,
  name: "Combo Fiesta",
  category: "Combos",
  price: "$5000",
  stockAvailable: 10,
  limitedStock: true,
  bars: ["Bar VIP"],
  isCourtesy: false,
  courtesyRules: null,
  isTokenProduct: false,
  tokenRanks: []
}];

// Mock data for categories
const categoriesData = [{
  id: 1,
  name: "Bebidas",
  productsCount: 15,
  description: "Bebidas alcohólicas y no alcohólicas"
}, {
  id: 2,
  name: "Bebidas Premium",
  productsCount: 8,
  description: "Bebidas exclusivas y de alta gama"
}, {
  id: 3,
  name: "Comidas",
  productsCount: 6,
  description: "Opciones para acompañar bebidas"
}, {
  id: 4,
  name: "Combos",
  productsCount: 5,
  description: "Combinaciones de productos con descuento"
}];

// Mock data for price by bar
const pricesByBarData = [{
  productId: 1,
  productName: "Gin Tonic",
  barCentral: "$800",
  barNorte: "$850",
  barSur: "$850",
  barVIP: "$950"
}, {
  productId: 2,
  productName: "Vodka Tonic",
  barCentral: "$750",
  barNorte: "$800",
  barSur: "-",
  barVIP: "-"
}, {
  productId: 3,
  productName: "Cerveza",
  barCentral: "$500",
  barNorte: "$550",
  barSur: "$550",
  barVIP: "$650"
}, {
  productId: 4,
  productName: "Fernet con Coca",
  barCentral: "$700",
  barNorte: "$750",
  barSur: "$750",
  barVIP: "-"
}, {
  productId: 5,
  productName: "Champagne",
  barCentral: "-",
  barNorte: "-",
  barSur: "-",
  barVIP: "$12500"
}];
const CourtesySettingsDialog = ({
  product,
  onSave
}) => {
  const [maxPerNight, setMaxPerNight] = useState(product?.courtesyRules?.maxPerNight || 5);
  const [allowedRanks, setAllowedRanks] = useState<string[]>(product?.courtesyRules?.allowedRanks || ["VIP"]);
  const toggleRank = (rank: string) => {
    if (allowedRanks.includes(rank)) {
      setAllowedRanks(allowedRanks.filter(r => r !== rank));
    } else {
      setAllowedRanks([...allowedRanks, rank]);
    }
  };
  const handleSave = () => {
    onSave({
      ...product,
      isCourtesy: true,
      courtesyRules: {
        maxPerNight,
        allowedRanks
      }
    });
  };
  return <div className="space-y-4">
      <div>
        <Label htmlFor="maxPerNight">Máximo por noche</Label>
        <Input id="maxPerNight" type="number" value={maxPerNight} onChange={e => setMaxPerNight(parseInt(e.target.value))} min={1} />
        <p className="text-sm text-muted-foreground mt-1">
          Cantidad máxima de este producto como cortesía por noche
        </p>
      </div>
      
      <div>
        <Label className="mb-2 block">Rangos de PR permitidos</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch id="vip-rank" checked={allowedRanks.includes("VIP")} onCheckedChange={() => toggleRank("VIP")} />
            <Label htmlFor="vip-rank">VIP</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="premium-rank" checked={allowedRanks.includes("Premium")} onCheckedChange={() => toggleRank("Premium")} />
            <Label htmlFor="premium-rank">Premium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="standard-rank" checked={allowedRanks.includes("Standard")} onCheckedChange={() => toggleRank("Standard")} />
            <Label htmlFor="standard-rank">Standard</Label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>Guardar Configuración</Button>
      </div>
    </div>;
};
const PRTokenSettingsDialog = ({
  product,
  onSave
}) => {
  const [allowedRanks, setAllowedRanks] = useState<string[]>(product?.tokenRanks || []);
  const toggleRank = (rank: string) => {
    if (allowedRanks.includes(rank)) {
      setAllowedRanks(allowedRanks.filter(r => r !== rank));
    } else {
      setAllowedRanks([...allowedRanks, rank]);
    }
  };
  const handleSave = () => {
    onSave({
      ...product,
      isTokenProduct: allowedRanks.length > 0,
      tokenRanks: allowedRanks
    });
  };
  return <div className="space-y-4">
      <div>
        <Label className="mb-2 block">Rangos de PR permitidos para comprar con tokens</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch id="token-vip-rank" checked={allowedRanks.includes("VIP")} onCheckedChange={() => toggleRank("VIP")} />
            <Label htmlFor="token-vip-rank">VIP</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="token-premium-rank" checked={allowedRanks.includes("Premium")} onCheckedChange={() => toggleRank("Premium")} />
            <Label htmlFor="token-premium-rank">Premium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="token-standard-rank" checked={allowedRanks.includes("Standard")} onCheckedChange={() => toggleRank("Standard")} />
            <Label htmlFor="token-standard-rank">Standard</Label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>Guardar Configuración</Button>
      </div>
    </div>;
};

const Products = () => {
  const [selectedBarFilter, setSelectedBarFilter] = useState("all");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [stockAdjustmentOpen, setStockAdjustmentOpen] = useState(false);
  const [productToAdjust, setProductToAdjust] = useState("");
  const [courtesyFilterOn, setCourtesyFilterOn] = useState(false);
  const [tokenProductFilterOn, setTokenProductFilterOn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [courtesySettingsOpen, setCourtesySettingsOpen] = useState(false);
  const [tokenSettingsOpen, setTokenSettingsOpen] = useState(false);
  const [products, setProducts] = useState(productsData);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  
  const handleAdjustStock = (productName: string = "") => {
    setProductToAdjust(productName);
    setStockAdjustmentOpen(true);
  };
  
  const toggleProductSelection = (productId: number) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };
  
  const toggleAllProducts = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };
  
  const handleStockReingress = (data: any) => {
    console.log("Reingreso procesado:", data);
    // Aquí iría la lógica para actualizar el stock
  };
  
  const handleStockLoss = (data: any) => {
    console.log("Pérdida registrada:", data);
    // Aquí iría la lógica para actualizar el stock
  };
  
  const toggleCourtesy = (productId: number) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        if (product.isCourtesy) {
          // If already a courtesy, just disable it
          return {
            ...product,
            isCourtesy: false
          };
        } else {
          // If not a courtesy, open settings dialog
          setSelectedProduct(product);
          setCourtesySettingsOpen(true);
          return product;
        }
      }
      return product;
    }));
  };
  
  const saveCourtesySettings = updatedProduct => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
    setCourtesySettingsOpen(false);
  };
  
  const toggleTokenProduct = (productId: number) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        if (product.isTokenProduct) {
          // If already a token product, just disable it
          return {
            ...product,
            isTokenProduct: false,
            tokenRanks: []
          };
        } else {
          // If not a token product, open settings dialog
          setSelectedProduct(product);
          setTokenSettingsOpen(true);
          return product;
        }
      }
      return product;
    }));
  };
  
  const saveTokenSettings = updatedProduct => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
    setTokenSettingsOpen(false);
  };
  
  const deleteProduct = (productId: number) => {
    // Here you would typically call an API to delete the product
    setProducts(products.filter(product => product.id !== productId));
  };
  
  const deleteSelectedProducts = () => {
    // Here you would typically call an API to delete the selected products
    setProducts(products.filter(product => !selectedProducts.includes(product.id)));
    setSelectedProducts([]);
  };

  // Filter products based on filters
  let filteredProducts = products;
  if (courtesyFilterOn) {
    filteredProducts = filteredProducts.filter(product => product.isCourtesy);
  }
  if (tokenProductFilterOn) {
    filteredProducts = filteredProducts.filter(product => product.isTokenProduct);
  }
  
  const areAllProductsSelected = filteredProducts.length > 0 && 
    filteredProducts.every(product => selectedProducts.includes(product.id));
    
  const hasSelectedProducts = selectedProducts.length > 0;
  
  return <>
      <PageHeader title="Carta & Productos" description="Gestión de productos, precios y disponibilidad">
        <Button className="mr-2" onClick={() => handleAdjustStock()}>
          <PackagePlus className="mr-2 h-4 w-4" />
          Ajustar Stock
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </PageHeader>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Gestión de Carta</CardTitle>
          <CardDescription>Administración de productos, categorías y precios</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="products">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="categories">Categorías</TabsTrigger>
              <TabsTrigger value="custom">Tragos Personalizados</TabsTrigger>
            </TabsList>
            
            {/* Productos */}
            <TabsContent value="products">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Filtrar por Barra</label>
                  <Select value={selectedBarFilter} onValueChange={setSelectedBarFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las barras" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las barras</SelectItem>
                      <SelectItem value="barCentral">Bar Central</SelectItem>
                      <SelectItem value="barNorte">Bar Norte</SelectItem>
                      <SelectItem value="barSur">Bar Sur</SelectItem>
                      <SelectItem value="barVIP">Bar VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Filtrar por Categoría</label>
                  <Select value={selectedCategoryFilter} onValueChange={setSelectedCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="bebidas">Bebidas</SelectItem>
                      <SelectItem value="bebidasPremium">Bebidas Premium</SelectItem>
                      <SelectItem value="comidas">Comidas</SelectItem>
                      <SelectItem value="combos">Combos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Buscar Producto</label>
                  <div className="flex gap-2">
                    <Input placeholder="Nombre del producto" />
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="courtesyFilter" checked={courtesyFilterOn} onCheckedChange={setCourtesyFilterOn} />
                    <Label htmlFor="courtesyFilter">Solo productos para cortesía</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="tokenProductFilter" checked={tokenProductFilterOn} onCheckedChange={setTokenProductFilterOn} />
                    <Label htmlFor="tokenProductFilter">Solo productos para PR Tokens</Label>
                  </div>
                </div>
                
                {hasSelectedProducts && (
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{selectedProducts.length} seleccionados</Badge>
                    <Button variant="destructive" size="sm" onClick={deleteSelectedProducts}>
                      <Trash className="h-4 w-4 mr-1" /> Eliminar
                    </Button>
                  </div>
                )}
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[48px]">
                      <Checkbox 
                        checked={areAllProductsSelected} 
                        onCheckedChange={toggleAllProducts}
                      />
                    </TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Barras</TableHead>
                    <TableHead>Cortesía</TableHead>
                    <TableHead>PR Tokens</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map(product => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedProducts.includes(product.id)} 
                          onCheckedChange={() => toggleProductSelection(product.id)}
                        />
                      </TableCell>
                      <TableCell>#{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {product.stockAvailable}
                          {product.limitedStock && (
                            <Badge variant="outline" className="text-amber-600 border-amber-600">
                              Limitado
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {product.bars.map(bar => (
                            <Badge key={bar} variant="secondary" className="text-xs">
                              {bar}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch checked={product.isCourtesy} onCheckedChange={() => toggleCourtesy(product.id)} />
                          {product.isCourtesy && (
                            <Button variant="ghost" size="icon" onClick={() => {
                              setSelectedProduct(product);
                              setCourtesySettingsOpen(true);
                            }}>
                              <Gift className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch checked={product.isTokenProduct} onCheckedChange={() => toggleTokenProduct(product.id)} />
                          {product.isTokenProduct && (
                            <Button variant="ghost" size="icon" onClick={() => {
                              setSelectedProduct(product);
                              setTokenSettingsOpen(true);
                            }}>
                              <Coins className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleAdjustStock(product.name)}>
                              <PackagePlus className="h-4 w-4 mr-2" />
                              Ajustar Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar Producto
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive" 
                              onClick={() => deleteProduct(product.id)}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Categorías */}
            <TabsContent value="categories">
              <div className="flex justify-between mb-4">
                <div>
                  {hasSelectedProducts && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{selectedProducts.length} seleccionados</Badge>
                      <Button variant="destructive" size="sm" onClick={deleteSelectedProducts}>
                        <Trash className="h-4 w-4 mr-1" /> Eliminar
                      </Button>
                    </div>
                  )}
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Categoría
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[48px]">
                      <Checkbox 
                        checked={areAllProductsSelected}
                        onCheckedChange={toggleAllProducts}
                      />
                    </TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Nº Productos</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoriesData.map(category => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedProducts.includes(category.id)} 
                          onCheckedChange={() => toggleProductSelection(category.id)}
                        />
                      </TableCell>
                      <TableCell>#{category.id}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell>{category.productsCount}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Productos
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar Categoría
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Tragos Personalizados */}
            <TabsContent value="custom">
              <CustomDrinks selectedBar={selectedBarFilter} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Asociación de Productos con Saldos</CardTitle>
          <CardDescription>Configure qué productos pueden comprarse con cada tipo de saldo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Saldo App</CardTitle>
                <CardDescription>Productos disponibles para compra con Saldo App</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Productos asociados:</span>
                    <Badge>Todos</Badge>
                  </div>
                  <Button size="sm" className="w-full">Configurar restricciones</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Saldo NFC</CardTitle>
                <CardDescription>Productos disponibles para compra con tarjeta NFC</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Productos asociados:</span>
                    <Badge>Todos</Badge>
                  </div>
                  <Button size="sm" className="w-full">Configurar restricciones</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">PR Tokens</CardTitle>
                <CardDescription>Productos canjeables con tokens de PR</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Productos asociados:</span>
                    <Badge>{products.filter(p => p.isTokenProduct).length}</Badge>
                  </div>
                  <Button size="sm" className="w-full" onClick={() => setTokenProductFilterOn(true)}>
                    Configurar productos
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Cortesías</CardTitle>
                <CardDescription>Productos disponibles para cortesías</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Productos asociados:</span>
                    <Badge>{products.filter(p => p.isCourtesy).length}</Badge>
                  </div>
                  <Button size="sm" className="w-full" onClick={() => setCourtesyFilterOn(true)}>
                    Configurar productos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Modal para ajustar stock */}
      <StockAdjustment open={stockAdjustmentOpen} onOpenChange={setStockAdjustmentOpen} initialProduct={productToAdjust} onSubmitReingress={handleStockReingress} onSubmitLoss={handleStockLoss} />
      
      {/* Dialog for courtesy settings */}
      <Dialog open={courtesySettingsOpen} onOpenChange={setCourtesySettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configuración de Cortesía: {selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          {selectedProduct && <CourtesySettingsDialog product={selectedProduct} onSave={saveCourtesySettings} />}
        </DialogContent>
      </Dialog>
      
      {/* Dialog for PR Token settings */}
      <Dialog open={tokenSettingsOpen} onOpenChange={setTokenSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configuración de PR Tokens: {selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          {selectedProduct && <PRTokenSettingsDialog product={selectedProduct} onSave={saveTokenSettings} />}
        </DialogContent>
      </Dialog>
    </>;
};
export default Products;
