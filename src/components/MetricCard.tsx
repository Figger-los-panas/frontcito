import { TrendingUp, TrendingDown, Users, Target, DollarSign, Package, AlertTriangle, Zap, type LucideIcon } from 'lucide-react';
import type { MetricCard as MetricCardType } from '../types/dashboard';

interface MetricCardProps {
  metric: MetricCardType;
}

const iconMap: Record<string, LucideIcon> = {
  'users': Users,
  'trending-up': TrendingUp,
  'target': Target,
  'dollar-sign': DollarSign,
  'package': Package,
  'alert-triangle': AlertTriangle,
  'zap': Zap,
} as const;

const getIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName] || TrendingUp;
  return <IconComponent size={24} />;
};

const MetricCard = ({ metric }: MetricCardProps) => {
  const isPositive = metric.change >= 0;
  
  return (
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-icon">
          {getIcon(metric.icon)}
        </div>
        <div className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {Math.abs(metric.change)}%
        </div>
      </div>
      
      <div className="metric-content">
        <h3 className="metric-value">{metric.value}</h3>
        <p className="metric-title">{metric.title}</p>
      </div>
    </div>
  );
};

export default MetricCard;
