import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { StockAdjustment } from "@/components/stock/StockAdjustment";
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash, 
  Eye,
  Filter,
  PackagePlus,
  PackageX
} from "lucide-react";
import { CustomDrinks } from "@/components/products/CustomDrinks";

// Mock data for products
const productsData = [
  { id: 1, name: "Gin Tonic", category: "Bebidas", price: "$800", stockAvailable: 120, limitedStock: false, bars: ["Bar Central", "Bar Norte", "Bar VIP"] },
  { id: 2, name: "Vodka Tonic", category: "Bebidas", price: "$750", stockAvailable: 85, limitedStock: false, bars: ["Bar Central", "Bar Norte"] },
  { id: 3, name: "Cerveza", category: "Bebidas", price: "$500", stockAvailable: 200, limitedStock: false, bars: ["Bar Central", "Bar Norte", "Bar Sur"] },
  { id: 4, name: "Fernet con Coca", category: "Bebidas", price: "$700", stockAvailable: 150, limitedStock: false, bars: ["Bar Central", "Bar Norte", "Bar Sur"] },
  { id: 5, name: "Champagne", category: "Bebidas Premium", price: "$12500", stockAvailable: 25, limitedStock: true, bars: ["Bar VIP"] },
  { id: 6, name: "Nachos", category: "Comidas", price: "$600", stockAvailable: 35, limitedStock: true, bars: ["Bar Central", "Bar Norte"] },
  { id: 7, name: "Combo Fiesta", category: "Combos", price: "$5000", stockAvailable: 10, limitedStock: true, bars: ["Bar VIP"] },
];

// Mock data for categories
const categoriesData = [
  { id: 1, name: "Bebidas", productsCount: 15, description: "Bebidas alcohólicas y no alcohólicas" },
  { id: 2, name: "Bebidas Premium", productsCount: 8, description: "Bebidas exclusivas y de alta gama" },
  { id: 3, name: "Comidas", productsCount: 6, description: "Opciones para acompañar bebidas" },
  { id: 4, name: "Combos", productsCount: 5, description: "Combinaciones de productos con descuento" },
];

// Mock data for price by bar
const pricesByBarData = [
  { productId: 1, productName: "Gin Tonic", barCentral: "$800", barNorte: "$850", barSur: "$850", barVIP: "$950" },
  { productId: 2, productName: "Vodka Tonic", barCentral: "$750", barNorte: "$800", barSur: "-", barVIP: "-" },
  { productId: 3, productName: "Cerveza", barCentral: "$500", barNorte: "$550", barSur: "$550", barVIP: "$650" },
  { productId: 4, productName: "Fernet con Coca", barCentral: "$700", barNorte: "$750", barSur: "$750", barVIP: "-" },
  { productId: 5, productName: "Champagne", barCentral: "-", barNorte: "-", barSur: "-", barVIP: "$12500" },
];

const Products = () => {
  const [selectedBarFilter, setSelectedBarFilter] = useState("all");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [stockAdjustmentOpen, setStockAdjustmentOpen] = useState(false);
  const [productToAdjust, setProductToAdjust] = useState("");

  const handleAdjustStock = (productName: string = "") => {
    setProductToAdjust(productName);
    setStockAdjustmentOpen(true);
  };

  const handleStockReingress = (data: any) => {
    console.log("Reingreso procesado:", data);
    // Aquí iría la lógica para actualizar el stock
  };

  const handleStockLoss = (data: any) => {
    console.log("Pérdida registrada:", data);
    // Aquí iría la lógica para actualizar el stock
  };
  
  return (
    <>
      <PageHeader 
        title="Carta & Productos" 
        description="Gestión de productos, precios y disponibilidad"
      >
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="categories">Categorías</TabsTrigger>
              <TabsTrigger value="prices">Precios por Barra</TabsTrigger>
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
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Barras</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productsData.map((product) => (
                    <TableRow key={product.id}>
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
                          {product.bars.map((bar) => (
                            <Badge key={bar} variant="secondary" className="text-xs">
                              {bar}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleAdjustStock(product.name)}
                          >
                            <PackagePlus className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Categorías */}
            <TabsContent value="categories">
              <div className="flex justify-end mb-4">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Categoría
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Nº Productos</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoriesData.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>#{category.id}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell>{category.productsCount}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Ver Productos</Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Precios por Barra */}
            <TabsContent value="prices">
              <div className="flex justify-end mb-4">
                <Button size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edición Masiva
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Bar Central</TableHead>
                    <TableHead>Bar Norte</TableHead>
                    <TableHead>Bar Sur</TableHead>
                    <TableHead>Bar VIP</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricesByBarData.map((price) => (
                    <TableRow key={price.productId}>
                      <TableCell>#{price.productId}</TableCell>
                      <TableCell>{price.productName}</TableCell>
                      <TableCell>{price.barCentral}</TableCell>
                      <TableCell>{price.barNorte}</TableCell>
                      <TableCell>{price.barSur}</TableCell>
                      <TableCell>{price.barVIP}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
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
                    <Badge>Limitados (15)</Badge>
                  </div>
                  <Button size="sm" className="w-full">Configurar productos</Button>
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
                    <Badge>Limitados (8)</Badge>
                  </div>
                  <Button size="sm" className="w-full">Configurar productos</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Modal para ajustar stock */}
      <StockAdjustment 
        open={stockAdjustmentOpen}
        onOpenChange={setStockAdjustmentOpen}
        initialProduct={productToAdjust}
        onSubmitReingress={handleStockReingress}
        onSubmitLoss={handleStockLoss}
      />
    </>
  );
};

export default Products;
