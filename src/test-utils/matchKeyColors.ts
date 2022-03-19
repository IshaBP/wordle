import { screen } from '@testing-library/react';

export const matchKeyColors = (keyColorMap: Record<string, string>) => {
  for (let [name, color] of Object.entries(keyColorMap)) {
    expect(screen.getByRole('button', { name })).toHaveStyle({
      backgroundColor: color,
    });
  }
};
