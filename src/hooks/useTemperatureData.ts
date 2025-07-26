import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import type { TemperatureDataPoint, ApiResponse } from '../types/dashboard';

interface UseTemperatureDataResult {
  temperatureData: TemperatureDataPoint[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isApiConnected: boolean;
}

export const useTemperatureData = (limit: number = 100): UseTemperatureDataResult => {
  const [temperatureData, setTemperatureData] = useState<TemperatureDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isApiConnected, setIsApiConnected] = useState<boolean>(false);

  const fetchTemperatureData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Verificar conectividad primero
      const isConnected = await apiService.healthCheck();
      setIsApiConnected(isConnected);
      
      if (!isConnected) {
        throw new Error('No se puede conectar con la API. Verificar que el servidor esté ejecutándose en localhost:8000');
      }

      const response: ApiResponse<TemperatureDataPoint> = await apiService.getTemperatureData({ limit });
      setTemperatureData(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar datos de temperatura';
      setError(errorMessage);
      console.error('Error fetching temperature data:', err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchTemperatureData();
  }, [fetchTemperatureData]);

  return {
    temperatureData,
    loading,
    error,
    refetch: fetchTemperatureData,
    isApiConnected,
  };
};
