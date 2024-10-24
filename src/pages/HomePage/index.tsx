import React, { useEffect, useState } from 'react';
import { fetchCryptocurrencies } from '../../services/api';
import CryptoTable from '../../components/CryptoTable';
import { Crypto } from '../../types';
import styles from './HomePage.module.scss';
import { useWebSocket } from '../../hooks/useWebSocket';
import { CircularProgress } from '@mui/material';

const HomePage: React.FC = () => {
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    const assetSymbols = cryptos.map((crypto) => crypto.id);
    const realTimePrices = useWebSocket(assetSymbols);

    useEffect(() => {
        setLoading(true);
        fetchCryptocurrencies()
            .then(setCryptos)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className={styles.container}>
            {loading ? (
                <CircularProgress />
            ) : (
                <CryptoTable
                    cryptos={cryptos}
                    realTimePrices={realTimePrices}
                />
            )}
        </div>
    );
};

export default HomePage;
