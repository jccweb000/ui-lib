import { render, screen } from '@testing-library/react';

import App from './App';

describe('playground', () => {
  it('should render playground headline and controls', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'ui-lib playground' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '海岸主题' })).toBeInTheDocument();
    expect(screen.getByLabelText('note-input')).toBeInTheDocument();
  });
});
