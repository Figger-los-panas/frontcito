import { LogOut, BarChart3 } from 'lucide-react';
import OptimalCombinations from '../components/OptimalCombinations';
import TemperatureMonitor from '../components/TemperatureMonitor';
import HistoricalAnalysis from '../components/HistoricalAnalysis';
import CombinationsAnalysis from '../components/PredictionAnalysis';
import SpearmanAnalysis from '../components/SpearmanAnalysis';
import ApiStatus from '../components/ApiStatus';
import { useTemperatureData } from '../hooks/useTemperatureData';
import '../styles/Dashboard.css';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const { isApiConnected, error } = useTemperatureData(0); // Solo para verificar estado de API

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Cygger Dashboard</h1>
          <p>Panel de Control INGE LEAN</p>
        </div>
        <button onClick={onLogout} className="logout-button">
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </header>

      {/* API Status */}
      <div style={{ padding: '1rem 2rem 0 2rem' }}>
        <ApiStatus isConnected={isApiConnected} error={error} />
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Optimal Combinations - Panel Principal */}
        <div className="main-panel">
          <OptimalCombinations />
        </div>

        {/* Temperature Monitor - Panel de Monitoreo */}
        <div className="main-panel">
          <div className="panel-header">
            <BarChart3 size={20} />
            <h2>Monitoreo en Tiempo Real</h2>
          </div>
          
          {/* Temperature Monitor Section */}
          <div className="temperature-section">
            <TemperatureMonitor limit={100} />
          </div>
          
          {!isApiConnected && (
            <div className="no-data-message">
              <h3>🔌 Conecta tu API para ver datos en tiempo real</h3>
              <p>El dashboard está listo para mostrar datos de temperatura cuando tu servidor API esté disponible en <code>localhost:8000</code></p>
            </div>
          )}
        </div>

        {/* Historical Analysis Panel */}
        <div className="analysis-panel">
          <HistoricalAnalysis period="daily" />
        </div>

        {/* Optimal Combinations Analysis Panel */}
        <div className="analysis-panel">
          <CombinationsAnalysis />
        </div>

        {/* Spearman Correlation Analysis Panel */}
        <div className="analysis-panel">
          <SpearmanAnalysis />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
