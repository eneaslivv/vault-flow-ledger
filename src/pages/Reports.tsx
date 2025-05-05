
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Legend,
  Tooltip,
  Cell,
  Pie,
  PieChart
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart as BarChartIcon,
  Download,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for sales chart
const salesChartData = [
  { name: "Ene", efectivo: 21500, nfc: 18200, app: 15300, prTokens: 5200 },
  { name: "Feb", efectivo: 25800, nfc: 20500, app: 17800, prTokens: 6500 },
  { name: "Mar", efectivo: 27400, nfc: 23800, app: 19200, prTokens: 7400 },
  { name: "Abr", efectivo: 29200, nfc: 25100, app: 20800, prTokens: 8300 },
  { name: "May", efectivo: 31500, nfc: 27800, app: 22500, prTokens: 9100 },
];

// Mock data for product distribution chart
const productDistributionData = [
  { name: "Vodka", value: 35 },
  { name: "Gin", value: 25 },
  { name: "Whisky", value: 15 },
  { name: "Energéticas", value: 15 },
  { name: "Aguas", value: 10 },
];

// Mock data for bar performance chart
const barPerformanceData = [
  { 
    name: "Bar Central", 
    ventas: 45800, 
    stock: 548, 
    transferencias: 90
  },
  { 
    name: "Bar Norte", 
    ventas: 32400, 
    stock: 325, 
    transferencias: -35
  },
  { 
    name: "Bar Sur", 
    ventas: 28600, 
    stock: 412, 
    transferencias: 20
  },
  { 
    name: "El Alamo", 
    ventas: 38750, 
    stock: 380, 
    transferencias: -75
  },
];

// Mock data for PR tokens usage
const prTokensData = [
  { name: "Ene", tokens: 12500, usados: 8750, conversion: 70 },
  { name: "Feb", tokens: 15000, usados: 11250, conversion: 75 },
  { name: "Mar", tokens: 17500, usados: 14000, conversion: 80 },
  { name: "Abr", tokens: 20000, usados: 17000, conversion: 85 },
  { name: "May", tokens: 22500, usados: 19125, conversion: 85 },
];

// Colors for pie chart
const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const timeRanges = ["Último mes", "Últimos 3 meses", "Últimos 6 meses", "Último año"];

const Reports = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("Último mes");
  
  return (
    <>
      <PageHeader 
        title="Reportes" 
        description="Visualización y análisis de datos"
      >
        <Button variant="outline" className="mr-2">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </PageHeader>

      <div className="mb-6 flex justify-end">
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Período de tiempo" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Tipo de Pago</CardTitle>
            <CardDescription>Distribución de ingresos por método de pago</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="efectivo" name="Efectivo" fill="#8884d8" />
                  <Bar dataKey="nfc" name="NFC" fill="#82ca9d" />
                  <Bar dataKey="app" name="App" fill="#ffc658" />
                  <Bar dataKey="prTokens" name="PR Tokens" fill="#ff8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Productos</CardTitle>
            <CardDescription>Porcentaje de ventas por tipo de producto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {productDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento por Bar</CardTitle>
            <CardDescription>Comparativa de ventas, stock y transferencias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ventas" name="Ventas ($)" fill="#8884d8" />
                  <Bar dataKey="stock" name="Stock (unidades)" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>PR Tokens y Conversión</CardTitle>
            <CardDescription>Uso de tokens y tasa de conversión</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={prTokensData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="tokens" name="Tokens Asignados" stroke="#8884d8" />
                  <Line yAxisId="left" type="monotone" dataKey="usados" name="Tokens Usados" stroke="#82ca9d" />
                  <Line yAxisId="right" type="monotone" dataKey="conversion" name="Tasa Conversión (%)" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reportes Personalizados</CardTitle>
          <CardDescription>Generar reportes específicos</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sales">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="sales">Ventas</TabsTrigger>
              <TabsTrigger value="stock">Stock</TabsTrigger>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="pr">PR</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha Inicio
                </label>
                <Input type="date" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha Fin
                </label>
                <Input type="date" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bar
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar bar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="central">Bar Central</SelectItem>
                    <SelectItem value="norte">Bar Norte</SelectItem>
                    <SelectItem value="sur">Bar Sur</SelectItem>
                    <SelectItem value="alamo">El Alamo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="detallado">Detallado</SelectItem>
                    <SelectItem value="resumen">Resumen</SelectItem>
                    <SelectItem value="comparativo">Comparativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Formato
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button className="mr-2" variant="outline">Vista Previa</Button>
              <Button>
                <BarChartIcon className="mr-2 h-4 w-4" />
                Generar Reporte
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default Reports;
