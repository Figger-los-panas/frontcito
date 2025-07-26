// Tipos para datos industriales
export interface IndustrialDataPoint {
  id: string;
  timestamp: string;
  turno: string;
  operador_id: string;
  maquina_id: string;
  producto_id: string;
  temperatura?: number;
  vibracion?: number;
  humedad?: number;
  tiempo_ciclo?: number;
  fallo_detectado: string;
  tipo_fallo?: string;
  cantidad_producida: number;
  unidades_defectuosas: number;
  eficiencia_porcentual?: number;
  consumo_energia?: number;
  paradas_programadas: number;
  paradas_imprevistas: number;
  observaciones?: string;
}

export interface ChartData {
  month: string;
  produccion: number;
  eficiencia: number;
  fallos: number;
  energia: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
}

export interface EfficiencyData {
  maquina: string;
  eficiencia: number;
  produccion: number;
}

export interface FailureData {
  tipo: string;
  cantidad: number;
  porcentaje: number;
}
