import { useState, useEffect } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

export const breakpoints = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px) and (max-width: 1439px)',
  wide: '(min-width: 1440px)'
} as const;

export const minWidthBreakpoints = {
  mobile: '(min-width: 0px)',
  tablet: '(min-width: 768px)',
  desktop: '(min-width: 1024px)',
  wide: '(min-width: 1440px)'
} as const;

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    
    const handleChange = () => {
      setMatches(mediaQuery.matches);
    };

    // Set initial value
    handleChange();

    // Listen for changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
}

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  return useMediaQuery(breakpoints[breakpoint]);
}

export function useMinBreakpoint(breakpoint: Breakpoint): boolean {
  return useMediaQuery(minWidthBreakpoints[breakpoint]);
}

export function useCurrentBreakpoint(): Breakpoint {
  const isWide = useMediaQuery(minWidthBreakpoints.wide);
  const isDesktop = useMediaQuery(minWidthBreakpoints.desktop);
  const isTablet = useMediaQuery(minWidthBreakpoints.tablet);

  if (isWide) return 'wide';
  if (isDesktop) return 'desktop';
  if (isTablet) return 'tablet';
  return 'mobile';
}

export function useIsMobile(): boolean {
  return useBreakpoint('mobile');
}

export function useIsTabletOrMobile(): boolean {
  return useMediaQuery('(max-width: 1023px)');
}

export function useIsDesktopOrWide(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}