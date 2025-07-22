import { ReactNode, CSSProperties } from 'react';

interface ResponsiveGridProps {
  children: ReactNode;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    wide?: number;
  };
  gap?: string | number;
  className?: string;
  style?: CSSProperties;
  minItemWidth?: string;
  maxItemWidth?: string;
}

export function ResponsiveGrid({
  children,
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    wide: 4
  },
  gap = '1.5rem',
  className,
  style,
  minItemWidth = '280px',
  maxItemWidth = '400px'
}: ResponsiveGridProps) {
  return (
    <div 
      className={className}
      style={{
        display: 'grid',
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        gridTemplateColumns: `repeat(${columns.mobile}, minmax(${minItemWidth}, ${maxItemWidth}))`,
        justifyContent: 'center',
        width: '100%',
        ...style
      }}
    >
      {children}
    </div>
  );
}

// Alternative approach using CSS classes
interface ResponsiveGridCSSProps extends ResponsiveGridProps {
  variant?: 'auto-fit' | 'fixed-columns';
}

export function ResponsiveGridCSS({
  children,
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    wide: 4
  },
  gap = '1.5rem',
  className = '',
  style,
  minItemWidth = '280px',
  variant = 'fixed-columns'
}: ResponsiveGridCSSProps) {
  const gridStyle = variant === 'auto-fit' 
    ? `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`
    : `repeat(${columns.mobile}, minmax(${minItemWidth}, 1fr))`;

  return (
    <div 
      className={`responsive-grid ${variant} ${className}`.trim()}
      style={{
        display: 'grid',
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        width: '100%',
        justifyContent: 'center',
        gridTemplateColumns: gridStyle,
        ...style
      }}
    >
      {children}
    </div>
  );
}