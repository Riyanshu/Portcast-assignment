import { mockCryptos } from '../utils';
import { fetchCryptocurrencies, fetchCryptoDetails } from './api';
import axios from 'axios';
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('axios');

describe('API Service', () => {
  test('fetchCryptocurrencies returns data', async () => {
    (mockedAxios.get as jest.Mock).mockResolvedValue({
      data: { data: mockCryptos },
    });

    const data = await fetchCryptocurrencies();
    expect(data).toEqual(mockCryptos);
  });

  test('fetchCryptoDetails returns details', async () => {
    (mockedAxios.get as jest.Mock).mockResolvedValue({
      data: { data: mockCryptos[0] },
    });

    const data = await fetchCryptoDetails('bitcoin');
    expect(data).toEqual(mockCryptos[0]);
  });
});
