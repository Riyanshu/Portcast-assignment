import { useEffect, useState } from 'react';

export const useWebSocket = (assets: string[]) => {
    const [prices, setPrices] = useState<Record<string, string>>({});

    useEffect(() => {
        const ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${assets.join(',')}`);

        ws.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            setPrices((prevPrices) => ({ ...prevPrices, ...data }));
        };

        return () => ws.close();
    }, [assets]);

    return prices;
};
