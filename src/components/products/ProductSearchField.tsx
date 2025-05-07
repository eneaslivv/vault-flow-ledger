
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock product data - would be replaced with API calls
const mockProducts = [
  { id: 1, name: "Vodka Absolut 750ml", category: "Alcoholico", price: 2500, cost: 1500 },
  { id: 2, name: "Whisky Johnnie Walker 750ml", category: "Alcoholico", price: 3200, cost: 2100 },
  { id: 3, name: "Gin Beefeater 750ml", category: "Alcoholico", price: 2800, cost: 1800 },
  { id: 4, name: "Red Bull 250ml", category: "Energéticas", price: 600, cost: 350 },
  { id: 5, name: "Agua Mineral 500ml", category: "No Alcoholico", price: 200, cost: 100 },
  { id: 6, name: "Cerveza Corona 355ml", category: "Alcoholico", price: 450, cost: 250 },
  { id: 7, name: "Champagne Moët & Chandon", category: "Alcoholico", price: 9500, cost: 6500 },
  { id: 8, name: "Sprite 350ml", category: "No Alcoholico", price: 250, cost: 120 },
  { id: 9, name: "Fernet Branca 750ml", category: "Alcoholico", price: 1800, cost: 1100 },
  { id: 10, name: "Coca-Cola 350ml", category: "No Alcoholico", price: 250, cost: 120 },
];

interface ProductSearchFieldProps {
  onSelect: (product: any) => void; 
  placeholder?: string;
  selectedProduct?: string;
  className?: string;
}

export function ProductSearchField({ 
  onSelect, 
  placeholder = "Buscar productos...",
  selectedProduct = "",
  className 
}: ProductSearchFieldProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedProduct);

  useEffect(() => {
    if (selectedProduct && selectedProduct !== value) {
      setValue(selectedProduct);
    }
  }, [selectedProduct]);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);
    
    // Find the selected product object
    const selectedProductObj = mockProducts.find(
      product => product.name === currentValue
    );
    
    if (selectedProductObj) {
      onSelect(selectedProductObj);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {value || placeholder}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar productos..." />
          <CommandList>
            <CommandEmpty>No se encontraron productos.</CommandEmpty>
            <CommandGroup>
              {mockProducts.map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => handleSelect(product.name)}
                  className="flex items-center justify-between"
                >
                  <div>
                    <span>{product.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {product.category}
                    </span>
                  </div>
                  {value === product.name && (
                    <Check className="h-4 w-4 text-green-600" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
