import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { OptimalCombination } from '../types/dashboard';
import '../styles/OptimalCombinations.css';

const OptimalCombinations: React.FC = () => {
  const [combinations, setCombinations] = useState<OptimalCombination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOptimalCombinations = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getOptimalCombinations();
        setCombinations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar combinaciones óptimas');
        console.error('Error fetching optimal combinations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptimalCombinations();
  }, []);

  if (loading) {
    return (
      <div className="optimal-combinations-container">
        <h3>Combinaciones Óptimas</h3>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Cargando combinaciones óptimas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="optimal-combinations-container">
        <h3>Combinaciones Óptimas</h3>
        <div className="error-state">
          <p className="error-message">⚠️ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="optimal-combinations-container">
      <h3>Combinaciones Óptimas</h3>
      <div className="combinations-table-container">
        {combinations.length === 0 ? (
          <div className="no-data-state">
            <p>No hay combinaciones óptimas disponibles</p>
          </div>
        ) : (
          <table className="combinations-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Máquina ID</th>
                <th>Operador ID</th>
                <th>Temperatura (°C)</th>
                <th>Eficiencia (%)</th>
                <th>Puntuación</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {combinations.slice(0, 10).map((combination, index) => (
                <tr key={combination.id || index}>
                  <td>{combination.id}</td>
                  <td>{combination.machine_id}</td>
                  <td>{combination.operator_id}</td>
                  <td>{combination.temperature.toFixed(1)}</td>
                  <td>{combination.efficiency.toFixed(1)}</td>
                  <td>{combination.score.toFixed(2)}</td>
                  <td>{new Date(combination.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {combinations.length > 10 && (
        <div className="table-info">
          <p>Mostrando 10 de {combinations.length} combinaciones</p>
        </div>
      )}
    </div>
  );
};

export default OptimalCombinations;
