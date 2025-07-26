import { Thermometer, RefreshCw, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { useTemperatureData } from '../hooks/useTemperatureData';
import type { TemperatureDataPoint } from '../types/dashboard';
import '../styles/TemperatureMonitor.css';

interface TemperatureMonitorProps {
  limit?: number;
}

const TemperatureMonitor = ({ limit = 100 }: TemperatureMonitorProps) => {
  const { temperatureData, loading, error, refetch, isApiConnected } = useTemperatureData(limit);

  const getTemperatureStatus = (temp: number) => {
    if (temp > 80) return 'critical';
    if (temp > 70) return 'warning';
    return 'normal';
  };

  const getTemperatureColor = (temp: number) => {
    const status = getTemperatureStatus(temp);
    switch (status) {
      case 'critical': return '#ff4444';
      case 'warning': return '#ff9900';
      default: return '#00cc66';
    }
  };

  if (loading) {
    return (
      <div className="temperature-monitor loading">
        <div className="loading-header">
          <Thermometer size={24} />
          <h3>Cargando datos de temperatura...</h3>
        </div>
        <div className="loading-spinner">
          <RefreshCw size={20} className="spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="temperature-monitor error">
        <div className="error-header">
          <AlertCircle size={24} />
          <h3>Sin conexión a la API</h3>
        </div>
        <p className="error-message">
          Para ver datos de temperatura en tiempo real, asegúrate de que tu servidor API esté ejecutándose en localhost:8000
        </p>
        <button onClick={refetch} className="retry-button">
          <RefreshCw size={16} />
          Verificar conexión
        </button>
      </div>
    );
  }

  if (temperatureData.length === 0 && !loading) {
    return (
      <div className="temperature-monitor empty">
        <div className="empty-header">
          <Thermometer size={24} />
          <h3>Esperando datos de temperatura</h3>
        </div>
        <p className="empty-message">
          Conecta tu API en localhost:8000 para comenzar a monitorear temperatura en tiempo real
        </p>
        <button onClick={refetch} className="retry-button">
          <RefreshCw size={16} />
          Buscar datos
        </button>
      </div>
    );
  }

  const averageTemp = temperatureData.length > 0 
    ? temperatureData.reduce((sum, item) => sum + item.temperature, 0) / temperatureData.length 
    : 0;

  const maxTemp = temperatureData.length > 0 
    ? Math.max(...temperatureData.map(item => item.temperature)) 
    : 0;

  const criticalCount = temperatureData.filter(item => getTemperatureStatus(item.temperature) === 'critical').length;

  return (
    <div className="temperature-monitor">
      <div className="monitor-header">
        <div className="title-section">
          <Thermometer size={24} />
          <h3>Monitoreo de Temperatura</h3>
          <div className={`connection-status ${isApiConnected ? 'connected' : 'disconnected'}`}>
            {isApiConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
            {isApiConnected ? 'Conectado' : 'Desconectado'}
          </div>
        </div>
        <button onClick={refetch} className="refresh-button" title="Actualizar datos">
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="temperature-stats">
        <div className="stat-card">
          <span className="stat-label">Promedio</span>
          <span className="stat-value" style={{ color: getTemperatureColor(averageTemp) }}>
            {averageTemp.toFixed(1)}°C
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Máxima</span>
          <span className="stat-value" style={{ color: getTemperatureColor(maxTemp) }}>
            {maxTemp.toFixed(1)}°C
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Críticas</span>
          <span className="stat-value" style={{ color: criticalCount > 0 ? '#ff4444' : '#00cc66' }}>
            {criticalCount}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total</span>
          <span className="stat-value">
            {temperatureData.length}
          </span>
        </div>
      </div>

      <div className="temperature-list">
        <div className="list-header">
          <span>Máquina</span>
          <span>Temperatura</span>
          <span>Estado</span>
          <span>Timestamp</span>
        </div>
        <div className="list-body">
          {temperatureData.slice(0, 10).map((item: TemperatureDataPoint) => (
            <div key={item.id} className="temperature-item">
              <span className="machine-id">{item.machine_id}</span>
              <span 
                className="temperature-value"
                style={{ color: getTemperatureColor(item.temperature) }}
              >
                {item.temperature.toFixed(1)}°C
              </span>
              <span className={`status-badge ${getTemperatureStatus(item.temperature)}`}>
                {getTemperatureStatus(item.temperature) === 'critical' ? 'Crítico' : 
                 getTemperatureStatus(item.temperature) === 'warning' ? 'Alerta' : 'Normal'}
              </span>
              <span className="timestamp">
                {new Date(item.timestamp).toLocaleString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: '2-digit',
                  month: '2-digit'
                })}
              </span>
            </div>
          ))}
        </div>
        {temperatureData.length > 10 && (
          <div className="list-footer">
            Mostrando 10 de {temperatureData.length} registros
          </div>
        )}
      </div>
    </div>
  );
};

export default TemperatureMonitor;
