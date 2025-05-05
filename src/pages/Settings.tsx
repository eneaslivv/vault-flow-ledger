
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [appName, setAppName] = useState("VARES Dashboard");
  const [adminEmail, setAdminEmail] = useState("admin@vares.com");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [salesReports, setSalesReports] = useState(true);
  const [transferAlerts, setTransferAlerts] = useState(true);
  
  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  
  const handleSaveGeneral = () => {
    toast({
      title: "Configuración guardada",
      description: "Los cambios generales han sido guardados correctamente.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Preferencias de notificaciones actualizadas",
      description: "Tus preferencias de notificaciones han sido guardadas.",
    });
  };
  
  const handleSaveSecurity = () => {
    toast({
      title: "Configuración de seguridad actualizada",
      description: "Los cambios de seguridad han sido aplicados.",
    });
  };
  
  return (
    <>
      <PageHeader 
        title="Configuración" 
        description="Ajustes del sistema y preferencias"
      />

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
            </TabsList>
            
            {/* Configuración General */}
            <TabsContent value="general">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Información General</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="app-name">Nombre de la Aplicación</Label>
                      <Input 
                        id="app-name" 
                        value={appName} 
                        onChange={(e) => setAppName(e.target.value)} 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="admin-email">Email de Administrador</Label>
                      <Input 
                        id="admin-email" 
                        type="email" 
                        value={adminEmail} 
                        onChange={(e) => setAdminEmail(e.target.value)} 
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Bares y Locales</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="bar-central" className="flex-1">Bar Central</Label>
                      <Switch id="bar-central" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="bar-norte" className="flex-1">Bar Norte</Label>
                      <Switch id="bar-norte" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="bar-sur" className="flex-1">Bar Sur</Label>
                      <Switch id="bar-sur" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="el-alamo" className="flex-1">El Alamo</Label>
                      <Switch id="el-alamo" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Opciones de Visualización</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="dark-mode" className="flex-1">Modo Oscuro</Label>
                      <Switch id="dark-mode" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="compact-view" className="flex-1">Vista Compacta</Label>
                      <Switch id="compact-view" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveGeneral}>Guardar Cambios</Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Configuración de Notificaciones */}
            <TabsContent value="notifications">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Preferencias de Notificaciones</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications" className="flex-1">Notificaciones por Email</Label>
                      <Switch 
                        id="email-notifications" 
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="stock-alerts" className="flex-1">Alertas de Stock Bajo</Label>
                      <Switch 
                        id="stock-alerts" 
                        checked={stockAlerts}
                        onCheckedChange={setStockAlerts}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sales-reports" className="flex-1">Reportes Diarios de Ventas</Label>
                      <Switch 
                        id="sales-reports" 
                        checked={salesReports}
                        onCheckedChange={setSalesReports}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="transfer-alerts" className="flex-1">Alertas de Transferencias</Label>
                      <Switch 
                        id="transfer-alerts" 
                        checked={transferAlerts}
                        onCheckedChange={setTransferAlerts}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Destinatarios de Notificaciones</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="admin-notifications">Administrador</Label>
                      <Input id="admin-notifications" defaultValue="admin@vares.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="finance-notifications">Finanzas</Label>
                      <Input id="finance-notifications" defaultValue="finanzas@vares.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="stock-notifications">Stock</Label>
                      <Input id="stock-notifications" defaultValue="stock@vares.com" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications}>Guardar Preferencias</Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Configuración de Seguridad */}
            <TabsContent value="security">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Configuración de Seguridad</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="two-factor" className="flex-1">Autenticación de Dos Factores</Label>
                      <Switch 
                        id="two-factor" 
                        checked={twoFactorAuth}
                        onCheckedChange={setTwoFactorAuth}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="session-timeout">Tiempo de Sesión (minutos)</Label>
                      <Input 
                        id="session-timeout" 
                        type="number" 
                        value={sessionTimeout}
                        onChange={(e) => setSessionTimeout(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Cambiar Contraseña</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="current-password">Contraseña Actual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-password">Nueva Contraseña</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" className="mr-2">Cambiar Contraseña</Button>
                  <Button onClick={handleSaveSecurity}>Guardar Configuración</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default Settings;
