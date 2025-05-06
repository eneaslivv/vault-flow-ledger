
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, FileText, MoreVertical, Edit, Trash, PenLine, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";

// Mock data for custom drinks
const customDrinksData = [
  { 
    id: 1, 
    name: "Cuba Libre", 
    category: "Ron", 
    ingredients: [
      { name: "Ron Havana", amount: "50ml" },
      { name: "Coca-Cola", amount: "200ml" },
      { name: "Limón", amount: "1 rodaja" },
    ],
    price: "$850",
    sold: 45,
    bar: "Bar Central"
  },
  { 
    id: 2, 
    name: "Gin Tonic Premium", 
    category: "Gin", 
    ingredients: [
      { name: "Gin Beefeater", amount: "60ml" },
      { name: "Agua Tónica", amount: "200ml" },
      { name: "Pepino", amount: "2 rodajas" },
    ],
    price: "$950",
    sold: 68,
    bar: "Bar Norte"
  },
  { 
    id: 3, 
    name: "Fernet Cola", 
    category: "Fernet", 
    ingredients: [
      { name: "Fernet Branca", amount: "70ml" },
      { name: "Coca-Cola", amount: "180ml" },
    ],
    price: "$800",
    sold: 82,
    bar: "Bar Central"
  },
  { 
    id: 4, 
    name: "Vodka Tonic", 
    category: "Vodka", 
    ingredients: [
      { name: "Vodka Absolut", amount: "50ml" },
      { name: "Agua Tónica", amount: "200ml" },
      { name: "Limón", amount: "1 rodaja" },
    ],
    price: "$850",
    sold: 52,
    bar: "El Alamo"
  },
];

// Mock data for ingredient consumption
const ingredientConsumptionData = [
  { name: "Ron Havana 750ml", used: "2.25 litros", drinks: "45 Cuba Libres", remaining: "3 botellas" },
  { name: "Gin Beefeater 750ml", used: "4.08 litros", drinks: "68 Gin Tonics", remaining: "2 botellas" },
  { name: "Fernet Branca 750ml", used: "5.74 litros", drinks: "82 Fernet Cola", remaining: "4 botellas" },
  { name: "Vodka Absolut 750ml", used: "2.6 litros", drinks: "52 Vodka Tonics", remaining: "5 botellas" },
  { name: "Coca-Cola 2L", used: "23.46 litros", drinks: "127 tragos mixtos", remaining: "8 botellas" },
  { name: "Agua Tónica 1.5L", used: "24 litros", drinks: "120 tragos mixtos", remaining: "6 botellas" },
];

// Available ingredients for new drinks
const availableIngredients = [
  { id: 1, name: "Ron Havana", category: "Ron", unit: "ml", stock: 3000 },
  { id: 2, name: "Gin Beefeater", category: "Gin", unit: "ml", stock: 1500 },
  { id: 3, name: "Fernet Branca", category: "Fernet", unit: "ml", stock: 2000 },
  { id: 4, name: "Vodka Absolut", category: "Vodka", unit: "ml", stock: 2500 },
  { id: 5, name: "Coca-Cola", category: "Gaseosa", unit: "ml", stock: 5000 },
  { id: 6, name: "Agua Tónica", category: "Gaseosa", unit: "ml", stock: 4000 },
  { id: 7, name: "Limón", category: "Frutas", unit: "rodaja", stock: 50 },
  { id: 8, name: "Pepino", category: "Verduras", unit: "rodaja", stock: 40 },
  { id: 9, name: "Menta", category: "Hierbas", unit: "hojas", stock: 100 },
];

// Available drink categories
const drinkCategories = [
  "Ron", "Gin", "Fernet", "Vodka", "Whisky", "Tequila", "Sin alcohol"
];

// Available bars
const availableBars = [
  "Bar Central", "Bar Norte", "Bar Sur", "Bar VIP", "El Alamo"
];

