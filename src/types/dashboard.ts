// Tipos para datos de temperatura de la API de Cygger
export interface TemperatureDataPoint {
  readonly id: string;
  readonly timestamp: string;
  readonly temperature: number;
  readonly machine_id: string;
  readonly operator_id?: string;
  readonly location?: string;
}

// Tipos para análisis histórico
export interface HistoricalAnalysis {
  readonly period: 'daily' | 'weekly' | 'monthly';
  readonly data: HistoricalDataPoint[];
  readonly trend: 'increasing' | 'decreasing' | 'stable';
  readonly average: number;
  readonly variance: number;
}

export interface HistoricalDataPoint {
  readonly timestamp: string;
  readonly average_temperature: number;
  readonly min_temperature: number;
  readonly max_temperature: number;
  readonly variance: number;
  readonly data_points_count: number;
}

// Tipos para predicciones vs valores reales
export interface PredictionAnalysis {
  readonly model_accuracy: number;
  readonly prediction_horizon: number; // horas
  readonly last_updated: string;
  readonly data: PredictionDataPoint[];
}

export interface PredictionDataPoint {
  readonly timestamp: string;
  readonly actual_temperature?: number;
  readonly predicted_temperature: number;
  readonly confidence_interval: {
    readonly upper: number;
    readonly lower: number;
  };
  readonly machine_id: string;
  readonly prediction_error?: number;
}

// Tipos para combinaciones óptimas
export interface OptimalCombination {
  readonly id: string;
  readonly machine_id: string;
  readonly operator_id: string;
  readonly temperature: number;
  readonly efficiency: number;
  readonly score: number;
  readonly timestamp: string;
}

// Tipos para API responses
export interface ApiResponse<T> {
  readonly data: T[];
  readonly total: number;
  readonly limit: number;
  readonly offset?: number;
}
