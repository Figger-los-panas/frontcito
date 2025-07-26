export interface DataPoint {
  id: string;
  name: string;
  value: number;
  category: string;
  date: string;
  percentage?: number;
}

export interface ChartData {
  month: string;
  ventas: number;
  usuarios: number;
  ingresos: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
}
