// Servicio para comunicación con la API de Cygger
import type { 
  TemperatureDataPoint, 
  ApiResponse, 
  HistoricalAnalysis, 
  PredictionAnalysis, 
  OptimalCombination,
  SpearmanAnalysisResponse 
} from '../types/dashboard';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export interface TemperatureRequest {
  limit: number;
}

class ApiService {
  private async fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  async getTemperatureData(params: TemperatureRequest): Promise<ApiResponse<TemperatureDataPoint>> {
    return this.fetchApi<TemperatureDataPoint>('/temperature/', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getHistoricalAnalysis(period: 'daily' | 'weekly' | 'monthly' = 'daily'): Promise<HistoricalAnalysis> {
    const response = await fetch(`${API_BASE_URL}/temperature/historical/?period=${period}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  async getPredictionAnalysis(hours: number = 24): Promise<PredictionAnalysis> {
    const response = await fetch(`${API_BASE_URL}/temperature/predictions/?horizon=${hours}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  async getOptimalCombinations(): Promise<OptimalCombination[]> {
    const response = await fetch(`${API_BASE_URL}/combinations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  async getSpearmanCorrelation(): Promise<SpearmanAnalysisResponse> {
    const response = await fetch(`${API_BASE_URL}/spearman`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  // Método para verificar conectividad con la API
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const apiService = new ApiService();
