
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { ArrowDownUp, PackagePlus, PackageX } from "lucide-react";

interface StockAdjustmentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialProduct?: string;
  initialQuantity?: number;
  onSubmitReingress?: (data: StockReingress) => void;
  onSubmitLoss?: (data: StockLoss) => void;
}

export interface StockReingress {
  product: string;
  quantity: number;
  reason: string;
  customReason?: string;
  isOpened: boolean;
  associatedCost: number;
  observations?: string;
}

export interface StockLoss {
  product: string;
  quantity: number;
  reason: string;
  customReason?: string;
  previouslyRegistered: boolean;
  observations?: string;
}

export function StockAdjustment({ 
  open, 
  onOpenChange, 
  initialProduct = "", 
  initialQuantity = 1,
  onSubmitReingress,
  onSubmitLoss
}: StockAdjustmentProps) {
  const [activeTab, setActiveTab] = useState<"reingress" | "loss">("reingress");
  
  const reingress = useForm<StockReingress>({
    defaultValues: {
      product: initialProduct,
      quantity: initialQuantity,
      reason: "",
      customReason: "",
      isOpened: false,
      associatedCost: 0,
      observations: ""
    }
  });

  const loss = useForm<StockLoss>({
    defaultValues: {
      product: initialProduct,
      quantity: initialQuantity,
      reason: "",
      customReason: "",
      previouslyRegistered: true,
      observations: ""
    }
  });

  const handleSubmitReingress = (data: StockReingress) => {
    console.log("Reingress data:", data);
    onSubmitReingress?.(data);
    toast.success(`${data.quantity} unidades de ${data.product} reingresadas al stock`);
    onOpenChange(false);
    reingress.reset();
  };

  const handleSubmitLoss = (data: StockLoss) => {
    console.log("Loss data:", data);
    onSubmitLoss?.(data);
    toast.success(`${data.quantity} unidades de ${data.product} registradas como pérdida`);
    onOpenChange(false);
    loss.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Ajuste de Stock</DialogTitle>
          <DialogDescription>
            Registra reingresos o pérdidas de stock para mantener un inventario preciso
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "reingress" | "loss")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reingress" className="flex items-center">
              <PackagePlus className="mr-2 h-4 w-4" />
              Reingreso
            </TabsTrigger>
            <TabsTrigger value="loss" className="flex items-center">
              <PackageX className="mr-2 h-4 w-4" />
              Pérdida
            </TabsTrigger>
          </TabsList>

          {/* Reingreso Form */}
          <TabsContent value="reingress">
            <Form {...reingress}>
              <form onSubmit={reingress.handleSubmit(handleSubmitReingress)} className="space-y-4 py-2">
                <FormField
                  control={reingress.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Producto</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre del producto" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={reingress.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cantidad</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={reingress.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motivo del Reingreso</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un motivo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="devolución">Devolución completa (no se consumió)</SelectItem>
                          <SelectItem value="reutilizable">Reutilizable (abierto, usable)</SelectItem>
                          <SelectItem value="error">Error de carga / descuento</SelectItem>
                          <SelectItem value="transferido">Transferido y no usado</SelectItem>
                          <SelectItem value="otro">Otro motivo</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {reingress.watch("reason") === "otro" && (
                  <FormField
                    control={reingress.control}
                    name="customReason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Especificar motivo</FormLabel>
                        <FormControl>
                          <Input placeholder="Detalle el motivo" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={reingress.control}
                  name="isOpened"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>¿Producto abierto?</FormLabel>
                        <FormDescription>
                          Indica si el producto ya fue abierto
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={reingress.control}
                  name="associatedCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Costo asociado ($)</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} step="0.01" {...field} />
                      </FormControl>
                      <FormDescription>
                        Costo adicional por el reingreso (si aplica)
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={reingress.control}
                  name="observations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observaciones (opcional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Detalles adicionales" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">Registrar Reingreso</Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>

          {/* Pérdida Form */}
          <TabsContent value="loss">
            <Form {...loss}>
              <form onSubmit={loss.handleSubmit(handleSubmitLoss)} className="space-y-4 py-2">
                <FormField
                  control={loss.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Producto</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre del producto" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={loss.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cantidad</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={loss.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motivo de la Pérdida</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un motivo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="vencido">Producto vencido</SelectItem>
                          <SelectItem value="dañado">Botella rota / recipiente dañado</SelectItem>
                          <SelectItem value="fallido">Preparación fallida / mal hecho</SelectItem>
                          <SelectItem value="robo">Robo o pérdida desconocida</SelectItem>
                          <SelectItem value="otro">Otro motivo</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {loss.watch("reason") === "otro" && (
                  <FormField
                    control={loss.control}
                    name="customReason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Especificar motivo</FormLabel>
                        <FormControl>
                          <Input placeholder="Detalle el motivo" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={loss.control}
                  name="previouslyRegistered"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>¿Se cargó previamente como venta o stock?</FormLabel>
                        <FormDescription>
                          Indica si el producto estaba registrado en el sistema
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={loss.control}
                  name="observations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observaciones (opcional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Detalles adicionales" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit" variant="destructive">Registrar Pérdida</Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
