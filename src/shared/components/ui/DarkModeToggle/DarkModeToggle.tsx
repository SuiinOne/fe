import { Button, Tooltip } from '@radix-ui/themes';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

interface DarkModeToggleProps {
  size?: '1' | '2' | '3';
  variant?: 'solid' | 'soft' | 'outline' | 'ghost';
}

export function DarkModeToggle({ 
  size = '2', 
  variant = 'ghost' 
}: DarkModeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Tooltip content={isDark ? '라이트 모드로 변경' : '다크 모드로 변경'}>
      <Button
        size={size}
        variant={variant}
        onClick={toggleTheme}
        style={{
          transition: 'all 150ms ease-in-out',
        }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {isDark ? (
          <Sun size={16} style={{ color: 'var(--orange-11)' }} />
        ) : (
          <Moon size={16} style={{ color: 'var(--indigo-11)' }} />
        )}
      </Button>
    </Tooltip>
  );
}