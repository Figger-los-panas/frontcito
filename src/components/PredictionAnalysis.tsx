import { useEffect, useState, useCallback } from 'react';
import { Target, Layers, RefreshCw } from 'lucide-react';
import { apiService } from '../services/api';
import type { OptimalCombination } from '../types/dashboard';
import '../styles/PredictionAnalysis.css';

const CombinationsAnalysisComponent = () => {
  const [data, setData] = useState<OptimalCombination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiService.getOptimalCombinations();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando combinaciones óptimas');
      // Datos de ejemplo para cuando la API no esté disponible
      setData([
        {
          id: '001',
          machine_id: '01',
          operator_id: 'OP001',
          temperature: 73.5,
          efficiency: 95.2,
          score: 4.8,
          timestamp: new Date().toISOString()
        },
        {
          id: '002',
          machine_id: '02',
          operator_id: 'OP003',
          temperature: 72.8,
          efficiency: 93.7,
          score: 4.6,
          timestamp: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '003',
          machine_id: '01',
          operator_id: 'OP002',
          temperature: 74.1,
          efficiency: 92.3,
          score: 4.5,
          timestamp: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: '004',
          machine_id: '03',
          operator_id: 'OP001',
          temperature: 75.2,
          efficiency: 91.8,
          score: 4.4,
          timestamp: new Date(Date.now() - 10800000).toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const calculateAverageEfficiency = () => {
    if (data.length === 0) return 0;
    return data.reduce((sum, item) => sum + item.efficiency, 0) / data.length;
  };

  const calculateAverageScore = () => {
    if (data.length === 0) return 0;
    return data.reduce((sum, item) => sum + item.score, 0) / data.length;
  };

  if (loading) {
    return (
      <div className="prediction-analysis loading">
        <div className="loading-header">
          <Layers size={24} />
          <h3>Cargando combinaciones óptimas...</h3>
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
          <Layers size={24} />
          <h3>Combinaciones Óptimas</h3>
          {data.length > 0 && (
            <div className="accuracy-indicator">
              <Target size={16} />
              <span style={{ color: '#00cc66' }}>
                {data.length} combinaciones encontradas
              </span>
            </div>
          )}
        </div>
        <div className="controls">
          <button onClick={fetchData} className="refresh-button" title="Actualizar combinaciones">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {error && (
        <div className="api-warning">
          <span>⚠️ API no disponible - Mostrando datos de ejemplo</span>
        </div>
      )}

      {data && data.length > 0 && (
        <>
          <div className="prediction-stats">
            <div className="stat-card">
              <span className="stat-label">Eficiencia Promedio</span>
              <span 
                className="stat-value"
                style={{ color: '#00cc66' }}
              >
                {!isNaN(calculateAverageEfficiency()) ? calculateAverageEfficiency().toFixed(1) : '0.0'}%
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Puntuación Promedio</span>
              <span className="stat-value">
                {!isNaN(calculateAverageScore()) ? calculateAverageScore().toFixed(2) : '0.00'}/5.0
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total Combinaciones</span>
              <span className="stat-value">
                {data.length}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Última Actualización</span>
              <span className="stat-value">
                {new Date().toLocaleTimeString('es-ES', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>

          <div className="prediction-chart">
            <div className="chart-header">
              <h4>Top 5 Combinaciones por Eficiencia</h4>
            </div>
            <div className="comparison-chart">
              {data.slice(0, 5).map((combination, index) => {
                const validData = data.filter(c => c.efficiency && !isNaN(c.efficiency));
                const maxEfficiency = validData.length > 0 ? Math.max(...validData.map(c => c.efficiency)) : 100;
                const efficiencyHeight = combination.efficiency && !isNaN(combination.efficiency) 
                  ? (combination.efficiency / maxEfficiency) * 100 
                  : 0;
                
                return (
                  <div key={combination.id || `chart-${index}`} className="chart-point">
                    <div 
                      className="predicted-bar" 
                      style={{ height: `${efficiencyHeight}%` }}
                      title={`Eficiencia: ${combination.efficiency && !isNaN(combination.efficiency) ? combination.efficiency.toFixed(1) : 'N/A'}%`}
                    />
                    <div className="point-label">
                      M{combination.machine_id || 'N/A'}
                      <br />
                      {combination.operator_id || 'N/A'}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color predicted"></div>
                <span>Eficiencia (%)</span>
              </div>
            </div>
          </div>

          <div className="predictions-table">
            <div className="table-header">
              <span>ID</span>
              <span>Máquina</span>
              <span>Operador</span>
              <span>Temperatura</span>
              <span>Eficiencia</span>
              <span>Puntuación</span>
            </div>
            {data.slice(0, 6).map((combination, index) => (
              <div key={combination.id || index} className="table-row">
                <span className="time-cell">
                  {combination.id}
                </span>
                <span className="machine-cell">{combination.machine_id}</span>
                <span className="predicted-cell">
                  {combination.operator_id}
                </span>
                <span className="actual-cell">
                {combination.temperature && !isNaN(combination.temperature) ? combination.temperature.toFixed(1) : 'N/A'}°C
                </span>
                <span className="error-cell">
                  {combination.efficiency && !isNaN(combination.efficiency) ? combination.efficiency.toFixed(1) : 'N/A'}%
                </span>
                <span className="confidence-cell">
                  {combination.score && !isNaN(combination.score) ? combination.score.toFixed(2) : 'N/A'}/5.0
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {data.length === 0 && !loading && (
        <div className="no-data-message">
          <p>No hay combinaciones óptimas disponibles en este momento.</p>
        </div>
      )}
    </div>
  );
};

export default CombinationsAnalysisComponent;
