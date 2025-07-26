// Tipos para datos de temperatura de la API de Cygger
export interface TemperatureDataPoint {
  readonly id: string;
  readonly timestamp: string;
  readonly temperature: number;
  readonly machine_id: string;
  readonly operator_id?: string;
  readonly location?: string;
}

// Tipos para API responses
export interface ApiResponse<T> {
  readonly data: T[];
  readonly total: number;
  readonly limit: number;
  readonly offset?: number;
}
