// Tipos para datos industriales de Cygger
export interface IndustrialDataPoint {
  readonly id: string;
  readonly timestamp: string;
  readonly turno: 'Mañana' | 'Tarde' | 'Noche';
  readonly operador_id: string;
  readonly maquina_id: string;
  readonly producto_id: string;
  readonly temperatura?: number;
  readonly vibracion?: number;
  readonly humedad?: number;
  readonly tiempo_ciclo?: number;
  readonly fallo_detectado: 'Sí' | 'No';
  readonly tipo_fallo?: 'Mecánico' | 'Eléctrico' | 'Software' | 'Temperatura' | 'Otros';
  readonly cantidad_producida: number;
  readonly unidades_defectuosas: number;
  readonly eficiencia_porcentual?: number;
  readonly consumo_energia?: number;
  readonly paradas_programadas: number;
  readonly paradas_imprevistas: number;
  readonly observaciones?: string;
}

export interface ChartData {
  readonly month: string;
  readonly produccion: number;
  readonly eficiencia: number;
  readonly fallos: number;
  readonly energia: number;
}

export interface CategoryData {
  readonly name: string;
  readonly value: number;
  readonly color: string;
}

export interface MetricCard {
  readonly title: string;
  readonly value: string | number;
  readonly change: number;
  readonly icon: string;
}

export interface EfficiencyData {
  readonly maquina: string;
  readonly eficiencia: number;
  readonly produccion: number;
}

export interface FailureData {
  readonly tipo: string;
  readonly cantidad: number;
  readonly porcentaje: number;
}
