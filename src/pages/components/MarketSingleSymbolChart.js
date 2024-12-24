import React, { useEffect, useRef } from 'react';

const MarketSingleSymbolChart = () => {
    const widgetRef = useRef(null);

    useEffect(() => {
        // Check if the widget container exists
        if (widgetRef.current) {
            // Create the script element
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
            script.async = true;

            // Add the widget settings as a JSON string in the script's innerHTML
            script.innerHTML = JSON.stringify({
                interval: "1m",
                width: '100%',
                isTransparent: false,
                height: 400,
                symbol: "NASDAQ:AAPL",
                showIntervalTabs: true,
                displayMode: "single",
                locale: "en",
                colorTheme: "dark"
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

export default MarketSingleSymbolChart;