// Component for adding a new custom drink
const NewDrinkDialog = ({ open, onOpenChange, onSave }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [bar, setBar] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<{id: number, amount: string}[]>([]);
  
  const addIngredient = (ingredientId: number) => {
    if (!selectedIngredients.find(i => i.id === ingredientId)) {
      setSelectedIngredients([...selectedIngredients, { id: ingredientId, amount: "" }]);
    }
  };
  
  const removeIngredient = (ingredientId: number) => {
    setSelectedIngredients(selectedIngredients.filter(i => i.id !== ingredientId));
  };
  
  const updateIngredientAmount = (ingredientId: number, amount: string) => {
    setSelectedIngredients(selectedIngredients.map(i => 
      i.id === ingredientId ? { ...i, amount } : i
    ));
  };
  
  const handleSave = () => {
    if (!name || !category || !price || !bar || selectedIngredients.length === 0) {
      return; // Basic validation
    }
    
    const formattedIngredients = selectedIngredients.map(si => {
      const ingredient = availableIngredients.find(ai => ai.id === si.id);
      return {
        name: ingredient?.name || "",
        amount: si.amount
      };
    });
    
    const newDrink = {
      id: Math.max(...customDrinksData.map(d => d.id)) + 1,
      name,
      category,
      price: `$${price}`,
      ingredients: formattedIngredients,
      sold: 0,
      bar
    };
    
    onSave(newDrink);
    resetForm();
  };
  
  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setBar("");
    setSelectedIngredients([]);
  };
  
  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetForm();
      onOpenChange(newOpen);
    }}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Nuevo Trago Personalizado</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="drink-name">Nombre del Trago</Label>
              <Input id="drink-name" value={name} onChange={e => setName(e.target.value)} placeholder="Ej: Mojito Especial" />
            </div>
            
            <div>
              <Label htmlFor="drink-category">Categoría</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="drink-category">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {drinkCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="drink-price">Precio ($)</Label>
              <Input id="drink-price" value={price} onChange={e => setPrice(e.target.value.replace(/[^0-9]/g, ''))} placeholder="Ej: 850" />
            </div>
            
            <div>
              <Label htmlFor="drink-bar">Barra</Label>
              <Select value={bar} onValueChange={setBar}>
                <SelectTrigger id="drink-bar">
                  <SelectValue placeholder="Seleccionar barra" />
                </SelectTrigger>
                <SelectContent>
                  {availableBars.map(b => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label className="block mb-2">Ingredientes</Label>
            <div className="border rounded-md p-4 h-[300px] overflow-y-auto space-y-3">
              {selectedIngredients.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  Selecciona ingredientes para tu trago personalizado
                </div>
              ) : (
                selectedIngredients.map(si => {
                  const ingredient = availableIngredients.find(ai => ai.id === si.id);
                  return (
                    <div key={si.id} className="flex items-center gap-2">
                      <div className="flex-1">{ingredient?.name}</div>
                      <div className="w-24">
                        <Input 
                          value={si.amount} 
                          onChange={e => updateIngredientAmount(si.id, e.target.value)} 
                          placeholder={`Ej: 50${ingredient?.unit}`} 
                          className="h-8"
                        />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-0 h-8 w-8" 
                        onClick={() => removeIngredient(si.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
            
            <div className="mt-3">
              <Label className="block mb-2">Agregar Ingrediente</Label>
              <Select onValueChange={(value) => addIngredient(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar ingrediente" />
                </SelectTrigger>
                <SelectContent>
                  {availableIngredients
                    .filter(ai => !selectedIngredients.some(si => si.id === ai.id))
                    .map(ingredient => (
                      <SelectItem key={ingredient.id} value={ingredient.id.toString()}>
                        {ingredient.name} ({ingredient.stock} {ingredient.unit} disponibles)
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar Trago</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Component for adding a new ingredient
const NewIngredientDialog = ({ open, onOpenChange, onSave }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("ml");
  const [initialStock, setInitialStock] = useState("");
  
  const handleSave = () => {
    if (!name || !category || !unit) {
      return; // Basic validation
    }
    
    const newIngredient = {
      id: Math.max(...availableIngredients.map(i => i.id)) + 1,
      name,
      category,
      unit,
      stock: initialStock ? parseInt(initialStock) : 0
    };
    
    onSave(newIngredient);
    resetForm();
  };
  
  const resetForm = () => {
    setName("");
    setCategory("");
    setUnit("ml");
    setInitialStock("");
  };
  
  // Available units
  const units = ["ml", "unidad", "rodaja", "hojas", "gramos", "onza"];
  
  // Available ingredient categories
  const ingredientCategories = [
    "Ron", "Gin", "Fernet", "Vodka", "Whisky", "Tequila", "Gaseosa", "Frutas", "Verduras", "Hierbas", "Otros"
  ];
  
  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetForm();
      onOpenChange(newOpen);
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Ingrediente</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="ingredient-name">Nombre del Ingrediente</Label>
            <Input id="ingredient-name" value={name} onChange={e => setName(e.target.value)} placeholder="Ej: Jugo de Naranja" />
          </div>
          
          <div>
            <Label htmlFor="ingredient-category">Categoría</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="ingredient-category">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {ingredientCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="ingredient-unit">Unidad de Medida</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger id="ingredient-unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map(u => (
                  <SelectItem key={u} value={u}>{u}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="ingredient-stock">Stock Inicial</Label>
            <Input 
              id="ingredient-stock" 
              type="number" 
              value={initialStock} 
              onChange={e => setInitialStock(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder={`Ej: 1000`}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Cantidad disponible en {unit}
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar Ingrediente</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Main component for Custom Drinks
export const CustomDrinks = ({ selectedBar }: { selectedBar: string }) => {
  const [drinks, setDrinks] = useState(customDrinksData);
  const [ingredients, setIngredients] = useState(availableIngredients);
  const [newDrinkDialogOpen, setNewDrinkDialogOpen] = useState(false);
  const [newIngredientDialogOpen, setNewIngredientDialogOpen] = useState(false);
  const [selectedDrinks, setSelectedDrinks] = useState<number[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  
  const addNewDrink = (newDrink) => {
    setDrinks([...drinks, newDrink]);
    setNewDrinkDialogOpen(false);
  };
  
  const addNewIngredient = (newIngredient) => {
    setIngredients([...ingredients, newIngredient]);
    setNewIngredientDialogOpen(false);
  };
  
  const deleteDrink = (drinkId: number) => {
    setDrinks(drinks.filter(drink => drink.id !== drinkId));
  };
  
  const toggleDrinkSelection = (drinkId: number) => {
    setSelectedDrinks(prev => {
      if (prev.includes(drinkId)) {
        return prev.filter(id => id !== drinkId);
      } else {
        return [...prev, drinkId];
      }
    });
  };
  
  const toggleIngredientSelection = (ingredientId: number) => {
    setSelectedIngredients(prev => {
      if (prev.includes(ingredientId)) {
        return prev.filter(id => id !== ingredientId);
      } else {
        return [...prev, ingredientId];
      }
    });
  };
  
  const deleteSelectedDrinks = () => {
    setDrinks(drinks.filter(drink => !selectedDrinks.includes(drink.id)));
    setSelectedDrinks([]);
  };
  
  const deleteSelectedIngredients = () => {
    setIngredients(ingredients.filter(ingredient => !selectedIngredients.includes(ingredient.id)));
    setSelectedIngredients([]);
  };
  
  const filteredDrinks = drinks.filter(item => 
    selectedBar === "all" || item.bar.toLowerCase().includes(selectedBar.replace(/([A-Z])/g, ' $1').trim().toLowerCase())
  );
  
  const hasSelectedDrinks = selectedDrinks.length > 0;
  const hasSelectedIngredients = selectedIngredients.length > 0;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          Los tragos personalizados impactan automáticamente el stock de sus ingredientes
        </div>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setNewIngredientDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Ingrediente
          </Button>
          <Button 
            size="sm"
            onClick={() => setNewDrinkDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Trago Custom
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="drinks">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="drinks">Tragos Personalizados</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredientes Disponibles</TabsTrigger>
          <TabsTrigger value="consumption">Consumo de Ingredientes</TabsTrigger>
        </TabsList>
        
        {/* Tragos Personalizados Tab */}
        <TabsContent value="drinks">
          {hasSelectedDrinks && (
            <div className="flex justify-end mb-4">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{selectedDrinks.length} seleccionados</Badge>
                <Button variant="destructive" size="sm" onClick={deleteSelectedDrinks}>
                  <Trash className="h-4 w-4 mr-1" /> Eliminar
                </Button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDrinks.map((drink) => (
              <Card key={drink.id} className="relative">
                <div className="absolute top-3 left-3">
                  <Checkbox 
                    checked={selectedDrinks.includes(drink.id)} 
                    onCheckedChange={() => toggleDrinkSelection(drink.id)}
                  />
                </div>
                <CardHeader className="pb-2 pr-14">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{drink.name}</CardTitle>
                    <Badge>{drink.category}</Badge>
                  </div>
                  <CardDescription>Vendidos: {drink.sold} · Precio: {drink.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Ingredientes:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {drink.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="text-sm">
                          {ingredient.name} ({ingredient.amount})
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-end mt-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Ver Receta
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <PenLine className="mr-2 h-4 w-4" />
                            Editar Trago
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive" 
                            onClick={() => deleteDrink(drink.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Ingredientes Disponibles Tab */}
        <TabsContent value="ingredients">
          {hasSelectedIngredients && (
            <div className="flex justify-end mb-4">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{selectedIngredients.length} seleccionados</Badge>
                <Button variant="destructive" size="sm" onClick={deleteSelectedIngredients}>
                  <Trash className="h-4 w-4 mr-1" /> Eliminar
                </Button>
              </div>
            </div>
          )}
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[48px]">
                  <Checkbox 
                    checked={ingredients.length > 0 && selectedIngredients.length === ingredients.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedIngredients(ingredients.map(i => i.id));
                      } else {
                        setSelectedIngredients([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Stock Disponible</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedIngredients.includes(ingredient.id)} 
                      onCheckedChange={() => toggleIngredientSelection(ingredient.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{ingredient.name}</TableCell>
                  <TableCell>{ingredient.category}</TableCell>
                  <TableCell>{ingredient.stock}</TableCell>
                  <TableCell>{ingredient.unit}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar Ingrediente
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Plus className="mr-2 h-4 w-4" />
                          Ajustar Stock
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
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
        
        {/* Consumo de Ingredientes Tab */}
        <TabsContent value="consumption">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingrediente</TableHead>
                <TableHead>Cantidad Usada</TableHead>
                <TableHead>Tragos Elaborados</TableHead>
                <TableHead>Stock Restante</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredientConsumptionData.map((ingredient, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{ingredient.name}</TableCell>
                  <TableCell>{ingredient.used}</TableCell>
                  <TableCell>{ingredient.drinks}</TableCell>
                  <TableCell>{ingredient.remaining}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Plus className="mr-2 h-4 w-4" />
                          Ajustar Stock
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      {/* Dialog for creating a new custom drink */}
      <NewDrinkDialog 
        open={newDrinkDialogOpen} 
        onOpenChange={setNewDrinkDialogOpen} 
        onSave={addNewDrink} 
      />
      
      {/* Dialog for creating a new ingredient */}
      <NewIngredientDialog 
        open={newIngredientDialogOpen} 
        onOpenChange={setNewIngredientDialogOpen} 
        onSave={addNewIngredient} 
      />
    </div>
  );
};
