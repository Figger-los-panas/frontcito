import React from 'react';
import { LogOut, BarChart3, Table } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import DataTable from '../components/DataTable';
import BarChartComponent from '../components/charts/BarChart';
import LineChartComponent from '../components/charts/LineChart';
import PieChartComponent from '../components/charts/PieChart';
import { chartData, categoryData, metricCards, tableData } from '../data/mockData';
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
          <h1>Dashboard de Análisis</h1>
          <p>Panel de control de datos</p>
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
            <DataTable data={tableData} title="Productos y Métricas" />
          </div>
          
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">Total de registros:</span>
              <span className="stat-value">{tableData.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Valor promedio:</span>
              <span className="stat-value">
                ${Math.round(tableData.reduce((acc, item) => acc + item.value, 0) / tableData.length).toLocaleString()}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Categorías:</span>
              <span className="stat-value">{new Set(tableData.map(item => item.category)).size}</span>
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
              <BarChartComponent data={chartData} title="Ventas y Usuarios por Mes" />
            </div>
            
            <div className="chart-item">
              <LineChartComponent data={chartData} title="Tendencia de Ingresos" />
            </div>
            
            <div className="chart-item">
              <PieChartComponent data={categoryData} title="Distribución por Categorías" />
            </div>
            
            <div className="insights-panel">
              <h4>📊 Insights Clave</h4>
              <ul className="insights-list">
                <li>Los usuarios han crecido un 12.5% este mes</li>
                <li>Tecnología representa el 35% de las categorías</li>
                <li>Marzo fue el mes con mayor actividad de usuarios</li>
                <li>Los ingresos muestran una tendencia positiva</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
