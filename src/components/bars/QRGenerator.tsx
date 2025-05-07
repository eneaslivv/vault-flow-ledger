
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, Download, Copy } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface QRCodeData {
  id: string;
  name: string;
  barId: string;
  location: string;
  purpose: string;
}

export const QRGenerator = () => {
  const [qrName, setQrName] = useState('');
  const [qrLocation, setQrLocation] = useState('');
  const [selectedBar, setSelectedBar] = useState('');
  const [qrPurpose, setQrPurpose] = useState('orders');
  const [generatedQRs, setGeneratedQRs] = useState<QRCodeData[]>([]);
  const [showQRPreview, setShowQRPreview] = useState(false);
  const [currentQR, setCurrentQR] = useState<QRCodeData | null>(null);

  // Mock data for bars
  const bars = [
    { id: "barCentral", name: "Bar Central" },
    { id: "barNorte", name: "Bar Norte" },
    { id: "barSur", name: "Bar Sur" },
    { id: "elAlamo", name: "El Alamo" },
    { id: "barVIP", name: "Bar VIP" },
  ];

  const handleGenerateQR = () => {
    if (!qrName || !selectedBar || !qrLocation) {
      toast({
        title: "Datos incompletos",
        description: "Por favor completa todos los campos.",
        variant: "destructive"
      });
      return;
    }

    const newQR: QRCodeData = {
      id: `QR-${selectedBar.toUpperCase()}-${Date.now().toString().slice(-6)}`,
      name: qrName,
      barId: selectedBar,
      location: qrLocation,
      purpose: qrPurpose
    };

    setGeneratedQRs(prev => [...prev, newQR]);
    setCurrentQR(newQR);
    setShowQRPreview(true);
    
    toast({
      title: "QR generado exitosamente",
      description: `QR para ${qrName} en ${qrLocation} ha sido creado.`,
    });

    // Reset form fields
    setQrName('');
    setQrLocation('');
    setQrPurpose('orders');
  };

  const handleDownload = () => {
    // In a real app, this would generate and download an image
    toast({
      title: "Descarga iniciada",
      description: "El código QR se está descargando.",
    });
  };

  const handleCopyLink = () => {
    // In a real app, this would copy a link to the clipboard
    navigator.clipboard.writeText(`https://app.url/qr/${currentQR?.id}`);
    toast({
      title: "Enlace copiado",
      description: "El enlace del QR ha sido copiado al portapapeles.",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Generador de QR</CardTitle>
          <CardDescription>Crea códigos QR para tus barras</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="qr-name">Nombre del QR</Label>
              <Input 
                id="qr-name" 
                placeholder="ej. QR Barra Central Entrada" 
                value={qrName}
                onChange={(e) => setQrName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bar-select">Barra asociada</Label>
              <Select value={selectedBar} onValueChange={setSelectedBar}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una barra" />
                </SelectTrigger>
                <SelectContent>
                  {bars.map(bar => (
                    <SelectItem key={bar.id} value={bar.id}>{bar.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="qr-location">Ubicación</Label>
              <Input 
                id="qr-location" 
                placeholder="ej. Entrada, Mesa 5, VIP" 
                value={qrLocation}
                onChange={(e) => setQrLocation(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="qr-purpose">Propósito</Label>
              <Select value={qrPurpose} onValueChange={setQrPurpose}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el propósito" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="orders">Pedidos</SelectItem>
                  <SelectItem value="menu">Menú</SelectItem>
                  <SelectItem value="promos">Promociones</SelectItem>
                  <SelectItem value="events">Eventos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerateQR} className="w-full">
            <QrCode className="mr-2 h-4 w-4" />
            Generar QR
          </Button>
        </CardFooter>
      </Card>
      
      {showQRPreview && currentQR && (
        <Card>
          <CardHeader>
            <CardTitle>Vista previa del QR</CardTitle>
            <CardDescription>
              ID: {currentQR.id}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-48 h-48 border border-gray-300 rounded-lg flex items-center justify-center mb-4">
              <QrCode size={140} />
            </div>
            <div className="w-full space-y-2 text-center">
              <div><strong>Nombre:</strong> {currentQR.name}</div>
              <div><strong>Barra:</strong> {bars.find(b => b.id === currentQR.barId)?.name}</div>
              <div><strong>Ubicación:</strong> {currentQR.location}</div>
              <div><strong>Propósito:</strong> {
                currentQR.purpose === 'orders' ? 'Pedidos' :
                currentQR.purpose === 'menu' ? 'Menú' :
                currentQR.purpose === 'promos' ? 'Promociones' : 'Eventos'
              }</div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCopyLink}>
              <Copy className="mr-2 h-4 w-4" />
              Copiar Enlace
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Descargar QR
            </Button>
          </CardFooter>
        </Card>
      )}

      {generatedQRs.length > 0 && !showQRPreview && (
        <Card>
          <CardHeader>
            <CardTitle>QRs Generados</CardTitle>
            <CardDescription>
              Total: {generatedQRs.length} códigos QR
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {generatedQRs.map((qr) => (
                <div 
                  key={qr.id} 
                  className="p-3 border rounded-md flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setCurrentQR(qr);
                    setShowQRPreview(true);
                  }}
                >
                  <div>
                    <div className="font-medium">{qr.name}</div>
                    <div className="text-sm text-gray-500">{qr.id}</div>
                  </div>
                  <QrCode size={20} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
