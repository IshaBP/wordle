import { screen } from '@testing-library/react';
import { CSSProperties } from 'styled-components';

export const matchKeyColors = (
  keyColorMap: Record<string, CSSProperties['backgroundColor']>,
) => {
  for (const [name, color] of Object.entries(keyColorMap)) {
    expect(screen.getByRole('button', { name })).toHaveStyle({
      backgroundColor: color,
    });
  }
};
