import React, { useState } from 'react';
import { TableRow, TableCell, Link, IconButton } from '@mui/material';
import { Crypto } from '../../types';
import styles from './CryptoRow.module.scss';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

interface Props {
    crypto: Crypto;
    realTimePrice: string;
}

const CryptoRow: React.FC<Props> = ({ crypto, realTimePrice }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(
        !!localStorage.getItem(`favorite-${crypto.id}`)
    );

    const toggleFavorite = () => {
        if (isFavorite) {
            localStorage.removeItem(`favorite-${crypto.id}`);
        } else {
            localStorage.setItem(`favorite-${crypto.id}`, 'true');
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <TableRow className={styles.row}>
            <TableCell>{crypto.symbol}</TableCell>
            <TableCell>
                <Link href={`/details/${crypto.id}`} underline='none'>
                    {crypto.name}
                </Link>
            </TableCell>
            <TableCell>${parseFloat(realTimePrice).toFixed(2)}</TableCell>
            <TableCell>${parseFloat(crypto.marketCapUsd).toLocaleString()}</TableCell>
            <TableCell>
            <IconButton onClick={toggleFavorite} aria-label="toggle favorite">
                {isFavorite ? (
                    <Favorite className={styles.favorite} />
                ) : (
                    <FavoriteBorder />
                )}
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default CryptoRow;
