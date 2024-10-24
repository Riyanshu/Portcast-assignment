import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CryptoTable from './index';
import { mockCryptos } from '../../utils';

describe('CryptoTable', () => {
  test('renders table headers', () => {
    render(
      <MemoryRouter>
        <CryptoTable cryptos={mockCryptos} realTimePrices={{}} />
      </MemoryRouter>
    );

    expect(screen.getByText('Symbol')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  test('renders crypto names', () => {
    render(
      <MemoryRouter>
        <CryptoTable cryptos={mockCryptos} realTimePrices={{}} />
      </MemoryRouter>
    );

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
  });
});
