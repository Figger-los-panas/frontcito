import React from 'react';
import { TrendingUp, TrendingDown, Users, Target, DollarSign } from 'lucide-react';
import type { MetricCard as MetricCardType } from '../types/dashboard';

interface MetricCardProps {
  metric: MetricCardType;
}

const getIcon = (iconName: string) => {
  const icons = {
    'users': Users,
    'trending-up': TrendingUp,
    'target': Target,
    'dollar-sign': DollarSign,
  };
  
  const IconComponent = icons[iconName as keyof typeof icons] || TrendingUp;
  return <IconComponent size={24} />;
};

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
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
