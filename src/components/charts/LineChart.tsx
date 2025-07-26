import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartData } from '../../types/dashboard';

interface LineChartComponentProps {
  data: ChartData[];
  title: string;
}

const LineChartComponent = ({ data, title }: LineChartComponentProps) => (
  <div className="chart-container">
    <h3 className="chart-title">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="energia" stroke="#ff6b35" strokeWidth={2} />
        <Line type="monotone" dataKey="eficiencia" stroke="#1a1a1a" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default LineChartComponent;
