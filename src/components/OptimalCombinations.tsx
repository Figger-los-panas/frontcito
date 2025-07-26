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
        // Datos de ejemplo cuando la API no está disponible
        setCombinations([
          {
            id: '001',
            machine_id: 'M001',
            operator_id: 'OP001',
            temperature: 73.5,
            efficiency: 95.2,
            score: 4.8,
            timestamp: new Date().toISOString()
          },
          {
            id: '002',
            machine_id: 'M002',
            operator_id: 'OP002',
            temperature: 74.1,
            efficiency: 93.7,
            score: 4.6,
            timestamp: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: '003',
            machine_id: 'M003',
            operator_id: 'OP003',
            temperature: 72.8,
            efficiency: 94.3,
            score: 4.7,
            timestamp: new Date(Date.now() - 7200000).toISOString()
          }
        ]);
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
                  <td>{combination.id || 'N/A'}</td>
                  <td>{combination.machine_id || 'N/A'}</td>
                  <td>{combination.operator_id || 'N/A'}</td>
                  <td>{combination.temperature ? combination.temperature.toFixed(1) : 'N/A'}</td>
                  <td>{combination.efficiency ? combination.efficiency.toFixed(1) : 'N/A'}</td>
                  <td>{combination.score ? combination.score.toFixed(2) : 'N/A'}</td>
                  <td>{combination.timestamp ? new Date(combination.timestamp).toLocaleDateString() : 'N/A'}</td>
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
