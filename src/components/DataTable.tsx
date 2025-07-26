import React from 'react';
import type { IndustrialDataPoint } from '../types/dashboard';

interface DataTableProps {
  data: IndustrialDataPoint[];
  title: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, title }) => {
  return (
    <div className="data-table-container">
      <h3 className="table-title">{title}</h3>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Máquina</th>
              <th>Operador</th>
              <th>Producto</th>
              <th>Turno</th>
              <th>Producción</th>
              <th>Eficiencia</th>
              <th>Fallos</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="name-cell">{item.maquina_id}</td>
                <td className="operator-cell">{item.operador_id}</td>
                <td className="product-cell">{item.producto_id}</td>
                <td>
                  <span className={`turno-badge turno-${item.turno.toLowerCase()}`}>
                    {item.turno}
                  </span>
                </td>
                <td className="value-cell">{item.cantidad_producida}</td>
                <td className="percentage-cell">{item.eficiencia_porcentual?.toFixed(1)}%</td>
                <td className="failure-cell">
                  <span className={`status-badge ${item.fallo_detectado === 'Sí' ? 'failure' : 'success'}`}>
                    {item.fallo_detectado}
                  </span>
                </td>
                <td className="date-cell">{new Date(item.timestamp).toLocaleString('es-ES')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
