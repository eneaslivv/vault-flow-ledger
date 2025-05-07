
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, ArrowRightLeft, Clipboard, BarChart } from "lucide-react";

// Mock product data - in a real app this would come from an API or store
const productDetails = [
  {
    id: 1,
    name: "Gin Tonic",
    concept: "Trago clásico refrescante",
    price: 800,
    cost: 350,
    margin: 128.57,
    type: "elaborado",
    totalStock: 120,
    stockByBar: [
      { bar: "Bar Central", stock: 50 },
      { bar: "Bar Norte", stock: 40 },
      { bar: "Bar VIP", stock: 30 },
    ],
    ingredients: [
      { name: "Gin Beefeater", amount: "60ml", stock: 12 },
      { name: "Agua Tónica", amount: "200ml", stock: 45 },
      { name: "Limón", amount: "1 rodaja", stock: 30 },
    ],
    hasRecipe: true,
    recipe: [
      "Llenar un vaso balón con hielo",
      "Añadir 60ml de Gin Beefeater",
      "Completar con agua tónica",
      "Decorar con una rodaja de limón",
    ],
    movements: [
      { date: "2023-05-07", type: "Transferencia", from: "Bar Central", to: "Bar Norte", quantity: 10 },
      { date: "2023-05-05", type: "Reasignación", from: "Stock General", to: "Bar Central", quantity: 20 },
      { date: "2023-05-03", type: "Entrada", from: "Compra", to: "Stock General", quantity: 50 },
    ],
  },
  {
    id: 2,
    name: "Vodka Tonic",
    concept: "Alternativa ligera al Gin Tonic",
    price: 750,
    cost: 300,
    margin: 150,
    type: "elaborado",
    totalStock: 85,
    stockByBar: [
      { bar: "Bar Central", stock: 45 },
      { bar: "Bar Norte", stock: 40 },
    ],
    ingredients: [
      { name: "Vodka Absolut", amount: "50ml", stock: 15 },
      { name: "Agua Tónica", amount: "200ml", stock: 45 },
      { name: "Limón", amount: "1 rodaja", stock: 30 },
    ],
    hasRecipe: true,
    recipe: [
      "Llenar un vaso highball con hielo",
      "Añadir 50ml de Vodka Absolut",
      "Completar con agua tónica",
      "Decorar con una rodaja de limón",
    ],
    movements: [
      { date: "2023-05-06", type: "Transferencia", from: "Bar Central", to: "Bar Norte", quantity: 5 },
      { date: "2023-05-04", type: "Reasignación", from: "Stock General", to: "Bar Central", quantity: 15 },
      { date: "2023-05-02", type: "Entrada", from: "Compra", to: "Stock General", quantity: 30 },
    ],
  },
  {
    id: 3,
    name: "Cerveza",
    concept: "",
    price: 500,
    cost: 200,
    margin: 150,
    type: "directo",
    totalStock: 200,
    stockByBar: [
      { bar: "Bar Central", stock: 80 },
      { bar: "Bar Norte", stock: 60 },
      { bar: "Bar Sur", stock: 60 },
    ],
    ingredients: [],
    hasRecipe: false,
    recipe: [],
    movements: [
      { date: "2023-05-08", type: "Transferencia", from: "Bar Central", to: "Bar Sur", quantity: 20 },
      { date: "2023-05-01", type: "Entrada", from: "Compra", to: "Stock General", quantity: 100 },
    ],
  },
  {
    id: 5,
    name: "Champagne",
    concept: "Bebida premium para celebraciones",
    price: 12500,
    cost: 8000,
    margin: 56.25,
    type: "directo",
    totalStock: 25,
    stockByBar: [
      { bar: "Bar VIP", stock: 25 },
    ],
    ingredients: [],
    hasRecipe: false,
    recipe: [],
    movements: [
      { date: "2023-05-01", type: "Reasignación", from: "Stock General", to: "Bar VIP", quantity: 25 },
      { date: "2023-04-28", type: "Entrada", from: "Compra", to: "Stock General", quantity: 25 },
    ],
  },
];

const ProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    // In a real app, fetch product data from API
    const id = parseInt(productId || "0");
    const foundProduct = productDetails.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // If product not found, navigate back
      navigate("/products");
    }
  }, [productId, navigate]);

  if (!product) {
    return <div className="p-8">Cargando...</div>;
  }

  return (
    <>
      <PageHeader 
        title={`Detalle de Producto: ${product.name}`} 
        description="Información detallada, inventario y movimientos"
      >
        <Button variant="outline" className="mr-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <Button className="mr-2">
          <Edit className="mr-2 h-4 w-4" />
          Editar Producto
        </Button>
        <Button variant="outline">
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Transferir Stock
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Precio de Venta</CardTitle>
            <CardDescription>Precio al público</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${product.price}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Costo</CardTitle>
            <CardDescription>Precio de adquisición</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${product.cost}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Margen</CardTitle>
            <CardDescription>Ganancia porcentual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{product.margin}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>
                {product.concept || "Sin descripción"}
              </CardDescription>
            </div>
            <Badge className="text-sm">
              {product.type === "elaborado" ? "Producto Elaborado" : "Producto Directo"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Información General</TabsTrigger>
              {product.type === "elaborado" && (
                <TabsTrigger value="ingredients">Ingredientes</TabsTrigger>
              )}
              {product.hasRecipe && (
                <TabsTrigger value="recipe">Receta</TabsTrigger>
              )}
              <TabsTrigger value="history">Historial</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Inventario Total</CardTitle>
                    <CardDescription>Stock disponible en todas las barras</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{product.totalStock}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Tipo de Producto</CardTitle>
                    <CardDescription>
                      {product.type === "elaborado" 
                        ? "Requiere preparación con ingredientes" 
                        : "Venta directa sin preparación"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl capitalize">{product.type}</div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Distribución por Barra</CardTitle>
                  <CardDescription>Inventario disponible en cada ubicación</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Barra</TableHead>
                        <TableHead>Stock Disponible</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {product.stockByBar.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{item.bar}</TableCell>
                          <TableCell>{item.stock}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <ArrowRightLeft className="mr-2 h-4 w-4" />
                              Transferir
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {product.type === "elaborado" && (
              <TabsContent value="ingredients">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Ingredientes Necesarios</CardTitle>
                    <CardDescription>Componentes para elaboración</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ingrediente</TableHead>
                          <TableHead>Cantidad por Unidad</TableHead>
                          <TableHead>Stock Disponible</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {product.ingredients.map((item, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell>{item.stock} unidades</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                <ArrowRightLeft className="mr-2 h-4 w-4" />
                                Transferir
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <div className="mt-4">
                  <Button className="mr-2">
                    <BarChart className="mr-2 h-4 w-4" />
                    Ver Análisis de Consumo
                  </Button>
                </div>
              </TabsContent>
            )}
            
            {product.hasRecipe && (
              <TabsContent value="recipe">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">Receta de Preparación</CardTitle>
                        <CardDescription>Instrucciones para elaboración</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Clipboard className="mr-2 h-4 w-4" />
                        Copiar Receta
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal ml-6 space-y-2">
                      {product.recipe.map((step, i) => (
                        <li key={i} className="text-gray-700">{step}</li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            
            <TabsContent value="history">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Historial de Movimientos</CardTitle>
                  <CardDescription>Transferencias, entradas y salidas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Origen</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Cantidad</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {product.movements.map((movement, i) => (
                        <TableRow key={i}>
                          <TableCell>{movement.date}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              movement.type === "Entrada" 
                                ? "bg-green-50 text-green-700 border-green-200"
                                : movement.type === "Transferencia"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }>
                              {movement.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{movement.from}</TableCell>
                          <TableCell>{movement.to}</TableCell>
                          <TableCell>{movement.quantity}</TableCell>
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
    </>
  );
};

export default ProductDetail;
