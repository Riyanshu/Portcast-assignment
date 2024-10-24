import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCryptoDetails, fetchPriceHistory } from '../../services/api';
import { Crypto, PriceHistory } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './DetailsPage.module.scss';
import { ArrowBack } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

const DetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [details, setDetails] = useState<Crypto | null>(null);
    const [history, setHistory] = useState<PriceHistory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    const formatDateToOrdinal = (date: Date) => {
        const day = date.getDate();
        const month = date.toLocaleString('en-GB', { month: 'short' });
      
        const ordinalSuffix = (n: number) => {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        };
      
        return `${ordinalSuffix(day)} ${month}`;
    }

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchDetailsAndHistory = async () => {
            setLoading(true);
            try {
                const cryptoDetails = await fetchCryptoDetails(id);
                const priceHistory = await fetchPriceHistory(id);

                setDetails(cryptoDetails);
                setHistory(priceHistory);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetailsAndHistory();
    }, [id]);

    return (
        <div className={styles.detailsContainer}>
            {loading ? (
                <CircularProgress />
            ) : (
                details && (
                    <>
                        <div className={styles.title}>
                            <ArrowBack sx={{cursor: 'pointer'}} htmlColor='white' fontSize='large' onClick={handleBackClick}/>
                            <h1>{details.name} Details</h1>
                        </div>
                        <div className={styles.body}>
                        <div className={styles.tableContainer}>
                                <h2>Price History (Last 30 Days)</h2>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={history}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis fontSize={15} dataKey="time" tickFormatter={(tick) => formatDateToOrdinal(new Date(tick))} />
                                        <YAxis fontSize={15} dataKey="priceUsd" domain={['auto', 'auto']} />
                                        <Tooltip formatter={(value) => `$${parseFloat(value as string).toFixed(2)}`} />
                                        <Line type="monotone" dataKey="priceUsd" stroke="#8884d8" dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className={styles.info}>
                                <p><strong>Symbol:</strong> {details.symbol}</p>
                                <p><strong>Rank:</strong> {details.rank}</p>
                                <p><strong>Market Cap:</strong> ${parseFloat(details.marketCapUsd).toLocaleString()}</p>
                                <p><strong>Supply:</strong> {parseFloat(details.supply).toLocaleString()}</p>
                                <p><strong>Max Supply:</strong> {details.maxSupply ? parseFloat(details.maxSupply).toLocaleString() : 'N/A'}</p>
                                <p><strong>Change (24Hr):</strong> {parseFloat(details.changePercent24Hr).toFixed(2)}%</p>
                            </div>
                        </div>
                    </>
                )
            )}
        </div>
    );
};

export default DetailsPage;
