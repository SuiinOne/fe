import { useState, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button, Flex, Text } from '@radix-ui/themes';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  position?: 'left' | 'right' | 'bottom';
  className?: string;
}

export function MobileDrawer({
  isOpen,
  onClose,
  children,
  title,
  position = 'left',
  className
}: MobileDrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const getDrawerStyles = () => {
    const baseStyles = {
      position: 'fixed' as const,
      top: 0,
      zIndex: 9999,
      background: 'var(--card)',
      borderColor: 'var(--border)',
      boxShadow: 'var(--shadow-lg)',
      transform: isOpen ? 'translateX(0)' : '',
      transition: 'transform 0.3s ease-in-out',
      overflow: 'auto',
      maxWidth: '100vw',
      maxHeight: '100vh'
    };

    switch (position) {
      case 'left':
        return {
          ...baseStyles,
          left: 0,
          width: '280px',
          height: '100vh',
          borderRight: '1px solid var(--border)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)'
        };
      case 'right':
        return {
          ...baseStyles,
          right: 0,
          width: '280px',
          height: '100vh',
          borderLeft: '1px solid var(--border)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)'
        };
      case 'bottom':
        return {
          ...baseStyles,
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: 'auto',
          maxHeight: '80vh',
          borderTop: '1px solid var(--border)',
          borderRadius: '16px 16px 0 0',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)'
        };
      default:
        return baseStyles;
    }
  };

  const drawerContent = (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9998,
            backdropFilter: 'blur(4px)',
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        style={getDrawerStyles()}
        className={className}
      >
        {/* Header */}
        {(title || true) && (
          <div
            style={{
              padding: '1rem',
              borderBottom: '1px solid var(--border)',
              background: 'var(--card)',
              position: 'sticky',
              top: 0,
              zIndex: 1
            }}
          >
            <Flex justify="between" align="center">
              {title && (
                <Text size="4" weight="bold" style={{ color: 'var(--foreground)' }}>
                  {title}
                </Text>
              )}
              <Button
                variant="ghost"
                size="2"
                onClick={onClose}
                style={{ marginLeft: 'auto' }}
              >
                <X size={20} />
              </Button>
            </Flex>
          </div>
        )}

        {/* Content */}
        <div
          style={{
            padding: '1rem',
            flex: 1,
            overflow: 'auto'
          }}
        >
          {children}
        </div>
      </div>
    </>
  );

  return createPortal(drawerContent, document.body);
}

// Hook for managing drawer state
export function useDrawer(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen
  };
}