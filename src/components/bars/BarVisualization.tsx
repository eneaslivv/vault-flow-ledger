import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, QrCode, ArrowRightLeft, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data para las barras
const barsData = [{
  id: 1,
  name: "Bar Central",
  sales: "$82,350",
  orders: 875,
  qrCodes: 3,
  staff: 5,
  stockItems: 42,
  status: "active"
}, {
  id: 2,
  name: "Bar Norte",
  sales: "$38,750",
  orders: 412,
  qrCodes: 2,
  staff: 3,
  stockItems: 35,
  status: "active"
}, {
  id: 3,
  name: "Bar Sur",
  sales: "$24,800",
  orders: 265,
  qrCodes: 1,
  staff: 2,
  stockItems: 28,
  status: "active"
}, {
  id: 4,
  name: "El Alamo",
  sales: "$29,600",
  orders: 320,
  qrCodes: 1,
  staff: 2,
  stockItems: 30,
  status: "active"
}];
interface BarVisualizationProps {
  className?: string;
}
export function BarVisualization({
  className
}: BarVisualizationProps) {
  const navigate = useNavigate();
  const handleViewBarDetail = (barId: number) => {
    navigate(`/bars/${barId}`);
  };
  return <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Visualización de Barras</h2>
        <Button variant="outline" size="sm">
          <BarChart className="mr-2 h-4 w-4" />
          Ver Estadísticas Detalladas
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {barsData.map(bar => <Card key={bar.id} className="overflow-hidden border-t-4 border-t-stone-500">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{bar.name}</CardTitle>
                <Badge variant={bar.status === "active" ? "default" : "outline"}>
                  {bar.status === "active" ? "Activa" : "Inactiva"}
                </Badge>
              </div>
              <CardDescription>Ventas: {bar.sales}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{bar.orders}</div>
                  <div className="text-xs text-muted-foreground">Pedidos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{bar.qrCodes}</div>
                  <div className="text-xs text-muted-foreground">QRs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{bar.staff}</div>
                  <div className="text-xs text-muted-foreground">Staff</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                  {bar.stockItems} productos en stock
                </Badge>
                <Button variant="ghost" size="sm" onClick={() => handleViewBarDetail(bar.id)}>
                  Ver Detalle
                </Button>
              </div>
            </CardContent>
          </Card>)}
      </div>
    </div>;
}