import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, AlertCircle, RefreshCw } from 'lucide-react';
import { apiService } from '../services/api';
import type { SpearmanAnalysisResponse } from '../types/dashboard';
import '../styles/SpearmanAnalysis.css';

const SpearmanAnalysis: React.FC = () => {
  const [spearmanData, setSpearmanData] = useState<SpearmanAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSpearmanData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getSpearmanCorrelation();
      setSpearmanData(data);
    } catch (err) {
      console.error('Error cargando datos de correlación Spearman:', err);
      setError('Error al cargar el análisis de correlación Spearman');
      
      // Datos de fallback para desarrollo
      setSpearmanData({
        analysis_timestamp: new Date().toISOString(),
        total_variables: 5,
        correlations: [
          {
            variable1: 'temperatura',
            variable2: 'eficiencia',
            correlation_coefficient: -0.75,
            p_value: 0.001,
            significance: 'high',
            interpretation: 'Correlación negativa fuerte: a mayor temperatura, menor eficiencia'
          },
          {
            variable1: 'temperatura',
            variable2: 'tiempo_operacion',
            correlation_coefficient: 0.68,
            p_value: 0.005,
            significance: 'high',
            interpretation: 'Correlación positiva fuerte: mayor temperatura con mayor tiempo de operación'
          },
          {
            variable1: 'eficiencia',
            variable2: 'mantenimiento',
            correlation_coefficient: 0.45,
            p_value: 0.02,
            significance: 'medium',
            interpretation: 'Correlación positiva moderada: mejor mantenimiento mejora eficiencia'
          },
          {
            variable1: 'operador_experiencia',
            variable2: 'eficiencia',
            correlation_coefficient: 0.32,
            p_value: 0.08,
            significance: 'low',
            interpretation: 'Correlación positiva débil: experiencia del operador influye ligeramente'
          }
        ],
        summary: {
          strongest_positive: {
            variable1: 'temperatura',
            variable2: 'tiempo_operacion',
            correlation_coefficient: 0.68,
            p_value: 0.005,
            significance: 'high',
            interpretation: 'Correlación positiva fuerte'
          },
          strongest_negative: {
            variable1: 'temperatura',
            variable2: 'eficiencia',
            correlation_coefficient: -0.75,
            p_value: 0.001,
            significance: 'high',
            interpretation: 'Correlación negativa fuerte'
          },
          significant_correlations_count: 3
        }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpearmanData();
  }, []);

  const getCorrelationIcon = (coefficient: number) => {
    if (coefficient > 0) {
      return <TrendingUp className="correlation-icon positive" />;
    } else if (coefficient < 0) {
      return <TrendingDown className="correlation-icon negative" />;
    }
    return <BarChart3 className="correlation-icon neutral" />;
  };

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'high': return 'high-significance';
      case 'medium': return 'medium-significance';
      case 'low': return 'low-significance';
      default: return 'no-significance';
    }
  };

  const formatCorrelationStrength = (coefficient: number) => {
    const abs = Math.abs(coefficient);
    if (abs >= 0.7) return 'Fuerte';
    if (abs >= 0.4) return 'Moderada';
    if (abs >= 0.2) return 'Débil';
    return 'Muy débil';
  };

  if (loading) {
    return (
      <div className="spearman-analysis loading">
        <div className="spearman-header">
          <BarChart3 className="spearman-icon" />
          <h3>Correlación Spearman</h3>
        </div>
        <div className="loading-content">
          <RefreshCw className="loading-spinner" />
          <p>Cargando análisis de correlación...</p>
        </div>
      </div>
    );
  }

  if (error && !spearmanData) {
    return (
      <div className="spearman-analysis error">
        <div className="spearman-header">
          <AlertCircle className="spearman-icon error-icon" />
          <h3>Error en Correlación Spearman</h3>
        </div>
        <div className="error-content">
          <p>{error}</p>
          <button onClick={loadSpearmanData} className="retry-button">
            <RefreshCw /> Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!spearmanData) {
    return (
      <div className="spearman-analysis no-data">
        <div className="spearman-header">
          <BarChart3 className="spearman-icon" />
          <h3>Correlación Spearman</h3>
        </div>
        <p>No hay datos de correlación disponibles</p>
      </div>
    );
  }

  return (
    <div className="spearman-analysis">
      <div className="spearman-header">
        <BarChart3 className="spearman-icon" />
        <h3>Análisis de Correlación Spearman</h3>
        <button onClick={loadSpearmanData} className="refresh-button" title="Actualizar datos">
          <RefreshCw />
        </button>
      </div>

      {error && (
        <div className="error-banner">
          <AlertCircle />
          <span>Usando datos de fallback: {error}</span>
        </div>
      )}

      <div className="spearman-summary">
        <div className="summary-item">
          <span className="summary-label">Variables analizadas:</span>
          <span className="summary-value">{spearmanData.total_variables}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Correlaciones significativas:</span>
          <span className="summary-value">{spearmanData.summary.significant_correlations_count}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Última actualización:</span>
          <span className="summary-value">
            {new Date(spearmanData.analysis_timestamp).toLocaleString()}
          </span>
        </div>
      </div>

      {spearmanData.summary.strongest_positive && (
        <div className="highlight-correlation positive">
          <h4>🔺 Correlación Positiva Más Fuerte</h4>
          <div className="correlation-details">
            <span className="variables">
              {spearmanData.summary.strongest_positive.variable1} ↔ {spearmanData.summary.strongest_positive.variable2}
            </span>
            <span className="coefficient">
              r = {spearmanData.summary.strongest_positive.correlation_coefficient.toFixed(3)}
            </span>
          </div>
          <p className="interpretation">{spearmanData.summary.strongest_positive.interpretation}</p>
        </div>
      )}

      {spearmanData.summary.strongest_negative && (
        <div className="highlight-correlation negative">
          <h4>🔻 Correlación Negativa Más Fuerte</h4>
          <div className="correlation-details">
            <span className="variables">
              {spearmanData.summary.strongest_negative.variable1} ↔ {spearmanData.summary.strongest_negative.variable2}
            </span>
            <span className="coefficient">
              r = {spearmanData.summary.strongest_negative.correlation_coefficient.toFixed(3)}
            </span>
          </div>
          <p className="interpretation">{spearmanData.summary.strongest_negative.interpretation}</p>
        </div>
      )}

      <div className="correlations-list">
        <h4>Todas las Correlaciones</h4>
        {spearmanData.correlations.map((correlation, index) => (
          <div key={`${correlation.variable1}-${correlation.variable2}-${index}`} className="correlation-item">
            <div className="correlation-header">
              {getCorrelationIcon(correlation.correlation_coefficient)}
              <span className="variables">
                {correlation.variable1} ↔ {correlation.variable2}
              </span>
              <span className={`significance ${getSignificanceColor(correlation.significance)}`}>
                {correlation.significance}
              </span>
            </div>
            <div className="correlation-stats">
              <div className="stat">
                <span className="label">Coeficiente:</span>
                <span className="value">{correlation.correlation_coefficient.toFixed(3)}</span>
              </div>
              <div className="stat">
                <span className="label">Fuerza:</span>
                <span className="value">{formatCorrelationStrength(correlation.correlation_coefficient)}</span>
              </div>
              <div className="stat">
                <span className="label">p-valor:</span>
                <span className="value">{correlation.p_value.toFixed(4)}</span>
              </div>
            </div>
            <p className="interpretation">{correlation.interpretation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpearmanAnalysis;
