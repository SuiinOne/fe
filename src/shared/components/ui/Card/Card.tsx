import { ReactNode, CSSProperties } from 'react';
import { Card as RadixCard } from '@radix-ui/themes';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outline' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  className,
  style,
  onClick
}: CardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
        };
      case 'outline':
        return {
          background: 'transparent',
          border: '2px solid var(--border)',
          boxShadow: 'none',
        };
      case 'ghost':
        return {
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
        };
      default: // default
        return {
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
        };
    }
  };

  const getPaddingValue = () => {
    switch (padding) {
      case 'none': return '0';
      case 'sm': return '0.75rem';
      case 'md': return '1rem';
      case 'lg': return '1.5rem';
      case 'xl': return '2rem';
      default: return '1rem';
    }
  };

  const baseStyles: CSSProperties = {
    borderRadius: 'var(--radius)',
    transition: 'all 150ms ease-in-out',
    overflow: 'hidden',
    position: 'relative',
    ...getVariantStyles(),
    padding: getPaddingValue(),
  };

  const interactiveStyles: CSSProperties = interactive ? {
    cursor: 'pointer',
  } : {};

  return (
    <RadixCard
      className={className}
      style={{
        ...baseStyles,
        ...interactiveStyles,
        ...style
      }}
      onClick={onClick}
      onMouseEnter={interactive ? (e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      } : undefined}
      onMouseLeave={interactive ? (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = baseStyles.boxShadow as string;
      } : undefined}
    >
      {children}
    </RadixCard>
  );
}

// Specialized Card variants for common use cases
interface InfoCardProps extends Omit<CardProps, 'variant'> {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function InfoCard({ 
  title, 
  subtitle, 
  icon, 
  action, 
  children, 
  ...props 
}: InfoCardProps) {
  return (
    <Card variant="default" padding="lg" {...props}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {icon && (
              <div style={{ 
                color: 'var(--primary)', 
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {icon}
              </div>
            )}
            <div>
              <h3 style={{ 
                margin: 0, 
                fontSize: '1.125rem', 
                fontWeight: 600, 
                color: 'var(--foreground)' 
              }}>
                {title}
              </h3>
              {subtitle && (
                <p style={{ 
                  margin: '0.25rem 0 0 0', 
                  fontSize: '0.875rem', 
                  color: 'var(--muted-foreground)' 
                }}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action && (
            <div style={{ flexShrink: 0 }}>
              {action}
            </div>
          )}
        </div>
        
        {/* Content */}
        {children && (
          <div style={{ color: 'var(--foreground)' }}>
            {children}
          </div>
        )}
      </div>
    </Card>
  );
}

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  icon?: ReactNode;
  color?: 'default' | 'green' | 'red' | 'blue' | 'orange';
}

export function StatsCard({ 
  title, 
  value, 
  trend, 
  icon, 
  color = 'default' 
}: StatsCardProps) {
  const getColorVars = () => {
    switch (color) {
      case 'green': return { bg: 'var(--green-2)', text: 'var(--green-11)', icon: 'var(--green-9)' };
      case 'red': return { bg: 'var(--red-2)', text: 'var(--red-11)', icon: 'var(--red-9)' };
      case 'blue': return { bg: 'var(--blue-2)', text: 'var(--blue-11)', icon: 'var(--blue-9)' };
      case 'orange': return { bg: 'var(--orange-2)', text: 'var(--orange-11)', icon: 'var(--orange-9)' };
      default: return { bg: 'var(--card)', text: 'var(--foreground)', icon: 'var(--primary)' };
    }
  };

  const colors = getColorVars();

  return (
    <Card 
      variant="default" 
      padding="lg"
      style={{ 
        background: colors.bg,
        borderColor: color !== 'default' ? colors.icon + '40' : 'var(--border)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <p style={{ 
            margin: '0 0 0.5rem 0', 
            fontSize: '0.875rem', 
            color: 'var(--muted-foreground)',
            fontWeight: 500
          }}>
            {title}
          </p>
          <p style={{ 
            margin: '0 0 0.5rem 0', 
            fontSize: '1.875rem', 
            fontWeight: 700, 
            color: colors.text,
            lineHeight: 1.2
          }}>
            {value}
          </p>
          {trend && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.25rem',
              fontSize: '0.75rem',
              color: trend.direction === 'up' ? 'var(--green-11)' : 
                     trend.direction === 'down' ? 'var(--red-11)' : 'var(--muted-foreground)'
            }}>
              <span>{trend.direction === 'up' ? '↗' : trend.direction === 'down' ? '↘' : '→'}</span>
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        {icon && (
          <div style={{ 
            color: colors.icon,
            opacity: 0.8,
            flexShrink: 0
          }}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}