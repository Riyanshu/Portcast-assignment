import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Paper,
    TablePagination,
    tableSortLabelClasses,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CryptoRow from '../CryptoRow';
import { Crypto } from '../../types';
import styles from './CryptoTable.module.scss';

interface Props {
    cryptos: Crypto[];
    realTimePrices: Record<string, string>;
}

type Order = 'asc' | 'desc';

const CryptoTable: React.FC<Props> = ({ cryptos, realTimePrices }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const urlParams = new URLSearchParams(location.search);
    const initialSortField = (urlParams.get('sort') as 'name' | 'symbol') || 'name';
    const initialOrder = (urlParams.get('order') as Order) || 'asc';

    const [sortField, setSortField] = useState<'name' | 'symbol'>(initialSortField);
    const [order, setOrder] = useState<Order>(initialOrder);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleSort = (field: 'name' | 'symbol') => {
        const isAsc = sortField === field && order === 'asc';
        const newOrder = isAsc ? 'desc' : 'asc';
        setSortField(field);
        setOrder(newOrder);

        urlParams.set('sort', field);
        urlParams.set('order', newOrder);
        navigate({ search: urlParams.toString() });
    };

    const sortedCryptos = [...cryptos].sort((a, b) => {
        if (order === 'asc') {
            return a[sortField].localeCompare(b[sortField]);
        } else {
            return b[sortField].localeCompare(a[sortField]);
        }
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedCryptos = sortedCryptos.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <TableContainer component={Paper} className={styles.tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: '10%' }}>
                            <TableSortLabel
                                active={sortField === 'symbol'}
                                direction={sortField === 'symbol' ? order : 'asc'}
                                onClick={() => handleSort('symbol')}
                                sx={{
                                    [`.${tableSortLabelClasses.icon}`]: {
                                        opacity: 0.4
                                    }
                                }}
                            >
                                Symbol
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ width: '30%' }}>
                            <TableSortLabel
                                active={sortField === 'name'}
                                direction={sortField === 'name' ? order : 'asc'}
                                onClick={() => handleSort('name')}
                                sx={{
                                    [`.${tableSortLabelClasses.icon}`]: {
                                        opacity: 0.4
                                    }
                                }}
                            >
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ width: '20%' }}>Price (USD)</TableCell>
                        <TableCell sx={{ width: '30%' }}>Market Cap (USD)</TableCell>
                        <TableCell sx={{ width: '10%' }}>Favorites</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedCryptos.map((crypto) => (
                        <CryptoRow
                            key={crypto.id}
                            crypto={crypto}
                            realTimePrice={realTimePrices[crypto.id] || crypto.priceUsd}
                        />
                    ))}
                </TableBody>
            </Table>

            <TablePagination
                component="div"
                count={cryptos.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                sx={{border: '1px solid #515151'}}
            />
        </TableContainer>
    );
};

export default CryptoTable;
