import type { ChartData, CategoryData, MetricCard, IndustrialDataPoint, EfficiencyData, FailureData } from '../types/dashboard';

// Datos de ejemplo para las gráficas industriales
export const chartData: ChartData[] = [
  { month: 'Ene', produccion: 4500, eficiencia: 85, fallos: 12, energia: 2400 },
  { month: 'Feb', produccion: 4200, eficiencia: 88, fallos: 8, energia: 2200 },
  { month: 'Mar', produccion: 4800, eficiencia: 82, fallos: 15, energia: 2600 },
  { month: 'Abr', produccion: 4600, eficiencia: 90, fallos: 6, energia: 2350 },
  { month: 'May', produccion: 5100, eficiencia: 87, fallos: 10, energia: 2700 },
  { month: 'Jun', produccion: 4900, eficiencia: 89, fallos: 7, energia: 2550 },
  { month: 'Jul', produccion: 5200, eficiencia: 91, fallos: 5, energia: 2800 },
];

export const failureTypeData: CategoryData[] = [
  { name: 'Mecánico', value: 35, color: '#ff6b35' },
  { name: 'Eléctrico', value: 25, color: '#1a1a1a' },
  { name: 'Software', value: 20, color: '#666666' },
  { name: 'Temperatura', value: 15, color: '#f7931e' },
  { name: 'Otros', value: 5, color: '#cccccc' },
];

export const metricCards: MetricCard[] = [
  {
    title: 'Producción Total',
    value: '34,200',
    change: 8.5,
    icon: 'package'
  },
  {
    title: 'Eficiencia Promedio',
    value: '87.4%',
    change: 3.2,
    icon: 'trending-up'
  },
  {
    title: 'Fallos Detectados',
    value: '63',
    change: -12.3,
    icon: 'alert-triangle'
  },
  {
    title: 'Consumo Energético',
    value: '18,000 kWh',
    change: 5.8,
    icon: 'zap'
  }
];

export const industrialData: IndustrialDataPoint[] = [
  {
    id: '1',
    timestamp: '2024-07-26T08:30:00',
    turno: 'Mañana',
    operador_id: 'OP001',
    maquina_id: 'MAQ-A01',
    producto_id: 'PROD-X1',
    temperatura: 75.5,
    vibracion: 2.3,
    humedad: 45.2,
    tiempo_ciclo: 120.5,
    fallo_detectado: 'No',
    cantidad_producida: 150,
    unidades_defectuosas: 2,
    eficiencia_porcentual: 92.5,
    consumo_energia: 45.8,
    paradas_programadas: 1,
    paradas_imprevistas: 0,
  },
  {
    id: '2',
    timestamp: '2024-07-26T09:15:00',
    turno: 'Mañana',
    operador_id: 'OP002',
    maquina_id: 'MAQ-B02',
    producto_id: 'PROD-Y2',
    temperatura: 78.2,
    vibracion: 2.1,
    humedad: 48.7,
    tiempo_ciclo: 110.3,
    fallo_detectado: 'Sí',
    tipo_fallo: 'Mecánico',
    cantidad_producida: 140,
    unidades_defectuosas: 8,
    eficiencia_porcentual: 88.2,
    consumo_energia: 42.3,
    paradas_programadas: 0,
    paradas_imprevistas: 1,
    observaciones: 'Vibración elevada detectada'
  },
  {
    id: '3',
    timestamp: '2024-07-26T10:00:00',
    turno: 'Mañana',
    operador_id: 'OP001',
    maquina_id: 'MAQ-C03',
    producto_id: 'PROD-Z3',
    temperatura: 73.8,
    vibracion: 1.9,
    humedad: 42.1,
    tiempo_ciclo: 115.7,
    fallo_detectado: 'No',
    cantidad_producida: 165,
    unidades_defectuosas: 1,
    eficiencia_porcentual: 95.1,
    consumo_energia: 48.2,
    paradas_programadas: 0,
    paradas_imprevistas: 0,
  },
  {
    id: '4',
    timestamp: '2024-07-26T14:30:00',
    turno: 'Tarde',
    operador_id: 'OP003',
    maquina_id: 'MAQ-A01',
    producto_id: 'PROD-X1',
    temperatura: 76.9,
    vibracion: 2.4,
    humedad: 46.8,
    tiempo_ciclo: 125.2,
    fallo_detectado: 'No',
    cantidad_producida: 145,
    unidades_defectuosas: 3,
    eficiencia_porcentual: 89.7,
    consumo_energia: 46.1,
    paradas_programadas: 1,
    paradas_imprevistas: 0,
  },
  {
    id: '5',
    timestamp: '2024-07-26T15:45:00',
    turno: 'Tarde',
    operador_id: 'OP004',
    maquina_id: 'MAQ-D04',
    producto_id: 'PROD-W4',
    temperatura: 82.1,
    vibracion: 3.1,
    humedad: 52.3,
    tiempo_ciclo: 135.8,
    fallo_detectado: 'Sí',
    tipo_fallo: 'Temperatura',
    cantidad_producida: 120,
    unidades_defectuosas: 12,
    eficiencia_porcentual: 78.5,
    consumo_energia: 52.7,
    paradas_programadas: 0,
    paradas_imprevistas: 2,
    observaciones: 'Temperatura excesiva, revisión necesaria'
  },
  {
    id: '6',
    timestamp: '2024-07-26T22:00:00',
    turno: 'Noche',
    operador_id: 'OP005',
    maquina_id: 'MAQ-B02',
    producto_id: 'PROD-Y2',
    temperatura: 74.3,
    vibracion: 2.0,
    humedad: 44.5,
    tiempo_ciclo: 118.4,
    fallo_detectado: 'No',
    cantidad_producida: 158,
    unidades_defectuosas: 2,
    eficiencia_porcentual: 93.8,
    consumo_energia: 44.6,
    paradas_programadas: 1,
    paradas_imprevistas: 0,
  }
];

export const efficiencyData: EfficiencyData[] = [
  { maquina: 'MAQ-A01', eficiencia: 91.1, produccion: 295 },
  { maquina: 'MAQ-B02', eficiencia: 91.0, produccion: 298 },
  { maquina: 'MAQ-C03', eficiencia: 95.1, produccion: 165 },
  { maquina: 'MAQ-D04', eficiencia: 78.5, produccion: 120 },
];

export const failureData: FailureData[] = [
  { tipo: 'Mecánico', cantidad: 22, porcentaje: 35 },
  { tipo: 'Eléctrico', cantidad: 16, porcentaje: 25 },
  { tipo: 'Software', cantidad: 13, porcentaje: 20 },
  { tipo: 'Temperatura', cantidad: 9, porcentaje: 15 },
  { tipo: 'Otros', cantidad: 3, porcentaje: 5 },
];
