import { useEffect, useState, useCallback } from 'react';
import { Target, Brain, RefreshCw, Clock } from 'lucide-react';
import { apiService } from '../services/api';
import type { PredictionAnalysis, PredictionDataPoint } from '../types/dashboard';
import '../styles/PredictionAnalysis.css';

interface PredictionAnalysisProps {
  horizon?: number;
}

const PredictionAnalysisComponent = ({ horizon = 24 }: PredictionAnalysisProps) => {
  const [data, setData] = useState<PredictionAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedHorizon, setSelectedHorizon] = useState<number>(horizon);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiService.getPredictionAnalysis(selectedHorizon);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando análisis de predicciones');
      // Datos de ejemplo para cuando la API no esté disponible
      setData({
        model_accuracy: 0.87,
        prediction_horizon: selectedHorizon,
        last_updated: new Date().toISOString(),
        data: [
          {
            timestamp: '2025-07-26T15:00:00Z',
            actual_temperature: 73.2,
            predicted_temperature: 72.8,
            confidence_interval: { upper: 75.1, lower: 70.5 },
            machine_id: '01',
            prediction_error: 0.4
          },
          {
            timestamp: '2025-07-26T16:00:00Z',
            actual_temperature: 74.8,
            predicted_temperature: 74.3,
            confidence_interval: { upper: 76.6, lower: 72.0 },
            machine_id: '01',
            prediction_error: 0.5
          },
          {
            timestamp: '2025-07-26T17:00:00Z',
            predicted_temperature: 75.1,
            confidence_interval: { upper: 77.4, lower: 72.8 },
            machine_id: '01'
          },
          {
            timestamp: '2025-07-26T18:00:00Z',
            predicted_temperature: 76.2,
            confidence_interval: { upper: 78.5, lower: 73.9 },
            machine_id: '01'
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  }, [selectedHorizon]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const calculateAccuracyColor = (accuracy: number) => {
    if (accuracy >= 0.9) return '#00cc66';
    if (accuracy >= 0.8) return '#ff9900';
    return '#ff4444';
  };

  const calculateErrorRate = (predictions: PredictionDataPoint[]) => {
    const validPredictions = predictions.filter(p => p.actual_temperature && p.prediction_error !== undefined);
    if (validPredictions.length === 0) return 0;
    
    const avgError = validPredictions.reduce((sum, p) => sum + Math.abs(p.prediction_error!), 0) / validPredictions.length;
    return avgError;
  };

  if (loading) {
    return (
      <div className="prediction-analysis loading">
        <div className="loading-header">
          <Brain size={24} />
          <h3>Cargando análisis predictivo...</h3>
        </div>
        <div className="loading-spinner">
          <RefreshCw size={20} className="spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="prediction-analysis">
      <div className="analysis-header">
        <div className="title-section">
          <Brain size={24} />
          <h3>Predicciones vs Valores Reales</h3>
          {data && (
            <div className="accuracy-indicator">
              <Target size={16} />
              <span style={{ color: calculateAccuracyColor(data.model_accuracy) }}>
                {(data.model_accuracy * 100).toFixed(1)}% precisión
              </span>
            </div>
          )}
        </div>
        <div className="controls">
          <div className="horizon-selector">
            <Clock size={16} />
            <select 
              value={selectedHorizon} 
              onChange={(e) => setSelectedHorizon(parseInt(e.target.value))}
            >
              <option value={6}>6 horas</option>
              <option value={12}>12 horas</option>
              <option value={24}>24 horas</option>
              <option value={48}>48 horas</option>
            </select>
          </div>
          <button onClick={fetchData} className="refresh-button" title="Actualizar predicciones">
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
          <div className="prediction-stats">
            <div className="stat-card">
              <span className="stat-label">Precisión del Modelo</span>
              <span 
                className="stat-value"
                style={{ color: calculateAccuracyColor(data.model_accuracy) }}
              >
                {(data.model_accuracy * 100).toFixed(1)}%
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Error Promedio</span>
              <span className="stat-value">
                ±{calculateErrorRate(data.data).toFixed(2)}°C
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Horizonte</span>
              <span className="stat-value">
                {data.prediction_horizon}h
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Última Actualización</span>
              <span className="stat-value">
                {new Date(data.last_updated).toLocaleTimeString('es-ES', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>

          <div className="prediction-chart">
            <div className="chart-header">
              <h4>Comparación Temporal: Predicción vs Realidad</h4>
            </div>
            <div className="comparison-chart">
              {data.data.slice(0, 8).map((point, index) => {
                const hasActual = point.actual_temperature !== undefined;
                const maxTemp = Math.max(...data.data.map(p => 
                  Math.max(p.predicted_temperature, p.actual_temperature || 0, p.confidence_interval.upper)
                ));
                const minTemp = Math.min(...data.data.map(p => 
                  Math.min(p.predicted_temperature, p.actual_temperature || 100, p.confidence_interval.lower)
                ));
                const range = maxTemp - minTemp || 1;
                
                const predictedHeight = ((point.predicted_temperature - minTemp) / range) * 100;
                const actualHeight = hasActual ? ((point.actual_temperature! - minTemp) / range) * 100 : 0;
                const upperHeight = ((point.confidence_interval.upper - minTemp) / range) * 100;
                const lowerHeight = ((point.confidence_interval.lower - minTemp) / range) * 100;
                
                return (
                  <div key={index} className="chart-point">
                    <div className="confidence-interval" style={{
                      bottom: `${lowerHeight}%`,
                      height: `${upperHeight - lowerHeight}%`
                    }} />
                    <div 
                      className="predicted-bar" 
                      style={{ height: `${predictedHeight}%` }}
                      title={`Predicción: ${point.predicted_temperature.toFixed(1)}°C`}
                    />
                    {hasActual && (
                      <div 
                        className="actual-bar" 
                        style={{ height: `${actualHeight}%` }}
                        title={`Real: ${point.actual_temperature!.toFixed(1)}°C`}
                      />
                    )}
                    <div className="point-label">
                      {new Date(point.timestamp).toLocaleTimeString('es-ES', { 
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color predicted"></div>
                <span>Predicción</span>
              </div>
              <div className="legend-item">
                <div className="legend-color actual"></div>
                <span>Valor Real</span>
              </div>
              <div className="legend-item">
                <div className="legend-color confidence"></div>
                <span>Intervalo de Confianza</span>
              </div>
            </div>
          </div>

          <div className="predictions-table">
            <div className="table-header">
              <span>Tiempo</span>
              <span>Máquina</span>
              <span>Predicción</span>
              <span>Real</span>
              <span>Error</span>
              <span>Confianza</span>
            </div>
            {data.data.slice(0, 6).map((point, index) => (
              <div key={index} className="table-row">
                <span className="time-cell">
                  {new Date(point.timestamp).toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                <span className="machine-cell">{point.machine_id}</span>
                <span className="predicted-cell">
                  {point.predicted_temperature.toFixed(1)}°C
                </span>
                <span className="actual-cell">
                  {point.actual_temperature ? `${point.actual_temperature.toFixed(1)}°C` : '—'}
                </span>
                <span className="error-cell">
                  {point.prediction_error ? `±${Math.abs(point.prediction_error).toFixed(2)}°C` : '—'}
                </span>
                <span className="confidence-cell">
                  {point.confidence_interval.lower.toFixed(1)}° - {point.confidence_interval.upper.toFixed(1)}°
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PredictionAnalysisComponent;
