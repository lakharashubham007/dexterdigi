'use client';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const ThemeSwitcher = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Force dark theme as requested and hide the toggle button
    setTheme('dark');
  }, [setTheme]);

  return null;
};

export default ThemeSwitcher;
