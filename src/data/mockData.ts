import type { ChartData, CategoryData, MetricCard, DataPoint } from '../types/dashboard';

// Datos de ejemplo para las gráficas
export const chartData: ChartData[] = [
  { month: 'Ene', ventas: 4000, usuarios: 2400, ingresos: 2400 },
  { month: 'Feb', ventas: 3000, usuarios: 1398, ingresos: 2210 },
  { month: 'Mar', ventas: 2000, usuarios: 9800, ingresos: 2290 },
  { month: 'Abr', ventas: 2780, usuarios: 3908, ingresos: 2000 },
  { month: 'May', ventas: 1890, usuarios: 4800, ingresos: 2181 },
  { month: 'Jun', ventas: 2390, usuarios: 3800, ingresos: 2500 },
  { month: 'Jul', ventas: 3490, usuarios: 4300, ingresos: 2100 },
];

export const categoryData: CategoryData[] = [
  { name: 'Tecnología', value: 35, color: '#8884d8' },
  { name: 'Marketing', value: 25, color: '#82ca9d' },
  { name: 'Ventas', value: 20, color: '#ffc658' },
  { name: 'Recursos Humanos', value: 15, color: '#ff7300' },
  { name: 'Otros', value: 5, color: '#00ff88' },
];

export const metricCards: MetricCard[] = [
  {
    title: 'Usuarios Totales',
    value: '12,543',
    change: 12.5,
    icon: 'users'
  },
  {
    title: 'Ventas del Mes',
    value: '$45,678',
    change: -2.3,
    icon: 'trending-up'
  },
  {
    title: 'Conversión',
    value: '3.2%',
    change: 8.7,
    icon: 'target'
  },
  {
    title: 'Ingresos',
    value: '$123,456',
    change: 15.2,
    icon: 'dollar-sign'
  }
];

export const tableData: DataPoint[] = [
  {
    id: '1',
    name: 'Producto A',
    value: 1250,
    category: 'Tecnología',
    date: '2024-01-15',
    percentage: 23.5
  },
  {
    id: '2',
    name: 'Producto B',
    value: 950,
    category: 'Marketing',
    date: '2024-01-14',
    percentage: 18.2
  },
  {
    id: '3',
    name: 'Producto C',
    value: 780,
    category: 'Ventas',
    date: '2024-01-13',
    percentage: 15.1
  },
  {
    id: '4',
    name: 'Producto D',
    value: 620,
    category: 'Tecnología',
    date: '2024-01-12',
    percentage: 12.8
  },
  {
    id: '5',
    name: 'Producto E',
    value: 540,
    category: 'Marketing',
    date: '2024-01-11',
    percentage: 10.4
  },
  {
    id: '6',
    name: 'Producto F',
    value: 480,
    category: 'Recursos Humanos',
    date: '2024-01-10',
    percentage: 9.2
  },
  {
    id: '7',
    name: 'Producto G',
    value: 420,
    category: 'Ventas',
    date: '2024-01-09',
    percentage: 8.1
  },
  {
    id: '8',
    name: 'Producto H',
    value: 380,
    category: 'Otros',
    date: '2024-01-08',
    percentage: 7.3
  }
];
