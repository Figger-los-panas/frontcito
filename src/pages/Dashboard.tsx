import React from 'react';
import { LogOut, BarChart3, Table } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import DataTable from '../components/DataTable';
import BarChartComponent from '../components/charts/BarChart';
import LineChartComponent from '../components/charts/LineChart';
import PieChartComponent from '../components/charts/PieChart';
import { chartData, failureTypeData, metricCards, industrialData } from '../data/mockData';
import '../styles/Dashboard.css';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Cygger Dashboard</h1>
          <p>Panel de control industrial</p>
        </div>
        <button onClick={onLogout} className="logout-button">
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </header>

      {/* Metrics Cards */}
      <section className="metrics-section">
        <div className="metrics-grid">
          {metricCards.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Panel - Data */}
        <div className="left-panel">
          <div className="panel-header">
            <Table size={20} />
            <h2>Datos</h2>
          </div>
          
          <div className="data-section">
            <DataTable data={industrialData} title="Datos de Producción" />
          </div>
          
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">Total de registros:</span>
              <span className="stat-value">{industrialData.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Producción promedio:</span>
              <span className="stat-value">
                {Math.round(industrialData.reduce((acc, item) => acc + item.cantidad_producida, 0) / industrialData.length)} unidades
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Máquinas activas:</span>
              <span className="stat-value">{new Set(industrialData.map(item => item.maquina_id)).size}</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Charts */}
        <div className="right-panel">
          <div className="panel-header">
            <BarChart3 size={20} />
            <h2>Visualizaciones</h2>
          </div>
          
          <div className="charts-grid">
            <div className="chart-item">
              <BarChartComponent data={chartData} title="Producción y Eficiencia por Mes" />
            </div>
            
            <div className="chart-item">
              <LineChartComponent data={chartData} title="Consumo Energético y Eficiencia" />
            </div>
            
            <div className="chart-item">
              <PieChartComponent data={failureTypeData} title="Tipos de Fallos" />
            </div>
            
            <div className="insights-panel">
              <h4>📊 Insights Clave</h4>
              <ul className="insights-list">
                <li>La producción ha aumentado un 8.5% este mes</li>
                <li>Los fallos mecánicos representan el 35% de las fallas</li>
                <li>La eficiencia promedio se mantiene en 87.4%</li>
                <li>El consumo energético muestra tendencia creciente</li>
                <li>MAQ-C03 presenta la mayor eficiencia (95.1%)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
