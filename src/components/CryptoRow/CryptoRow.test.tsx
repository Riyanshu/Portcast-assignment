import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CryptoRow from './index';
import { mockCryptos } from '../../utils';

describe('CryptoRow', () => {
    test('renders crypto information', () => {
        render(<CryptoRow crypto={mockCryptos[0]} realTimePrice="60000" />);

        expect(screen.getByText('Bitcoin')).toBeInTheDocument();
        expect(screen.getByText('BTC')).toBeInTheDocument();
    });

    test('toggles favorite state on click', () => {
        render(<CryptoRow crypto={mockCryptos[0]} realTimePrice="60000" />);

        const favoriteButton = screen.getByRole('button', { name: /toggle favorite/i });
        fireEvent.click(favoriteButton);
    });
});
