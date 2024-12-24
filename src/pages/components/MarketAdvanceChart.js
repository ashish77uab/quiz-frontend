import React, { useEffect, useRef } from 'react';

const MarketAdvanceChart = () => {
    const widgetRef = useRef(null);

    useEffect(() => {
        // Check if the widget container exists
        if (widgetRef.current) {
            // Create the script element
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
            script.async = true;

            // Add the widget settings as a JSON string in the script's innerHTML
            script.innerHTML = JSON.stringify({
                width: '100%',
                height: '700',
                symbol: 'NASDAQ:AAPL',
                interval: 'D',
                timezone: 'Etc/UTC',
                theme: 'dark',
                style: '1',
                locale: 'en',
                allow_symbol_change: true,
                calendar: false,
                support_host: 'https://www.tradingview.com',
            });

            // Append the script to the widget container
            widgetRef.current.appendChild(script);
        }
    }, []);

    return (
        <div className="tradingview-widget-container" ref={widgetRef}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
};

export default MarketAdvanceChart;
