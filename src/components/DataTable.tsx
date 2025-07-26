import React from 'react';
import type { DataPoint } from '../types/dashboard';

interface DataTableProps {
  data: DataPoint[];
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
              <th>Nombre</th>
              <th>Valor</th>
              <th>Categoría</th>
              <th>Fecha</th>
              <th>Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="name-cell">{item.name}</td>
                <td className="value-cell">${item.value.toLocaleString()}</td>
                <td>
                  <span className={`category-badge category-${item.category.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item.category}
                  </span>
                </td>
                <td className="date-cell">{new Date(item.date).toLocaleDateString('es-ES')}</td>
                <td className="percentage-cell">{item.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
