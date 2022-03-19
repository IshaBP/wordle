import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../theme';

export const renderWithProviders = (component: React.ReactElement) =>
  render(<ThemeProvider theme={darkTheme}>{component}</ThemeProvider>);
