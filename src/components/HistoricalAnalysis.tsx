import { useEffect, useState, useCallback } from 'react';
import { TrendingUp, TrendingDown, Minus, Calendar, BarChart3, RefreshCw } from 'lucide-react';
import { apiService } from '../services/api';
import type { HistoricalAnalysis } from '../types/dashboard';
import '../styles/HistoricalAnalysis.css';

interface HistoricalAnalysisProps {
  period?: 'daily' | 'weekly' | 'monthly';
}

const HistoricalAnalysisComponent = ({ period = 'daily' }: HistoricalAnalysisProps) => {
  const [data, setData] = useState<HistoricalAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>(period);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiService.getHistoricalAnalysis(selectedPeriod);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando análisis histórico');
      // Datos de ejemplo para cuando la API no esté disponible
      setData({
        period: selectedPeriod,
        trend: 'stable',
        average: 72.5,
        variance: 8.2,
        data: [
          {
            timestamp: '2025-07-25T00:00:00Z',
            average_temperature: 71.2,
            min_temperature: 65.0,
            max_temperature: 78.5,
            variance: 7.8,
            data_points_count: 144
          },
          {
            timestamp: '2025-07-24T00:00:00Z',
            average_temperature: 73.8,
            min_temperature: 68.2,
            max_temperature: 81.0,
            variance: 9.1,
            data_points_count: 142
          },
          {
            timestamp: '2025-07-23T00:00:00Z',
            average_temperature: 70.5,
            min_temperature: 64.8,
            max_temperature: 76.2,
            variance: 6.9,
            data_points_count: 145
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  }, [selectedPeriod]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp size={16} className="trend-up" />;
      case 'decreasing':
        return <TrendingDown size={16} className="trend-down" />;
      default:
        return <Minus size={16} className="trend-stable" />;
    }
  };

  const getTrendText = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return 'Tendencia Creciente';
      case 'decreasing':
        return 'Tendencia Decreciente';
      default:
        return 'Tendencia Estable';
    }
  };

  const getPeriodText = (period: string) => {
    switch (period) {
      case 'daily':
        return 'Diario';
      case 'weekly':
        return 'Semanal';
      case 'monthly':
        return 'Mensual';
      default:
        return period;
    }
  };

  if (loading) {
    return (
      <div className="historical-analysis loading">
        <div className="loading-header">
          <BarChart3 size={24} />
          <h3>Cargando análisis histórico...</h3>
        </div>
        <div className="loading-spinner">
          <RefreshCw size={20} className="spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="historical-analysis">
      <div className="analysis-header">
        <div className="title-section">
          <BarChart3 size={24} />
          <h3>Comportamiento Histórico</h3>
          {data && (
            <div className="trend-indicator">
              {getTrendIcon(data.trend)}
              <span>{getTrendText(data.trend)}</span>
            </div>
          )}
        </div>
        <div className="controls">
          <div className="period-selector">
            <Calendar size={16} />
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value as 'daily' | 'weekly' | 'monthly')}
            >
              <option value="daily">Diario</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
            </select>
          </div>
          <button onClick={fetchData} className="refresh-button" title="Actualizar análisis">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {error && (
        <div className="api-warning">
          <span>⚠️ API no disponible - Mostrando datos de ejemplo</span>
        </div>
      )}

      {data && (
        <>
          <div className="analysis-stats">
            <div className="stat-card">
              <span className="stat-label">Promedio</span>
              <span className="stat-value">
                {data.average.toFixed(1)}°C
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Varianza</span>
              <span className="stat-value">
                ±{data.variance.toFixed(1)}°C
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Período</span>
              <span className="stat-value">
                {getPeriodText(data.period)}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Registros</span>
              <span className="stat-value">
                {data.data.length}
              </span>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-header">
              <h4>Evolución Temporal de la Variable Objetivo</h4>
            </div>
            <div className="simple-chart">
              {data.data.slice(0, 10).map((point, index) => {
                const maxTemp = Math.max(...data.data.map(p => p.max_temperature));
                const minTemp = Math.min(...data.data.map(p => p.min_temperature));
                const range = maxTemp - minTemp || 1;
                const height = ((point.average_temperature - minTemp) / range) * 100;
                
                return (
                  <div key={index} className="chart-bar">
                    <div 
                      className="bar-fill" 
                      style={{ height: `${height}%` }}
                      title={`${point.average_temperature.toFixed(1)}°C`}
                    />
                    <div className="bar-label">
                      {new Date(point.timestamp).toLocaleDateString('es-ES', { 
                        day: '2-digit', 
                        month: 'short' 
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="data-table">
            <div className="table-header">
              <span>Fecha</span>
              <span>Promedio</span>
              <span>Mín/Máx</span>
              <span>Varianza</span>
              <span>Datos</span>
            </div>
            {data.data.slice(0, 5).map((point, index) => (
              <div key={index} className="table-row">
                <span className="date-cell">
                  {new Date(point.timestamp).toLocaleDateString('es-ES')}
                </span>
                <span className="temp-cell">
                  {point.average_temperature.toFixed(1)}°C
                </span>
                <span className="range-cell">
                  {point.min_temperature.toFixed(1)}° - {point.max_temperature.toFixed(1)}°
                </span>
                <span className="variance-cell">
                  ±{point.variance.toFixed(1)}°C
                </span>
                <span className="count-cell">
                  {point.data_points_count}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HistoricalAnalysisComponent;
