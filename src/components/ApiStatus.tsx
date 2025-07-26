import { AlertTriangle, Info, Server } from 'lucide-react';

interface ApiStatusProps {
  isConnected: boolean;
  error?: string | null;
}

const ApiStatus = ({ isConnected, error }: ApiStatusProps) => {
  if (isConnected) {
    return (
      <div className="api-status connected">
        <Server size={16} />
        <span>API conectada en localhost:8000</span>
      </div>
    );
  }

  return (
    <div className="api-status disconnected">
      <AlertTriangle size={16} />
      <div className="status-content">
        <span>API no disponible</span>
        {error && <p className="error-detail">{error}</p>}
        <div className="connection-info">
          <Info size={14} />
          <span>Asegúrate de que el servidor esté ejecutándose en localhost:8000</span>
        </div>
      </div>
    </div>
  );
};

export default ApiStatus;
